import React, { useState, useEffect } from "react";

const TaskForm = ({ onSubmit, task, onCancel }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("To Do");

  useEffect(() => {
    if (task) {
      setName(task.name);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit({ id: task?.id || Date.now(), name, status });
      resetForm();
    }
  };

  const resetForm = () => {
    setName("");
    setStatus("To Do");
    if (onCancel) onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-start items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <input
        type="text"
        placeholder="Task Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-auto"
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-auto"
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
        <button
          type="submit"
          className="bg-midnight text-white px-4 py-2 rounded hover:bg-purple w-full sm:w-auto"
        >
          {task ? "Update Task" : "Add Task"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-metal text-white px-4 py-2 rounded hover:bg-metal w-full sm:w-auto"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
