
import React, { useState } from 'react';
import { useTodoContext } from '../hooks/useTodoContext';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import TodoForm from './TodoForm'; 

const TodoDetails = ({ todo }) => {
  const { dispatch } = useTodoContext();
  const [editMode, setEditMode] = useState(false);

  const handleDelete = async () => {
    const response = await fetch('/api/todos/' + todo._id, {
      method: 'DELETE',
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_TODO', payload: json });
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    dispatch({ type: 'SET_EDIT_TODO', payload: todo });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    dispatch({ type: 'SET_EDIT_TODO', payload: null });
  };

  return (
    <div className="todo-details">
      <h4>{todo.taskTitle}</h4>
      <p>
        <strong>Description: </strong>
        {todo.description}
      </p>
      <p>
        <strong>Priority : </strong>
        {todo.priority}
      </p>
      <p>
        <strong>When : </strong>
        {todo.when}
      </p>
      <p>{formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}</p>

      {editMode ? (
        // Update form
        <div>
          <TodoForm isEditMode onCancelEdit={handleCancelEdit} />
        </div>
      ) : (
        // Add form
        <div>
          <span  style={{ marginRight: '50px' }} className="material-symbols-outlined" onClick={handleEdit}>
        EDIT
      </span>
        </div>
      )}
      
      <span className="material-symbols-outlined" onClick={handleDelete}>
        delete
      </span>
    </div>
  );
};

export default TodoDetails;
