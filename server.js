// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: '*', 
    methods: ['POST', 'GET']
}));
app.use(express.static(path.join(__dirname, 'docs')));

// Test endpoint
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running' });
});

// Helper to construct forwarded headers from client request to GitHub
function getForwardHeaders(req) {
    const headers = {};
    for (const [key, value] of Object.entries(req.headers)) {
        const lowerKey = key.toLowerCase();
        if ([
            'host',
            'connection',
            'keep-alive',
            'content-length',
            'accept-encoding'
        ].includes(lowerKey)) {
            continue;
        }
        headers[key] = value;
    }
    
    headers['host'] = 'github.com';
    if (headers['origin']) {
        headers['origin'] = 'https://github.com';
    }
    if (headers['referer']) {
        try {
            const refUrl = new URL(headers['referer']);
            if (refUrl.hostname === 'localhost' || refUrl.hostname === '127.0.0.1') {
                headers['referer'] = 'https://github.com' + refUrl.pathname + refUrl.search + refUrl.hash;
            }
        } catch (e) {
            headers['referer'] = 'https://github.com';
        }
    }
    
    headers['user-agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    return headers;
}

// Proxy endpoint to load individual pages via query param URL
app.get('/proxy', async (req, res) => {
    let targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).send('URL parameter is required');
    }
    
    // Normalize targetUrl
    if (!/^https?:\/\//i.test(targetUrl)) {
        targetUrl = 'https://' + targetUrl;
    }
    
    try {
        const response = await fetch(targetUrl, {
            method: 'GET',
            headers: getForwardHeaders(req),
            redirect: 'manual'
        });
        
        // Handle redirect
        if (response.status >= 300 && response.status < 400) {
            const redirectUrl = response.headers.get('location');
            if (redirectUrl) {
                const resolvedUrl = new URL(redirectUrl, targetUrl).href;
                return res.redirect(`/proxy?url=${encodeURIComponent(resolvedUrl)}`);
            }
        }
        
        const contentType = response.headers.get('content-type') || '';
        res.status(response.status);
        
        // Copy other headers, but exclude security ones
        response.headers.forEach((value, name) => {
            const lowerName = name.toLowerCase();
            if ([
                'content-security-policy',
                'content-security-policy-report-only',
                'x-frame-options',
                'x-xss-protection',
                'x-content-type-options',
                'strict-transport-security',
                'cross-origin-opener-policy',
                'cross-origin-embedder-policy',
                'cross-origin-resource-policy',
                'content-encoding',
                'transfer-encoding',
                'connection',
                'keep-alive'
            ].includes(lowerName)) {
                return;
            }
            res.setHeader(name, value);
        });
        
        if (contentType.includes('text/html')) {
            let html = await response.text();
            
            const scriptToInject = `
<style>
    html, body, a, button, input, [role="button"], [onclick], * {
        cursor: none !important;
    }
</style>
<script>
(function() {
    document.addEventListener('click', function(e) {
        const a = e.target.closest('a');
        if (a && a.href) {
            try {
                const url = new URL(a.href);
                const currentParams = new URLSearchParams(window.location.search);
                const currentProxiedUrl = currentParams.get('url') || 'https://github.com/mariarodr1136';
                const currentProxiedOrigin = new URL(currentProxiedUrl).origin;
                
                const isLocal = url.hostname === window.location.hostname;
                const isGitHub = url.hostname.includes('github.com');
                const isLinkedIn = url.hostname.includes('linkedin.com');
                
                if (isLocal || isGitHub || isLinkedIn) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    
                    let targetUrl = url.href;
                    if (isLocal) {
                        targetUrl = new URL(url.pathname + url.search + url.hash, currentProxiedOrigin).href;
                    }
                    window.location.href = '/proxy?url=' + encodeURIComponent(targetUrl);
                } else {
                    a.target = '_blank';
                }
            } catch (err) {
                console.error('Proxy link interception error:', err);
            }
        }
    }, true);

    document.addEventListener('mousemove', function(e) {
        if (window.parent && typeof window.parent.updateCursorFromIframe === 'function') {
            const isClickable = e.target.closest('a, button, input, [role="button"], [onclick]');
            window.parent.updateCursorFromIframe({
                clientX: e.clientX,
                clientY: e.clientY,
                isClickable: !!isClickable
            });
        }
    });
})();
</script>
`;
            
            // Inject script
            if (/<head>/i.test(html)) {
                html = html.replace(/<head>/i, '<head>' + scriptToInject);
            } else if (/<html>/i.test(html)) {
                html = html.replace(/<html>/i, '<html>' + scriptToInject);
            } else {
                html = scriptToInject + html;
            }
            
            res.send(html);
        } else {
            const buffer = await response.arrayBuffer();
            res.send(Buffer.from(buffer));
        }
    } catch (err) {
        console.error(`Error proxying ${targetUrl}:`, err);
        res.status(500).send('Proxy error');
    }
});

