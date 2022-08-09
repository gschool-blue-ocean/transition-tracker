import { useContext, useEffect } from "react";
import LoginContext from "../../Context/LoginContext";
import { NavLink } from 'react-router-dom'

const Navbar = () => {

    const { userData, setUserData, invokeSetLogin } = useContext(LoginContext)

    const handleLogout = () => {
        localStorage.clear()
        setUserData(null)
        invokeSetLogin(false)
        window.location.reload()
    }

    return (
        <>
            <div className='navbarContainer'>
                <ul className='navbarUL'>
                    <li><NavLink id='/' className='navLink' to="/" >Home</NavLink></li>
                    {/* {JSON.parse(localStorage.currentUser).admin || userData.admin ? <li><NavLink id='/archive' className='navLink' to="/archive" >Archive</NavLink></li> : null} */}
                    {userData && userData.admin ? <li><NavLink id='/archive' className='navLink' to="/archive" >Archive</NavLink></li> : null}
                    <li><NavLink id='/settings' className='navLink' to="/settings" >Settings</NavLink></li>

                </ul>
            </div>

            <div className="logoutDivNav">
                <NavLink id='logoutBtn' onClick={handleLogout} className='logoutBtn' to="/" >Log Out</NavLink>
                {userData !== null && <span id="loginInfoDisplay" >{userData.first} {userData.last[0]}. @{userData.admin ? 'Admin' : 'Student'}</span>}

            </div>
        </>
    )

}

export default Navbar;

// 