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
  setTodo: ({ body }) => {
    const id = Date.now();
    const newTodo = { id, body, isDone: false };

    todos.push(newTodo);

    return todos;
  },
  updateTodo: ({ id }) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === Number(id)) {
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      }

      return todo;
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
