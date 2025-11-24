import React from 'react'
import TaskList from './TaskList';
import logo from './images/Cyrrup-Logo.png';
import "./css/App.css";

import "./css/TaskList.css"
import CreateProjectModal from './CreateProjModal';

import { useParams } from 'react-router-dom'; // Import useParams to access the username parameter

const IntegratedPage = () => {
    const { username } = useParams(); // Get the username from the route parameter
    return (
       <div>
            {/* Navigation Bar */}
            <nav className="navbar background">
                <ul className="nav-list">
                    <div className="logo">
                        <img src={logo} alt="Cyrrup Logo"/>
                    </div>
                    <li><h3>Cyrrup solutions</h3></li>
                    <div className="divider"></div>
                    <li className="page-name">
                        <a href='http://localhost:3000' style={{color: 'white', textDecoration: 'none'}}>Home</a>
                    </li>
                    <li className="page-name">
                        <a href={`http://localhost:3000/project/${username}`} style={{color: 'white', textDecoration: 'none'}}>Projects</a>
                    </li>
                </ul>
                <div className="rightNav1">
                    <button className="create_new_project">
                        <a href={`http://localhost:3000/createproject/${username}`} style={{color: 'white', textDecoration: 'none'}}>Create Project</a>
                    </button>
                </div>
            </nav>
            
         <div>
            {/* Content Section */}
            <div className="content">
                {/* TaskList component, which will fetch and display tasks */}
                <TaskList username={username} />
            </div>
        </div>
        </div>
    );
}

export default IntegratedPage;