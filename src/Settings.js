import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css'; // Create a CSS file for styles
import Sidebar from './Sidebar';

const Settings = ({ user, updateUser }) => {
    const navigate = useNavigate();

    // State variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        if (user) {
            setUsername(user.username || '');
            setNotificationsEnabled(user.notificationsEnabled || false);
        } else {
            // Redirect to login or home if user is not logged in
            navigate('/Login'); // Change to the appropriate route
        }
    }, [user, navigate]); // Dependency array

    const handleSubmit = (e) => {
        e.preventDefault();

        // Update user settings (e.g., API call or local storage)
        const updatedUser = {
            ...user,
            username,
            notificationsEnabled,
            // Optionally handle password change logic here
        };

        updateUser(updatedUser); // Call the function passed down from props
        alert('Settings updated successfully!');

        // Navigate back or to a confirmation page
        navigate('/Home'); // Change this to the appropriate route
    };

    return (
        <div className="settings-container">
            <Sidebar />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <h2>Settings</h2>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>
                        <input
                            type="checkbox"
                            checked={notificationsEnabled}
                            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                        />
                        Enable Notifications
                    </label>
                    <button type="submit" className="submit-button">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default Settings;
