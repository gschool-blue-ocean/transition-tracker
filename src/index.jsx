import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
<<<<<<< HEAD
import AdminHomePage from './Components/AdminHomePage/AdminHomePage'
=======
import { BrowserRouter } from 'react-router-dom';
import { LoginContextProvider } from './Context/LoginContext.jsx';
import { AppContextProvider } from './Context/AppContext.jsx';

>>>>>>> 7c4e7ec136a944f94b47af7f009a366ef557c41a

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    {/* <App /> */}
    <AdminHomePage />
=======
    <BrowserRouter>
      <AppContextProvider>
        <LoginContextProvider>
          <App />
        </LoginContextProvider>
      </AppContextProvider>
    </BrowserRouter>
>>>>>>> 7c4e7ec136a944f94b47af7f009a366ef557c41a
  </React.StrictMode>
);
