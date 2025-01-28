import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navigator from "../components/Navigator";
import { assignTaskToEmployee } from "../features/task/taskSlice";

const TaskManagement = () => {
  const dispatch = useDispatch();
  const [isToast, setIsToast] = useState(false);

  const projectManagers = useSelector((state) =>
    state.users.users.filter((user) => user?.role === "Project Manager")
  );
  const employees = useSelector((state) =>
    state.users.users.filter((user) => user?.role === "Employee")
  );
  const tasks = useSelector((state) => state.tasks);
  const users = useSelector((state) => state.users.users);

  const [selectedManager, setSelectedManager] = useState(null);
  const [taskAssignments, setTaskAssignments] = useState({});

  const handleManagerChange = (e) => {
    setSelectedManager(e.target.value);
  };

  const handleAssignmentChange = (taskId, employeeId) => {
    setTaskAssignments((prev) => ({
      ...prev,
      [taskId]: employeeId,
    }));
  };

  const saveAssignments = () => {
    Object.entries(taskAssignments).forEach(([taskId, employeeId]) => {
      dispatch(
        assignTaskToEmployee({
          taskId: Number(taskId),
          employeeId: Number(employeeId),
          managerId: Number(selectedManager),
        })
      );
    });
    setIsToast(true);
    setSelectedManager(null);
    setTaskAssignments({});
  };

  return (
    <div className="p-5">
      {isToast && (
        <div
          id="toast-success"
          className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">
            Task assignments saved successfully.
          </div>
          <button
            type="button"
            onClick={() => setIsToast(false)}
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-success"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}

      <div style={{ padding: "20px" }}>
        <Navigator title={"Task Assignment"} />

        <div style={{ marginBottom: "20px" }}>
          <label>Project Manager: </label>
          <select
            value={selectedManager || ""}
            onChange={handleManagerChange}
            className="p-2 border rounded"
          >
            <option value="" disabled>
              Select a Project Manager
            </option>
            {projectManagers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.name}
              </option>
            ))}
          </select>
        </div>

        {selectedManager && (
          <div>
            <h3 className="text-lg font-semibold">Assign Tasks to Employees :</h3>
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 sm:mb-4 mb-2 p-2"
              >
                <div className="flex-1">
                  <strong>Task:</strong>
                  <p>{task.name}</p>
                </div>
                <div className="flex-1">
                  <select
                    className="m-2 p-2 border rounded"
                    value={taskAssignments[task.id] || ""}
                    onChange={(e) =>
                      handleAssignmentChange(task.id, e.target.value)
                    }
                  >
                    <option value="" disabled>
                      Select an Employee
                    </option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedManager && (
          <button
            onClick={saveAssignments}
            className="mt-4 py-2 px-4 bg-midnight text-white rounded hover:bg-purple"
          >
            Save Assignments
          </button>
        )}
      </div>
      {tasks.length > 0 ?
      <div className="overflow-x-auto mt-6">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Manager</th>
              <th className="border border-gray-300 px-4 py-2">Assign to</th>
              <th className="border border-gray-300 px-4 py-2">Task</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks
              .filter((task) => task.assignedTo)
              .map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="text-center border px-4 py-2">
                    {
                      users.find((user) => user.id === task.managerId)
                        ?.name || "Unassigned"
                    }
                  </td>
                  <td className="text-center border px-4 py-2">
                    {
                      users.find((user) => user.id === task.assignedTo)
                        ?.name || "Unassigned"
                    }
                  </td>
                  <td className="text-center border px-4 py-2">{task.name}</td>
                  <td className="text-center border px-4 py-2">{task.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>: ''}
    </div>
  );
};

export default TaskManagement;
