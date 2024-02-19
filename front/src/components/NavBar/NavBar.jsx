import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


const NavBar = () => {
    const location = useLocation();
    const isLanding = location.pathname === '/';
    return (

        <nav>
            {isLanding ? null : <ul>
                <li><Link to='/Home'>Home</Link></li>
                <li><Link to='/Form'>Form</Link></li>
            </ul>}

        </nav>
    )
}

export default NavBar