import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/TaskList.css';

const TaskList = ({ username }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/task/');
        const data = await response.json();
        // Filter the tasks for the logged-in user's username
        const userTasks = data.filter(task => task.Username === username);
        setTasks(userTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [username]); // Dependency array includes username to refetch when it changes

  return (
    <div >
      <div className='Project_list_heading'>
      <h1>Project List</h1>
      </div>

      <div className="task-list-container">
        {tasks.map(task => (
          <Link key={task.Project_No} to={`/project/${username}/${task.Project_No}`} style={{ textDecoration: 'none' }}>
            <div className="project-box">
            <h3>{task.Project_Name}</h3>
            <div class="info-card"> 
              <p>Project {task.Project_No}</p>
              <p>Username: {task.Username}</p> </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TaskList;