import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import CreateTask from './CreateTask';
import './AllTasks.css';

const AllTasks = ({ tasks = [], addTask, editTask, deleteTask }) => {
    const navigate = useNavigate();

    const getPriorityClass = (priority) => {
        switch (priority) {
          case 'Low':
            return 'priority-low';  // Green
          case 'Medium':
            return 'priority-medium'; // Yellow
          case 'High':
            return 'priority-high'; // Red
          default:
            return '';
        }
      };

      const getStatusClass = (status) => {
        switch (status) {
          case 'Completed':
            return 'status-low';  // Green
          case 'In Progress':
            return 'status-medium'; // Yellow
          case 'Pending':
            return 'status-high'; // Red
          default:
            return '';
        }
      };

      const handleEdit = (task, index) => {
        // Navigate to CreateTask and pass the task to edit
        navigate('/EditTask', { state: { task, index } });
      };
    
      const handleDelete = (index) => {
        // Prompt the user for confirmation
        const confirmDelete = window.confirm("Do you wish to delete this task?");
        
        if (confirmDelete) {
            deleteTask(index); // Call the delete function passed down from props
        }
    };

  return (
    <div className="alltasks">
      <Sidebar />
      <main className="content">
      <h1>All Tasks</h1>
      <nav>
            <ul>
                <NavLink exact to="/CreateTask">+ Create</NavLink>
            </ul>
          </nav>
      <table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="5">No tasks available</td>
            </tr>
          ) : (
            tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.taskName}</td>
                <td className={getPriorityClass(task.priority)}>
                    {task.priority}
                  </td>
                  <td className={getStatusClass(task.status)}>
                    {task.status}
                  </td>
                <td>{task.dueDate}</td>
                <td>
                    <button onClick={() => handleEdit(task, index)} className="all-edit-button">Edit</button>
                    <button onClick={() => handleDelete(index)} className="all-delete-button">Delete</button>
                  </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </main>
    </div>
  );
};

export default AllTasks;