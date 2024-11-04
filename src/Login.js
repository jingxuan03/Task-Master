import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ setUser }) {
  // State variables to store input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder login logic - here you might want to check credentials or call an API
    if (username && password) {
      console.log('Logging in with:', { username, password });
      setUser({ username });
      if (rememberMe) {
        localStorage.setItem('rememberedUser', username); // Save to local storage if "Remember Me" is checked
      }
      alert('Login successful!');
      navigate('/home');
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="login-form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="login-form-group">
          <label>Password</label>
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        <div className="login-form-group remember-me">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember Me
          </label>
        </div>

        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;
