import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import SearchBar from './components/SearchBar';
import Toast from './components/Toast';
import { getCachedTasks, setCachedTasks } from './cache';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [toast, setToast] = useState(null);
  const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  const fetchTasks = async () => {
    try {
      const cached = getCachedTasks();
      if (cached) {
        setTasks(cached);
        return;
      }

      const response = await axios.get(`${backendURL}/tasks`);
      setTasks(response.data);
      setCachedTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      setToast({ type: 'error', message: 'Failed to load tasks.' });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const response = await axios.post(`${backendURL}/tasks`, task);
      setTasks([...tasks, response.data]);
      setCachedTasks([...tasks, response.data]);
      setToast({ type: 'success', message: 'Task added!' });
    } catch (error) {
      console.error('Failed to add task:', error);
      setToast({ type: 'error', message: 'Failed to add task.' });
    }
  };

  const searchTasks = async (query) => {
    try {
      const response = await axios.get(`${backendURL}/search?q=${encodeURIComponent(query)}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to search tasks:', error);
      setToast({ type: 'error', message: 'Search failed.' });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>🧠 Task Vector App</h1>
      <TaskForm onAdd={addTask} />
      <SearchBar onSearch={searchTasks} />
      <TaskList tasks={tasks} />
      {toast && <Toast type={toast.type} message={toast.message} />}
    </div>
  );
};

export default App;
