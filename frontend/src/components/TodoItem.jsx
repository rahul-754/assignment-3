import React from 'react';

const TodoItem = ({ todo, deleteTodo }) => {
  return (
    <li>
      {todo.text}
      <button onClick={() => deleteTodo(todo._id)}>Delete</button>
    </li>
  );
};

export default TodoItem;
