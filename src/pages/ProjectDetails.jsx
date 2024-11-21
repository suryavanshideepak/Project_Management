import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TaskForm from "../components/TaskForm";
import Navigator from "../components/Navigator";
import TaskTable from "../components/TaskTable";
import { addTask, deleteTask, editTask } from "../features/task/taskSlice";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskData, setEditTaskData] = useState(null);
  const project = useSelector((state) =>
    state.projects.find((p) => p.id === Number(projectId))
  );
  const tasks = useSelector((state) =>
    state.tasks.filter((t) => t.projectId === Number(projectId))
  );

  if (!project) return <p>Project not found.</p>;

  const handleAddTask = (task) => {
    dispatch(addTask({ ...task, projectId: Number(projectId), id: Date.now() }));
  };

  const handleEditTask = (task) => {
    dispatch(editTask(task));
    setIsEditing(false);
    setEditTaskData(null);
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <div className="p-5">
      <Navigator title={'Tasks'} />
      
      <div className="py-4">
        <h2>Project Name : {project.name}</h2>
        <p>Project Description : {project.description}</p>
      </div>
      
      <div className="mt-6">
        <h3 className="text-xl text-purple-600">Add Tasks</h3>
        
        {isEditing ? (
          <TaskForm
            task={editTaskData}
            onSubmit={handleEditTask}
            onCancel={() => {
              setIsEditing(false);
              setEditTaskData(null);
            }}
          />
        ) : (
          <TaskForm onSubmit={handleAddTask} />
        )}
      </div>
      
      <div className="mt-6">
        <h3 className="text-xl text-purple-600">Task List</h3>
        <TaskTable
          tasks={tasks}
          onEdit={(task) => {
            setEditTaskData(task);
            setIsEditing(true);
          }}
          onDelete={handleDeleteTask}
        />
      </div>
    </div>
  );
};

export default ProjectDetails;