// Catch-all route to proxy asset files (js, css, images) or relative pages from GitHub
app.all('*', async (req, res) => {
    // Skip local assets or folders that are handled
    const localStaticPaths = ['/index.html', '/styles.css', '/script.js', '/static', '/games', '/test', '/proxy'];
    if (localStaticPaths.some(p => req.path.startsWith(p))) {
        return res.status(404).send('Not Found');
    }
    
    let targetHost = 'https://github.com';
    const referer = req.headers['referer'];
    if (referer) {
        try {
            const refUrl = new URL(referer);
            if (refUrl.pathname.startsWith('/proxy')) {
                const refTarget = refUrl.searchParams.get('url');
                if (refTarget) {
                    targetHost = new URL(refTarget).origin;
                }
            } else {
                if (refUrl.pathname.startsWith('/in/')) {
                    targetHost = 'https://www.linkedin.com';
                }
            }
        } catch (e) {
            // Ignore
        }
    }
    const targetUrl = targetHost + req.originalUrl;
    
    try {
        const response = await fetch(targetUrl, {
            method: req.method,
            headers: getForwardHeaders(req),
            redirect: 'manual'
        });
        
        // Handle redirect
        if (response.status >= 300 && response.status < 400) {
            const redirectUrl = response.headers.get('location');
            if (redirectUrl) {
                const resolvedUrl = new URL(redirectUrl, targetUrl).href;
                if (resolvedUrl.startsWith(targetHost)) {
                    const localRedirect = resolvedUrl.replace(targetHost, '');
                    return res.redirect(localRedirect);
                } else {
                    return res.redirect(`/proxy?url=${encodeURIComponent(resolvedUrl)}`);
                }
            }
        }
        
        const contentType = response.headers.get('content-type') || '';
        res.status(response.status);
        
        response.headers.forEach((value, name) => {
            const lowerName = name.toLowerCase();
            if ([
                'content-security-policy',
                'content-security-policy-report-only',
                'x-frame-options',
                'x-xss-protection',
                'x-content-type-options',
                'strict-transport-security',
                'cross-origin-opener-policy',
                'cross-origin-embedder-policy',
                'cross-origin-resource-policy',
                'content-encoding',
                'transfer-encoding',
                'connection',
                'keep-alive'
            ].includes(lowerName)) {
                return;
            }
            res.setHeader(name, value);
        });
        
        if (contentType.includes('text/html')) {
            let html = await response.text();
            
            const scriptToInject = `
<style>
    html, body, a, button, input, [role="button"], [onclick], * {
        cursor: none !important;
    }
</style>
<script>
(function() {
    document.addEventListener('click', function(e) {
        const a = e.target.closest('a');
        if (a && a.href) {
            try {
                const url = new URL(a.href);
                const currentParams = new URLSearchParams(window.location.search);
                const currentProxiedUrl = currentParams.get('url') || 'https://github.com/mariarodr1136';
                const currentProxiedOrigin = new URL(currentProxiedUrl).origin;
                
                const isLocal = url.hostname === window.location.hostname;
                const isGitHub = url.hostname.includes('github.com');
                const isLinkedIn = url.hostname.includes('linkedin.com');
                
                if (isLocal || isGitHub || isLinkedIn) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    
                    let targetUrl = url.href;
                    if (isLocal) {
                        targetUrl = new URL(url.pathname + url.search + url.hash, currentProxiedOrigin).href;
                    }
                    window.location.href = '/proxy?url=' + encodeURIComponent(targetUrl);
                } else {
                    a.target = '_blank';
                }
            } catch (err) {
                console.error('Proxy link interception error:', err);
            }
        }
    }, true);

    document.addEventListener('mousemove', function(e) {
        if (window.parent && typeof window.parent.updateCursorFromIframe === 'function') {
            const isClickable = e.target.closest('a, button, input, [role="button"], [onclick]');
            window.parent.updateCursorFromIframe({
                clientX: e.clientX,
                clientY: e.clientY,
                isClickable: !!isClickable
            });
        }
    });
})();
</script>
`;
            
            if (/<head>/i.test(html)) {
                html = html.replace(/<head>/i, '<head>' + scriptToInject);
            } else if (/<html>/i.test(html)) {
                html = html.replace(/<html>/i, '<html>' + scriptToInject);
            } else {
                html = scriptToInject + html;
            }
            
            res.send(html);
        } else {
            const buffer = await response.arrayBuffer();
            res.send(Buffer.from(buffer));
        }
    } catch (err) {
        console.error(`Error in catch-all proxy for ${targetUrl}:`, err);
        res.status(500).send('Proxy error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
