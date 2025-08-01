import React, { useState } from 'react';
import ToDoList from './ToDoList';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim() !== '') {
      setTasks([...tasks, input]);
      setInput('');
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="app-container">
      <h1>ToDo List App</h1>
      <input
        type="text"
        placeholder="Enter task description"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTask} className="add-button">Add Task</button>
      <ToDoList tasks={tasks} onDelete={deleteTask} />
    </div>
  );
}
