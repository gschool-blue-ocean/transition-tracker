import './StyleSheets/App.css';
import { useState, useContext, useEffect } from 'react';
import { Routes, Route } from "react-router-dom"
import Loading from './Components/LoadingDisplay/Loading'
import LandingPage from './Components/Landing/LandingPage'
import AdminHomePage from './Components/AdminHomePage/AdminHomePage'
import LoginContext from './Context/LoginContext';
import AppContext from './Context/AppContext';
import "./StyleSheets/Header.css"
import StudentPage from './Components/StudentPage/StudentPage';

function App() {
  const { login, userData, changeSetLogin, loading } = useContext(LoginContext)
  const { allUsersData, allCohortsData, invokeSetAllUsersData, invokeSetAllCohortsData } = useContext(AppContext)

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
      <StudentPage />
      <Routes>
        <Route path="/" element={<AdminHomePage />} />
      </Routes>


    </div>
  );
}

export default App;
