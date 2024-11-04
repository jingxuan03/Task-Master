// src/TaskForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateTask.css';

const CreateTask= ({ addTask }) => {
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('Low');
  const [status, setStatus] = useState('Pending');
  const [dueDate, setDueDate] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName && dueDate) {
      addTask({ taskName, priority, status, dueDate });
      
      // Show alert
      alert('Task created successfully!');
      
      // Navigate back to AllTasks page
      navigate('/AllTasks');
      
      // Reset form fields
      setTaskName('');
      setPriority('Low');
      setStatus('Pending');
      setDueDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
        <button type="button" className="back-button" onClick={() => navigate('/AllTasks')}>Back</button>
        <h2>Create Task</h2>
      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        required
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <button type="submit" className="submit-button">Create</button>
    </form>
  );
};

export default CreateTask;
