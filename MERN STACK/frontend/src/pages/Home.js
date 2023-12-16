import React, { useEffect } from "react";
import { useTodoContext } from '../hooks/useTodoContext';
import TodoDetails from '../components/TodoDetails';
import TodoForm from '../components/TodoForm';

const Home = () => {
  const { todos, dispatch } = useTodoContext();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('/api/todos');
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: 'SET_TODOS', payload: json });
        } else {
          console.error('Error fetching todos:', json);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {Array.isArray(todos) ? (
          todos.map((todoItem) => (
            <TodoDetails key={todoItem._id} todo={todoItem} />
          ))
        ) : (
          <p></p>
        )}
      </div>
      <TodoForm />
    </div>
  );
};

export default Home;
