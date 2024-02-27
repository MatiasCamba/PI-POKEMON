import React from 'react'
import './Card.css'
import {Link} from 'react-router-dom'

const Card = ({ pokemon }) => {

  return (
    <div className='card-container'>
      <div className='card-logo'>

      <img src={pokemon?.image} alt={`imagen de ${pokemon.name}`} />
      </div>
      <div className='card-content'>
      <Link to={`/detail/${pokemon?.id}`}>
      <h2>{pokemon?.name}</h2>
      </Link>

     
      </div>
   
   



    </div>
  )
}


export default Card