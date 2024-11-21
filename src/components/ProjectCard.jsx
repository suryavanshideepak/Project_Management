import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project, onDelete }) => {
  return (
    <>
    <a href="#" class=" m-2 block p-6 bg-white rounded-lg shadow-xl hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{project.name}</h5>
      <p class="font-normal text-sm text-gray-700 dark:text-gray-400">{project.description}</p>
      <div className="flex justify-between py-2">
        <Link to={`/dashboard/${project.id}`} style={{color:"lightgreen"}}>View Details</Link>
        <Link onClick={() => onDelete(project.id)} style={{color:"red"}}>Delete</Link>
      </div>
    </a>
    </>
  );
};

export default ProjectCard;
