import React from "react";

const TaskTable = ({ tasks, onEdit, onDelete }) => {
  return (
    <table className="w-full mt-4 border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2">Task Name</th>
          <th className="border border-gray-300 px-4 py-2">Status</th>
          <th className="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id} className="hover:bg-gray-50">
            <td className={`text-center border border px-4 py-2`}>{task.name}</td>
            <td 
              className={`text-center border border px-4 py-2 `} 
              >
                {task.status}
            </td>
            <td className="text-center border border-gray-300 px-4 py-2">
              <button
                className="px-2 py-1 text-sm bg-blue-500 text-black rounded-md mr-2"
                onClick={() => onEdit(task)}
              >
                Edit
              </button>
              <button
                className="px-2 py-1 text-sm bg-red-500 text-metal rounded-md"
                onClick={() => onDelete(task.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
