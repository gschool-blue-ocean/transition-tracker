import './StyleSheets/App.css';
import { useState, useContext } from 'react';
import { Routes, Route } from "react-router-dom"
import Loading from './Components/LoadingDisplay/Loading'
import LandingPage from './Components/Landing/LandingPage'
import HomePage from './Components/HomePage/HomePage'
import LoginContext from './Context/LoginContext';
import AppContext from './Context/AppContext';

function App() {
  const { login, userData, changeSetLogin, loading } = useContext(LoginContext)
  // const {allUserData, allCohortsData, invokeSetAllCohortsData, }


  if (!login) {
    if (loading) {
      return (<Loading />)
    }
    return <LandingPage changeSetLogin={changeSetLogin} />
  }

  return (

    <div className="AppContainer">
      {/* {login ? <h1> Blue Ocean! </h1> : <LoginPage />} */}
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>

    </div>
  );
}

export default App;
