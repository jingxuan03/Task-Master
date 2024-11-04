import React from 'react';
import './Home.css';
import Sidebar from './Sidebar';

const Home = ({ tasks = [], addTask, user }) => {
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

      const incompleteTasks = tasks.filter(task => task.status !== 'Completed');
      const completedTasks = tasks.filter(task => task.status === 'Completed');

      const today = new Date().toISOString().split('T')[0];

      const overdueTasks = tasks.filter(task => {
        return task.dueDate < today && task.status !== 'Completed';
      });

  return (
    <div className="home">
      <Sidebar />
      <main className="content">
        <h1>Dashboard{user && <h2>Welcome, {user.username}!</h2>}</h1>
 {/* Display username */}
        <table>
        <thead>
        <tr>
        <th colSpan="4" className="ongoing-header">Ongoing Tasks</th>
        </tr>
          <tr>
            <th>Task Name</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
           {incompleteTasks.length === 0 ? (
            <tr>
              <td colSpan="4">No ongoing tasks available</td>
            </tr>
          ) : (
            incompleteTasks.map((task, index) => (
              <tr key={index}>
                <td>{task.taskName}</td>
                <td className={getPriorityClass(task.priority)}>
                    {task.priority}
                  </td>
                  <td className={getStatusClass(task.status)}>
                    {task.status}
                  </td>
                <td>{task.dueDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <table>
        <thead>
        <tr>
        <th colSpan="4" className="overdue-header">Overdue Tasks</th>
        </tr>
          <tr>
            <th>Task Name</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
           {overdueTasks.length === 0 ? (
            <tr>
              <td colSpan="4">No overdue tasks available</td>
            </tr>
          ) : (
            overdueTasks.map((task, index) => (
              <tr key={index}>
                <td>{task.taskName}</td>
                <td className={getPriorityClass(task.priority)}>
                    {task.priority}
                  </td>
                  <td className={getStatusClass(task.status)}>
                    {task.status}
                  </td>
                <td>{task.dueDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <table>
        <thead>
        <tr>
        <th colSpan="4" className="completed-header">Completed Tasks</th>
        </tr>
          <tr>
            <th>Task Name</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
           {completedTasks.length === 0 ? (
            <tr>
              <td colSpan="4">No completed tasks available</td>
            </tr>
          ) : (
            completedTasks.map((task, index) => (
              <tr key={index}>
                <td>{task.taskName}</td>
                <td className={getPriorityClass(task.priority)}>
                    {task.priority}
                  </td>
                  <td className={getStatusClass(task.status)}>
                    {task.status}
                  </td>
                <td>{task.dueDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      </main>
    </div>
  );
}

export default Home;
