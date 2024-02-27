import React from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'


const Landing = () => {
  return (
    <div className='landing-container'>    
    <button className='landing-button'>
      <Link to='/Home'>IR AL HOME</Link>
    </button>
    </div>

  )
}

export default Landing