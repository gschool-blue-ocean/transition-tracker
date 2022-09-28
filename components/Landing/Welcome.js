import React, { useContext, useEffect, useState } from 'react'
import AdminHomePage from '../Admin'
import StudentPage from '../Student'
import LoginContext from '../../context/LoginContext'

function Welcome({ socket, isOnArchivePage }) {
    const { userData, setUserData, invokeSetLogin } = useContext(LoginContext)

    const [activeStudent, setActiveStudent] = useState({})

    useEffect(() => {
        if (!userData.admin) {
            setActiveStudent(userData)
            const testGrid =
    typeof document !== "undefined" && document.querySelector('.test-grid')
            
    testGrid.classList.add('studentview')
        }
    }, [userData])

    return (
        <>
            {JSON.parse(localStorage.currentUser).admin || userData.admin ? <AdminHomePage isOnArchivePage={isOnArchivePage} socket={socket} /> : <StudentPage activeStudent={activeStudent} setActiveStudent={setActiveStudent} socket={socket} userData={userData} setUserData={setUserData} invokeSetLogin={invokeSetLogin} />}
        </>
    )
}

export default Welcome