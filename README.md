# To-Do List CRUD - Node.js Vanilla & SQLite

Este é um projeto de estudos desenvolvido para compreender o funcionamento de uma API RESTful utilizando exclusivamente os módulos nativos do Node.js. O projeto foi construído **sem o uso de nenhum framework web**, implementando toda a lógica de roteamento e servidor do zero.

## Objetivo do Projeto

O propósito principal é entender os fundamentos da web e manipulação de dados em nível mais baixo:
* Criar um servidor HTTP utilizando o módulo nativo `http`.
* Manipular rotas, parâmetros de URL e métodos HTTP manualmente.
* Processar streams e buffers de dados para receber corpos de requisições (JSON) sem intermediários.
* Realizar operações de CRUD em um banco de dados relacional (SQLite).

## Tecnologias Utilizadas

* Node.js (Módulo HTTP nativo)
* SQLite (Persistência de dados)
* JavaScript (ES6+)

## Funcionalidades (CRUD)

* Criar uma tarefa (POST /todos)
* Listar todas as tarefas (GET /todos)
* Visualizar uma tarefa específica (GET /todos/:id)
* Atualizar uma tarefa (PUT /todos/:id)
* Excluir uma tarefa (DELETE /todos/:id)
