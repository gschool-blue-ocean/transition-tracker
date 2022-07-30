import React, { useContext } from 'react'
import AdminHomePage from '../AdminHomePage/AdminHomePage'
import StudentPage from '../StudentPage/StudentPage'
import LoginContext from '../../Context/LoginContext'

function Welcome({ socket }) {
    const { userData, setUserData, invokeSetLogin } = useContext(LoginContext)

    return (
        <>
            {userData.admin ? <AdminHomePage socket={socket} /> : <StudentPage socket={socket} userData={userData} setUserData={setUserData} invokeSetLogin={invokeSetLogin} />}
        </>
    )
}

export default Welcome