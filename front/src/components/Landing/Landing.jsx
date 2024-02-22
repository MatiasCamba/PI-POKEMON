import React from 'react'
import { Link } from 'react-router-dom'


const Landing = () => {
  return (
    <>    
    <div>Soy el landing</div>
    <button>
      <Link to='/Home'>IR AL HOME</Link>
    </button>
    </>

  )
}

export default Landing