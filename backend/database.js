const sqlite = require('node:sqlite');
const path = require('node:path');

const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite.DatabaseSync(dbPath);

// Criação da tabela de tarefas se não existir
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0
  )
`);

module.exports = db;
