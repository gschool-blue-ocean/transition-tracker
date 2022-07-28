import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LoginContext from '../../Context/LoginContext'

function AdminNav() {

    const { login, setUserData, invokeSetLogin } = useContext(LoginContext)

    useEffect(() => {
        document.querySelectorAll('.navLink').forEach(elem => elem.classList.remove('activeTab'))
        document.getElementById(window.location.pathname).classList.add('activeTab')
    }, [])


    const handleClick = (e) => {
        document.querySelectorAll('.navLink').forEach(elem => elem.classList.remove('activeTab'))
        e.target.classList.add('activeTab')
    }

    const handleLogout = () => {
        localStorage.clear()
        setUserData(null)
        invokeSetLogin(false)
    }
    return (
        <div className='navbarContainer'>
            <ul className='navbarUL'>
                <li><Link id='/' onClick={handleClick} className='navLink' to="/" >Home</Link></li>
                <li><Link id='/archive' onClick={handleClick} className='navLink' to="/archive" >Archive</Link></li>
                <li><Link id='/settings' onClick={handleClick} className='navLink' to="/settings" >Settings</Link></li>
                <li><Link id='logoutBtn' onClick={handleLogout} className='navLink' to="/" >Log Out</Link></li>
            </ul>
        </div>
    )
}

export default AdminNav