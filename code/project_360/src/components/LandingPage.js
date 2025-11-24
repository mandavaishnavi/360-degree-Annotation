import React, { useState, useEffect } from 'react';
import "./css/App.css"
import './css/Navbar.css'
import logo from './images/Cyrrup-Logo.png';
import image1 from './images/panoramic1.jpg';
import image2 from './images/panoramic2.jpg';
import image3 from './images/panoramic3.jpeg';
import image4 from './images/panoramic4.jpg';
import image5 from './images/panoramic5.jpg';

function Homepage() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [image1, image2, image3, image4, image5];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(intervalId);
    }, [images.length]);

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
                <div className="rightNav">
                    <button className="sign-in">
                       <a href='http://localhost:3000/login' style={{color: 'white', textDecoration: 'none'}}> Sign In</a>
                    </button>
                    <button className="sign-in">
                       <a href='http://localhost:3000/signup' style={{color: 'white', textDecoration: 'none'}}> Sign Up</a>
                    </button>
                </div>
            </nav>

            <div className="content">
                <h1>Welcome to 360-Degree Image Labeling interface</h1>
                <h4>This app allows you to manage and annotate 360-degree images with ease. You can import images, add labels, annotate using various tools, and export annotations in different formats.</h4>
                <button className="get-started_login">
                    <a href='http://localhost:3000/login' style={{color: 'white', textDecoration: 'none'}}>
                         Get Started        
                    </a>
                    
                </button>
            </div>

            <div className="panoramic-images">
            <div className="panoramic-image-container">
                <img className="panoramic-image" src={images[currentImageIndex]} alt="Panoramic" />
            </div>
        </div>
        </div>
    );
}

export default Homepage;