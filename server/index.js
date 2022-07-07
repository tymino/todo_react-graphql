const cors = require('cors');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema');
let todos = require('./todos');

const PORT = process.env.PORT || 5000;
const app = express();

const root = {
  getTodos: () => {
    return todos;
  },
  createTodo: ({ body }) => {
    const id = Date.now();
    const newTodo = { id, body, status: false };

    todos.push(newTodo);

    return todos;
  },
  updateTodo: ({ id }) => {
    const updatedTodos = todos.map((todo) => {
      return todo.id === Number(id) ? { ...todo, status: !todo.status } : todo;
    });

    todos = updatedTodos;
    return todos;
  },
  removeTodo: ({ id }) => {
    const newTodos = todos.filter((todo) => todo.id !== Number(id));
    todos = newTodos;
    return todos;
  },
};

app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  }),
);

app.listen(PORT, () => console.log(`Server open, port ${PORT}`));
