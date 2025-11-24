// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InputForm from './components/Inputform';
import Output from './components/Output'
import Projects from './components/ProjectPage';
import Homepage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import CreateProjectForm from './components/CreateProject';
import ProjectDetails from './components/ParticularProject';
import LabelForm from './components/CreateLabel';

const App = () => {
  return (
    <Router>

      <Routes>
        <Route path="/input-form/:username/:project_no" element={<InputForm />} />
        <Route path="/label-form/:username/:project_no" element={<LabelForm />} />
        <Route path="/output/:username/:project_no/:imageNumber/:frame_count" element={<Output />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/project/:username" element={<Projects />} />
        <Route path="/createproject/:username" element={<CreateProjectForm />} />
        <Route path="/project/:username/:project_no" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
