import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { LoginContextProvider } from './Context/LoginContext.jsx';
import { AppContextProvider } from './Context/AppContext.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <LoginContextProvider>

          <App />

        </LoginContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
