const API_URL = '/api/todos';
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// Buscar e renderizar tarefas do backend
async function fetchTodos() {
    const res = await fetch(API_URL);
    const todos = await res.json();
    list.innerHTML = '';
    todos.forEach(todo => renderTodo(todo));
}

// Renderizar uma tarefa individual na árvore DOM
function renderTodo(todo) {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed === 1;
    checkbox.addEventListener('change', () => toggleTodo(todo.id, checkbox.checked));

    const span = document.createElement('span');
    span.textContent = todo.title;
    if (todo.completed === 1) span.classList.add('completed');

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Excluir';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    const divLeft = document.createElement('div');
    divLeft.style.display = 'flex';
    divLeft.style.display = 'inline-flex';
    divLeft.style.gap = '10px';
    divLeft.appendChild(checkbox);
    divLeft.appendChild(span);

    li.appendChild(divLeft);
    li.appendChild(deleteBtn);
    list.appendChild(li);
}

// Criar nova tarefa (POST)
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = input.value.trim();
    if (!title) return;

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });

    input.value = '';
    fetchTodos();
});

// Alternar status de concluído (PUT)
async function toggleTodo(id, completed) {
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: completed ? 1 : 0 })
    });
    fetchTodos();
}

// Deletar tarefa (DELETE)
async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTodos();
}

// Inicialização
fetchTodos();
