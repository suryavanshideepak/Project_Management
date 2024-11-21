import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProject, deleteProject } from "../features/project/projectSlice";
import ProjectCard from "../components/ProjectCard";
import Modal from "../components/Modal";
import Navigator from "../components/Navigator";
import ProjectProgress from "../components/ProjectProgress";
import TaskCompletionChart from "../components/TaskCompletionChart";

const projectProgress = {
  progressData: [
    { date: 'Week 1', progress: 10 },
    { date: 'Week 2', progress: 30 },
    { date: 'Week 3', progress: 50 },
    { date: 'Week 4', progress: 75 },
    { date: 'Week 5', progress: 100 },
  ]
};

const Dashboard = () => {
  const projects = useSelector((state) => state.projects);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [error, setError] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  const handleDelete = (id) => {
    dispatch(deleteProject(id));
  };

  const handleAddProject = () => {
    if (projectName && projectDescription) {
      const newProject = {
        id: projects.length + 1,
        name: projectName,
        description: projectDescription,
        tasks: [],
      };
      dispatch(addProject(newProject));
      setProjectName('');
      setProjectDescription('');
      setError('');
      setModalVisible(false);
    } else {
      setError('Both fields are required!');
    }
  };

  const handleClose = () => {
    setModalVisible(false);
    setError('');
  };

  return (
    <div className="p-5">
      <Navigator title="Dashboard" />
      
      <div>
        <button
          className="bg-midnight text-white py-2 px-4 rounded-lg hover:bg-purple my-2"
          onClick={() => setModalVisible(true)}
        >
          Add New Project
        </button>
        
        <div className="w-full flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <ProjectProgress projectProgress={projectProgress} />
          </div>
          <div className="flex-1">
            <TaskCompletionChart tasks={tasks} />
          </div>
        </div>

        <Modal
          title="Add New Project"
          isVisible={isModalVisible}
          onClose={handleClose}
        >
          <div className="space-y-4">
            <input
              type="text"
              className="border w-full p-2 rounded"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <textarea
              type="text"
              className="border w-full p-2 rounded resize-y"
              placeholder="Project Description"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-end">
              <button
                onClick={handleAddProject}
                className="bg-midnight text-white px-4 py-2 rounded hover:bg-purple"
              >
                Add Project
              </button>
            </div>
          </div>
        </Modal>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
