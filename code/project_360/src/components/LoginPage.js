import React, { useState } from 'react';
import './css/App.css';
import './css/Navbar.css';
import './css/login.css';
import logo from './images/Cyrrup-Logo.png';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username,
      password
    };

    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Login successful');
        navigate(`/project/${formData.username}`); // Redirect to the projects page with the username as a parameter
      } else {
        const data = await response.json();
        setError(data.message); // Assuming your API sends error messages in a 'message' field
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <nav className="navbar background">
        <ul className="nav-list">
          <div className="logo">
            <img src={logo} alt="Cyrrup Logo" />
          </div>
          <li><h3>Cyrrup solutions</h3></li>
          <div className="divider"></div>
          <li className="page-name">
            <a href='http://localhost:3000' style={{color: 'white', textDecoration: 'none'}}>Home</a>
          </li>
        </ul>
      </nav>

      <div className="login-page">
        <div className="login-box">
          <h2 className="login-heading">Login</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <label className="login-label">
              <input 
                type="text" 
                value={username} 
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)} 
                className="login-input"
              />
            </label>
            <label className="login-label">
              <input 
                type="password" 
                value={password} 
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)} 
                className="login-input"
              />
            </label>
          {error && <p className="error-message-login">{error}</p>}

            <button type="submit" className="login-button">Login</button>
          </form>

          <div className="signup">
            Don't have an account? 
            <button className="signup-button">
              <a href='http://localhost:3000/signup' style={{color: 'white', textDecoration: 'none'}}>
              Signup
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
