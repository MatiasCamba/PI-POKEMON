import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
    const location = useLocation();
    const isLanding = location.pathname === '/';
    return (

        <nav className='navBar-container'>
            {isLanding ? null : <ul>
                <li><Link to='/Home'>Home</Link></li>
                <li><Link to='/add'>Create Pokemon</Link></li>
                <li><Link to='/About'>About</Link></li>
            </ul>}

        </nav>
    )
}

export default NavBar