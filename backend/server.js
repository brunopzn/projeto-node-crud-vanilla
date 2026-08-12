const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const handleRoutes = require('./routes');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Configuração básica de CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    // Se a requisição for para a API
    if (req.url.startsWith('/api')) {
        return handleRoutes(req, res);
    }

    // Servir arquivos estáticos do Frontend
    let filePath = path.join(__dirname, '../frontend', req.url === '/' ? 'index.html' : req.url);
    const ext = path.extname(filePath);

    let contentType = 'text/html';
    if (ext === '.css') contentType = 'text/css';
    if (ext === '.js') contentType = 'text/javascript';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end('Arquivo não encontrado');
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
});

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
