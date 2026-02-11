// Minimal placeholder logic until we port the original game's code.
// We'll replace this with the real game logic from the attached project later.
export function initGame(root) {
  const el = document.createElement('div');
  el.style.color = '#fff';
  el.style.fontFamily = 'system-ui, -apple-system, Segoe UI, Arial, sans-serif';
  el.style.display = 'grid';
  el.style.placeItems = 'center';
  el.style.height = '100%';
  el.innerHTML = '<h1>Solitaire build placeholder</h1><p>Ready to port game code.</p>';
  root.appendChild(el);
}
