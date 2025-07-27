import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // This will now render AutoLogDashboard

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
