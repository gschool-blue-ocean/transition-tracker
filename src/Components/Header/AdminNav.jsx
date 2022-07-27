import React from 'react'
import { Link } from 'react-router-dom'

function AdminNav() {
    return (
        <div className='navbarContainer'>
            <ul className='navbarUL'>
                <li><Link className='navLink' to="/" >Home</Link></li>
                <li><Link className='navLink' to="/archive" >Archive</Link></li>
                <li><Link className='navLink' to="/settings" >Settings</Link></li>
                <li><Link className='navLink' to="/" >Home</Link></li>
            </ul>
        </div>
    )
}

export default AdminNav