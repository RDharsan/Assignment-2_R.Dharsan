
import React, { useState, useEffect } from 'react';
import { useTodoContext } from '../hooks/useTodoContext';

const TodoForm = ({ isEditMode, onCancelEdit }) => {
  const { dispatch, editTodo } = useTodoContext();

  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [when, setWhen] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    if (isEditMode && editTodo) {
      setTaskTitle(editTodo.taskTitle || '');
      setDescription(editTodo.description || '');
      setPriority(editTodo.priority || '');
      setWhen(editTodo.when || '');
    }
  }, [isEditMode, editTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = { taskTitle, description, priority, when };

    const url = isEditMode ? `/api/todos/${editTodo._id}` : '/api/todos';
    const method = isEditMode ? 'PATCH' : 'POST';

    const response = await fetch(url, {
      method,
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setError(null);
      setTaskTitle('');
      setDescription('');
      setPriority('');
      setWhen('');
      setEmptyFields([]);
      console.log('Task added/updated:', json);
      dispatch({ type: isEditMode ? 'SET_TODOS' : 'CREATE_TODO', payload: json });
      dispatch({ type: 'SET_EDIT_TODO', payload: null });

      window.location.reload();
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>{isEditMode ? 'Update Todo' : 'Add a New Todo Task'}</h3>

      <label>Task Title:</label>
      <input
        type="text"
        onChange={(e) => setTaskTitle(e.target.value)}
        value={taskTitle}
        className={emptyFields.includes('taskTitle') ? 'error' : ''}
      />

      <label>Description:</label>
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes('description') ? 'error' : ''}
        style={{
          width: '315px', // Adjust the initial width as needed
          minHeight: '100px', // Adjust the initial minimum height as needed
          resize: 'both', // 'both' allows for both horizontal and vertical resizing
        }}
      />



      <label>Priority:</label>
      <select
        onChange={(e) => setPriority(e.target.value)}
        value={priority}
        className={emptyFields.includes('priority') ? 'error' : 'custom-select'}
      >
        <option value="">Select Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>



      <label>When:</label>
      <input
        type="datetime-local"
        onChange={(e) => setWhen(e.target.value)}
        value={when}
        className={emptyFields.includes('when') ? 'error' : 'custom-input'}
      />


      <button style={{ marginRight: '10px' }}>{isEditMode ? 'Update Todo ' : 'Add Todo'}</button>

      {isEditMode && (
        <button type="button" onClick={onCancelEdit}>
          Cancel
        </button>
      )}

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TodoForm;
