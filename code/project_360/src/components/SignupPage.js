import React, { useState } from 'react';
import './css/signup.css';
import './css/App.css';
import './css/Navbar.css'
import logo from './images/Cyrrup-Logo.png';
import {useNavigate} from 'react-router-dom'

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        console.log('Signup successful');
        navigate(`/project/${username}`);

        // You can redirect or perform any other action upon successful signup
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
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
      <div className="signup-page">
        <div className="signup-box">
          <h2 className="signup-heading">Signup</h2>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label className="signup-label">
              <input
                type="text"
                className="signup-input"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label className="signup-label">
              <input
                type="password"
                className="signup-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button type="submit" className="signup-button">
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
