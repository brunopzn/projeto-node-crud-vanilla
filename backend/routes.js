const db = require('./database');

// Função auxiliar para capturar o corpo da requisição JSON
const parseJsonBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try { resolve(body ? JSON.parse(body) : {}); }
            catch (err) { reject(err); }
        });
    });
};

// Função auxiliar para enviar respostas JSON
const sendJson = (res, status, data) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
};

module.exports = async function handleRoutes(req, res) {
    const { method, url } = req;

    // GET /api/todos - Listar todos
    if (method === 'GET' && url === '/api/todos') {
        const todos = db.prepare('SELECT * FROM todos').all();
        return sendJson(res, 200, todos);
    }

    // POST /api/todos - Criar tarefa
    if (method === 'POST' && url === '/api/todos') {
        try {
            const body = await parseJsonBody(req);
            if (!body.title) return sendJson(res, 400, { error: 'O título é obrigatório' });

            const stmt = db.prepare('INSERT INTO todos (title) VALUES (?)');
            const result = stmt.run(body.title);

            return sendJson(res, 210, { id: result.lastInsertRowid, title: body.title, completed: 0 });
        } catch (err) {
            return sendJson(res, 400, { error: 'JSON inválido' });
        }
    }

    // PUT /api/todos/:id - Atualizar tarefa
    if (method === 'PUT' && url.startsWith('/api/todos/')) {
        const id = url.split('/')[3];
        try {
            const body = await parseJsonBody(req);
            const stmt = db.prepare('UPDATE todos SET title = COALESCE(?, title), completed = COALESCE(?, completed) WHERE id = ?');
            const result = stmt.run(body.title, body.completed, id);

            if (result.changes === 0) return sendJson(res, 404, { error: 'Tarefa não encontrada' });
            return sendJson(res, 200, { message: 'Atualizado com sucesso' });
        } catch (err) {
            return sendJson(res, 400, { error: 'Erro ao atualizar' });
        }
    }

    // DELETE /api/todos/:id - Deletar tarefa
    if (method === 'DELETE' && url.startsWith('/api/todos/')) {
        const id = url.split('/')[3];
        const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
        const result = stmt.run(id);

        if (result.changes === 0) return sendJson(res, 404, { error: 'Tarefa não encontrada' });
        return sendJson(res, 200, { message: 'Deletado com sucesso' });
    }

    // Rota não encontrada
    return sendJson(res, 404, { error: 'Rota não encontrada' });
};
