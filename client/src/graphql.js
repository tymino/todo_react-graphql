import { gql } from '@apollo/client';

const GET_TODOS = gql`
  query {
    getTodos {
      id
      body
      status
    }
  }
`;

const CREATE_TODO = gql`
  mutation createTodo($body: String!) {
    createTodo(body: $body) {
      id
      body
      status
    }
  }
`;
const UPDATE_TODO = gql`
  mutation updateTodo($id: ID!) {
    updateTodo(id: $id) {
      id
      body
      status
    }
  }
`;

const REMOVE_TODO = gql`
  mutation removeTodo($id: ID!) {
    removeTodo(id: $id) {
      id
      body
      status
    }
  }
`;

export { GET_TODOS, CREATE_TODO, UPDATE_TODO, REMOVE_TODO };
