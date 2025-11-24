import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/CreateProject.css";

const CreateProjectModal = ({ username }) => {
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateProject = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/createproject/${username}/`, {
        method: 'POST',
        body: JSON.stringify({ project_name: projectName }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Project created successfully:', result);
        navigate(`/project/${username}`);
      } else {
        console.error('Failed to create project:', response.statusText);
        const data = await response.json();
        setError(data.message); 
      }
    } catch (error) {
      console.error('Error creating project:', error.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => navigate(`/project/${username}`)}>&times;</span>
        <h2>New Project</h2>
        <label htmlFor="projectName">Project Name:</label>
        <input
          type="text"
          id="projectName"
          className="project-name-input"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
        />
        {error && <p className="error-message-c_proj">{error}</p>}
        <button className="create-project-btn" onClick={handleCreateProject}>
          Create Project
        </button>
      </div>
    </div>
  );
};

export default CreateProjectModal;
