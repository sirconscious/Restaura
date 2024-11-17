import React, { useState } from 'react';
import { FaTrashAlt, FaPlus } from 'react-icons/fa';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const handleAddTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, taskInput.trim()]);
      setTaskInput('');
    }
  };

  const handleDeleteTask = (taskIndex) => {
    setTasks(tasks.filter((_, index) => index !== taskIndex));
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md" id='todolist'>
      <h2 className="text-lg font-semibold mb-4">Todo List</h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Add a new task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="flex-grow p-2 border rounded-lg mr-3 focus:outline-none"
        />
        <button onClick={handleAddTask} className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
          <FaPlus />
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li key={index} className="flex items-center justify-between p-2 border rounded-lg">
            <span>{task}</span>
            <FaTrashAlt onClick={() => handleDeleteTask(index)} className="text-red-500 cursor-pointer" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
