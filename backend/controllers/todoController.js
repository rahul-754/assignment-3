
const Todo = require('../models/Todo');

// Get all todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add a new todo
const addTodo = async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
    });
    const todo = await newTodo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a todo by ID
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    else{
      console.log("deleted");
    }
    // await todo.remove();
    // res.json({ message: 'Todo removed' });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getTodos,
  addTodo,
  deleteTodo,
};
