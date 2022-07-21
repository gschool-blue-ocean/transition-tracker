import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import AdminHomePage from './Components/AdminHomePage/AdminHomePage'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <AdminHomePage />
  </React.StrictMode>
);
