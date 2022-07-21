import './StyleSheets/App.css';
import { useState, useContext, useEffect } from 'react';
import { Routes, Route } from "react-router-dom"
import Loading from './Components/LoadingDisplay/Loading'
import LandingPage from './Components/Landing/LandingPage'
import HomePage from './Components/HomePage/HomePage'
import LoginContext from './Context/LoginContext';
import AppContext from './Context/AppContext';
import "./StyleSheets/Header.css"

function App() {
  const { login, userData, changeSetLogin, loading } = useContext(LoginContext)
  const { allUserData, allCohortsData, invokeSetAllUsersData, invokeSetAllCohortsData } = useContext(AppContext)

  useEffect(() => {
    fetchAllUserData()
    fetchAllCohortData()
  }, [])

  const fetchAllUserData = () => {
    fetch('https://hacking-transition.herokuapp.com/api/users')
      .then(res => res.json())
      .then(data => invokeSetAllUsersData(data))
      .catch(err => console.log(err))
  }
  const fetchAllCohortData = () => {
    fetch('https://hacking-transition.herokuapp.com/api/cohorts')
      .then(res => res.json())
      .then(data => invokeSetAllCohortsData(data))
      .catch(err => console.log(err))
  }

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
