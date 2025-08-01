import React from 'react';
import ToDoItem from './ToDoItem';

export default function ToDoList({ tasks, onDelete }) {
  return (
    <div className="todo-list">
      {tasks.map((task, index) => (
        <ToDoItem
          key={index}
          task={task}
          onDelete={() => onDelete(index)}
        />
      ))}
    </div>
  );
}
