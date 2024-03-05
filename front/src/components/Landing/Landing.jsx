import React from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'


const Landing = () => {
  return (
    <div className='landing-container'>    
    <div className='pokeball'>
    <button className='landing-button'>
      <Link to='/Home' >HOME</Link>
    </button>
    </div>
    </div>

  )
}

export default Landing