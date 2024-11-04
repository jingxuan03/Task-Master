import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
  
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        // Clear any stored data related to authentication
        localStorage.removeItem('authToken'); // Example: remove token
        sessionStorage.removeItem('authToken'); // Or remove from sessionStorage
  
        // Redirect to the login page
        navigate('/login');
      };
  
    return (
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isOpen ? '|||' : '|||'}
        </button>
        {isOpen && (
        <div className="sidebar-content">
          <h1>Task Master</h1>
          <nav>
            <ul>
            <li className={isActive('/Home') ? 'active' : ''}>
                <NavLink exact to="/Home">Dashboard</NavLink>
              </li>
              <li className={isActive('/all-tasks') ? 'active' : ''}>
                <NavLink to="/AllTasks">All Tasks</NavLink>
              </li>
              <li className={isActive('/Settings') ? 'active' : ''}>
                <NavLink to="/Settings">Settings</NavLink>
              </li>
            </ul>
          </nav>
          <button className="logout" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </aside>
  );
}
  
  export default Sidebar;