import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Login from './Login';
import Home from './Home';
import AllTasks from './AllTasks'; 
import CreateTask from './CreateTask';  
import EditTask from './EditTask';
import Settings from './Settings';

function App() {
   // State to hold tasks
   const [tasks, setTasks] = useState([]);
   const [user, setUser] = useState(null);

   // Load tasks from local storage on mount
   useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
    if (storedUser) {
      setUser(storedUser); // Set user state
  }
  }, []);


   // A function to add a task (you'll need to implement this in your TaskForm)
   const addTask = (newTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Store updated tasks in local storage
      return updatedTasks;
    });
  };

  const editTask = (updatedTask, index) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task, i) => (i === index ? updatedTask : task));
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save to local storage
      return updatedTasks;
    });
  };

  const deleteTask = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((_, i) => i !== index);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save to local storage
      return updatedTasks;
    });
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser)); // Save user to local storage
 };
  

  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login setUser={setUser} />} />
        <Route path="/Home" element={<Home tasks={tasks} user={user} />} />
        <Route path="/AllTasks" element={<AllTasks tasks={tasks} addTask={addTask} editTask={editTask} deleteTask={deleteTask}/>} />
        <Route path="/CreateTask" element={<CreateTask addTask={addTask} />} />
        <Route path="EditTask" element={<EditTask tasks={tasks} setTasks={setTasks} />} />
        <Route path="/Settings" element={<Settings user={user} updateUser={updateUser} />} />
      </Routes>
    </Router>
  );
}

export default App;