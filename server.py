import http.server
import socketserver

# Define the port for the server
PORT = 8000

# Set the handler to serve files
Handler = http.server.SimpleHTTPRequestHandler

# Set the directory to serve from
Handler.directory = 'templates/'

# Create the server and bind it to the port
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving on port {PORT}")
    httpd.serve_forever()

# run the server: python3 server.py
# end the server: Ctrl + C (in terminal)
# server url: http://localhost:8000/templates/