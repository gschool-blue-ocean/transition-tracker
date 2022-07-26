import './StyleSheets/App.css';
import { useState, useContext, useEffect } from 'react';
import { Routes, Route } from "react-router-dom"
import Loading from './Components/LoadingDisplay/Loading'
import LandingPage from './Components/Landing/LandingPage'
import AdminHomePage from './Components/AdminHomePage/AdminHomePage'
import CreateAccountModal from './Components/Landing/CreateAccountModal';
import LoginContext from './Context/LoginContext';
import AppContext from './Context/AppContext';
import StudentPage from './Components/StudentPage/StudentPage'
import "./StyleSheets/Header.css"

function App() {
  const { login, userData, invokeSetLogin } = useContext(LoginContext)
  const { allUsersData, allCohortsData, invokeSetAllUsersData, invokeSetAllCohortsData, loading, setLoading } = useContext(AppContext)

  useEffect(() => {
    fetchAllCohortData()
    fetchAllUserData()
  }, [])

  const fetchAllUserData = () => {
    fetch('https://hacking-transition.herokuapp.com/api/users')
      .then(res => res.json())
      .then(data => invokeSetAllUsersData(data))
      .then(() => setLoading(false))
      .catch(err => console.log(err))
  }

  const fetchAllCohortData = () => {
    fetch('https://hacking-transition.herokuapp.com/api/cohorts')
      .then(res => res.json())
      .then(data => invokeSetAllCohortsData(data))
      .catch(err => console.log(err))
  }


  return (
    <div className="AppContainer">
      {loading ? <Loading /> : null}
      <Routes>
        <Route path="/" element={login ? <AdminHomePage /> : <LandingPage invokeSetLogin={invokeSetLogin} />} />
        <Route path="/createAccount" element={<CreateAccountModal />} />
      </Routes>
    </div>
  );
}

export default App;
