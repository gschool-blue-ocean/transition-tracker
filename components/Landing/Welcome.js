//the functionality behind the login that determins what page to load if admin or if student

import React, { useContext, useEffect, useState } from 'react'
import AdminHomePage from '../Admin'
import StudentPage from '../Student'
import LoginContext from '../../context/LoginContext'

// socket I beleive is "Socket.IO " a library that enables low-latency, bidirectional and event-based communication between a client and a server. It looks like the socket is used at the end of the function in the return statement to display up to two different pages, one admin, one student.

function Welcome({ socket, isOnArchivePage }) {

    // the values userData, setUserData, and invokeSetLogin are all read in the format of the loginContext
    // checkout this page for more details on what the LoginContext looks like
    // transition-tracker\context\LoginContext.js

    const { userData, setUserData, invokeSetLogin } = useContext(LoginContext)

    // the state and we are starting with an empty object
    const [activeStudent, setActiveStudent] = useState({})

    // the start of the meat and potatos, useEffect to update the document object model, userData is the dependecy for useEffect and the function is an arrow function. The arrow function first checks if the userData object key value for admin is not true and sets the state object to hold the userData.
    useEffect(() => {
        if (!userData.admin) {
            setActiveStudent(userData)

    // what even is this
            const testGrid =
    typeof document !== "undefined" && document.querySelector('.test-grid')
            
    testGrid.classList.add('studentview')
        }
    }, [userData])

    /* the JSON.parse will return the value of admin as a string that acts as a boolean. 
    (example localStorage = 
        {
            currentUser: 
            {
                admin: true
            }
        }
    */

        //it looks like in this case the || operator also acts as an "and" operator 

        //the ternary statment checks the value of userdata.admin and returns one of two JSX elements, Admin or Student
    return (
        <>
            {JSON.parse(localStorage.currentUser).admin || userData.admin ? <AdminHomePage isOnArchivePage={isOnArchivePage} socket={socket} /> : <StudentPage activeStudent={activeStudent} setActiveStudent={setActiveStudent} socket={socket} userData={userData} setUserData={setUserData} invokeSetLogin={invokeSetLogin} />}
        </>
    )
}

export default Welcome