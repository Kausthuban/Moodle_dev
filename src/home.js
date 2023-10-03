import React, { useState } from 'react';
import './home.css'; // Add your CSS file for styling
import { Icon } from '@material-ui/core';


const Home = () => {
    const [isCollapsed, setCollapsed] = useState(false);

    const handleToggle = () => {
      setCollapsed(!isCollapsed);
    };
  return (
    <div className={`home-page`}>
      <div className={`navbar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className='nav-logo'>{isCollapsed ? (
            <img className='login-logo-small' src={require('./assets/navbar-logo-small.png')} alt="Logo Small" />
          ) : (
            <img className='login-logo-big' src={require('./assets/navbar-logo.png')} alt="Logo" />
          )}</div>
        <nav className="nav-items">
          {/* Add your navigation links here */}
          <a href="#"><Icon></Icon>Dashboard</a>
          <a href="#">My Courses</a>
          <a href="#">Lessons</a>
          <a href="#">Leaderboard</a>
          <a href="#">Profile</a>
          {/* ... */}
          {/* <div className="notification-badge"></div> */}
        </nav>
        
        <div className="notification-badge"><button onClick={handleToggle} className="toggle-button"><img className='close-btn' src={require('./assets/close.png')}/></button></div>
      </div>

      {/* Main Content */}
      <div className={`main-content ${isCollapsed ? 'collapsed' : ''}`}>
        {/* Top Bar */}
        <div className="top-bar">
          <div className="dashboard-info">
            <span>Dashboard</span>
            <span>User Name</span>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search" />
          </div>
          <div className="notification-bell">
            {/* Bell icon or notification component */}
            <span>🔔</span>
          </div>
          <div className="user-profile">
            {/* Small user image */}
            <img src="user-image.jpg" alt="User" />
          </div>
        </div>

        {/* Main Content Goes Here */}
        <div className="content">
          {/* Your page content */}
          <h1>Welcome to the Dashboard!</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
