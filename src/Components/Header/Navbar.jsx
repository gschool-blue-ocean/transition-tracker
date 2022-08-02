import { useContext } from "react";
import LoginContext from "../../Context/LoginContext";
import { NavLink } from 'react-router-dom'
import Loading from "../LoadingDisplay/Loading";

const Navbar = () => {

    const { userData, setUserData, invokeSetLogin } = useContext(LoginContext)


    const handleLogout = () => {
        localStorage.clear()
        setUserData(null)
        invokeSetLogin(false)
    }

    return (
        <div className='navbarContainer'>
            <ul className='navbarUL'>
                <li><NavLink id='/' className='navLink' to="/" >Home</NavLink></li>
                {userData && userData.admin ? <li><NavLink id='/archive' className='navLink' to="/archive" >Archive</NavLink></li> : null}
                <li><NavLink id='/settings' className='navLink' to="/settings" >Settings</NavLink></li>
                <li>
                    <NavLink id='logoutBtn' onClick={handleLogout} className='logoutBtn' to="/" >Log Out</NavLink>
                </li>
            </ul>
        </div>
    )

}

export default Navbar;