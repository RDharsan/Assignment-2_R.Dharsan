import React, { useState, useEffect } from 'react';
import { useTodoContext } from '../hooks/useTodoContext';

const TodoUpdate = () => {
  const { dispatch, editTodo } = useTodoContext();
  const [formData, setFormData] = useState({
    taskTitle: '',
    description: '',
    priority: '',
    when: '',
  });

  useEffect(() => {
    if (editTodo) {
      setFormData({
        taskTitle: editTodo.taskTitle,
        description: editTodo.description,
        priority: editTodo.priority,
        when: editTodo.when,
      });
    }
  }, [editTodo]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    const response = await fetch('/api/todos/' + editTodo._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'SET_TODOS', payload: json });
      dispatch({ type: 'SET_EDIT_TODO', payload: null });
    }
  };

  return (
    <div className="todo-update">
      <h2>Update Todo</h2>
      <form>
        <label>
          Task Title:
          <input
            type="text"
            name="taskTitle"
            value={formData.taskTitle}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Priority:
          <textarea
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
          ></textarea>
        </label>
        <label>
          When:
          <textarea
            name="when"
            value={formData.when}
            onChange={handleInputChange}
          ></textarea>
        </label>
        <button type="button" onClick={handleUpdate}>
          Update Todo
        </button>
      </form>
    </div>
  );
};

export default TodoUpdate;
