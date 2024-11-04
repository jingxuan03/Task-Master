import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CreateTask.css';

const EditTask = ({ tasks, setTasks }) => { // Accept tasks and setTasks as props
    const location = useLocation();
    const navigate = useNavigate();

    const [taskName, setTaskName] = useState('');
    const [priority, setPriority] = useState('Low');
    const [status, setStatus] = useState('Pending');
    const [dueDate, setDueDate] = useState('');

    const taskToEdit = location.state?.task;
    const indexToEdit = location.state?.index;

    useEffect(() => {
        if (taskToEdit) {
            setTaskName(taskToEdit.taskName);
            setPriority(taskToEdit.priority);
            setStatus(taskToEdit.status);
            setDueDate(taskToEdit.dueDate);
        }
    }, [taskToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskName && dueDate) {
            const updatedTask = { taskName, priority, status, dueDate };

            // Update the specific task in the tasks array
            const updatedTasks = tasks.map((task, index) => 
                index === indexToEdit ? updatedTask : task
            );

            setTasks(updatedTasks); // Update state
            localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save updated tasks to local storage

            // Show alert
            alert('Task edited successfully!');

            // Navigate back to AllTasks page
            navigate('/AllTasks');
        }
    };

    return (
        <form onSubmit={handleSubmit}  className="edit-form">
             <button type="button" className="edit-back-button" onClick={() => navigate('/AllTasks')}>Back</button>
             <h2>Edit Task</h2>
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
            <button type="submit" className="edit-button">Confirm</button>
        </form>
    );
};

export default EditTask;
