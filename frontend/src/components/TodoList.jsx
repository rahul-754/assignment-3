import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetchTodos();
  }, [todos]);

  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/todos');

      setTodos(res.data);
    } catch (error) {
      console.error('Failed to fetch todos', error);
    }
  };

  const addTodo = async () => {
    try {
      const res = await axios.post('http://localhost:5001/api/todos', { text });
      // console.log('Added todo:', res.data); // Debug: log the new todo item
      setTodos(prevTodos => [...prevTodos, res.data]); // Append the new todo
      setText('');
    } catch (error) {
      console.error('Failed to add todo', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/todos/${id}`);
      setTodos(prevTodos => {
        const updatedTodos = prevTodos.filter(todo => todo._id !== id);
        console.log('Updated todos after delete:', updatedTodos); // Debug: log updated todos
        return updatedTodos;
      });
    } catch (error) {
      console.error('Failed to delete todo', error);
    }
  };

  return (
    <div>
      <h1>My To-Do List</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {Array.isArray(todos) ? todos.map(todo => (
          <TodoItem key={todo._id} todo={todo} deleteTodo={deleteTodo} />
        )) : <p>No todos available</p>}
      </ul>
    </div>
  );
};

export default TodoList;
