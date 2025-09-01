import React, { useState } from 'react';
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";

const TodoListInput = ({ todoList, setTodoList }) => {
  const [newTask, setNewTask] = useState("");

  // Add item to checklist
  const handleAddTask = () => {
    if (newTask.trim()) {
      setTodoList([...todoList, { text: newTask.trim(), completed: false }]);
      setNewTask("");
    }
  };

  // Remove item from checklist
  const handleDeleteTask = (index) => {
    setTodoList(todoList.filter((_, idx) => idx !== index));
  };

  // Enter key adds task
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTask();
    }
  };

  return (
    <div className="mt-2">
      {todoList.length > 0 && (
        <div className="mb-3 border border-gray-200 rounded-md divide-y divide-gray-100">
          {todoList.map((task, index) => (
            <div
              key={index}
              className="flex justify-between items-center px-3 py-2.5 bg-white hover:bg-gray-50"
            >
              <div className="flex items-center">
                <span className="text-xs text-gray-500 font-medium w-6">
                  {index < 9 ? `0${index + 1}` : index + 1}
                </span>
                <p className="text-sm text-gray-800 ml-2">
                  {task.text}
                </p>
              </div>
              <button
                type="button"
                className="p-1 rounded hover:bg-gray-100 transition-colors"
                onClick={() => handleDeleteTask(index)}
                aria-label="Remove item"
              >
                <HiOutlineTrash className="text-lg text-gray-400 hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Add a task to the checklist"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="button"
          className="flex items-center gap-1 bg-blue-600 text-white text-sm font-medium px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
          onClick={handleAddTask}
        >
          <HiMiniPlus className="text-base" />
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoListInput;