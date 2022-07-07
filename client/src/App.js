import './App.sass';

import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { GET_TODOS, CREATE_TODO, UPDATE_TODO, REMOVE_TODO } from './graphql';

const App = () => {
  const { loading, data } = useQuery(GET_TODOS);
  const [newTodo] = useMutation(CREATE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [removeTodo] = useMutation(REMOVE_TODO);

  const [todos, setTodos] = useState([]);
  const [todoBody, setTodoBody] = useState('');

  const handleInputChange = (e) => {
    setTodoBody(e.target.value);
  };

  const handleButtonClick = async () => {
    const { data } = await newTodo({
      variables: { body: todoBody },
    });

    setTodos(data.createTodo);
    setTodoBody('');
  };

  const handleClickTodo = async (id) => {
    const { data } = await updateTodo({
      variables: { id },
    });

    setTodos(data.updateTodo);
  };

  const handleClickRemove = async (id) => {
    const { data } = await removeTodo({
      variables: { id },
    });

    setTodos(data.removeTodo);
  };

  useEffect(() => {
    if (!loading) {
      setTodos(data.getTodos);
    }
  }, [data, loading]);

  return (
    <div className="content">
      <div className="content__wrapper-input">
        <input type="text" value={todoBody} onChange={handleInputChange} />
        <button onClick={handleButtonClick}>Add</button>
      </div>

      <div className="content__wrapper-todos">
        {todos.map((todo) => {
          return (
            <div key={todo.id} className="content__todo todo">
              <div
                className="todo__wrapper"
                onClick={() => handleClickTodo(todo.id)}>
                <div className="todo__body">
                  {todo.body}
                  <div
                    className={
                      !todo.status
                        ? 'todo__line'
                        : 'todo__line todo__line--active'
                    }
                  />
                </div>
              </div>
              <button
                className="todo__button"
                onClick={() => handleClickRemove(todo.id)}></button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
