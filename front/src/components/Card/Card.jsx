import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'

const Card = ({ pokemonApi, pokemonDb }) => {
 
 


  return (
    <div className='card-container'>
      <div className='card-logo'>

        <img src={pokemonApi && pokemonApi.image || pokemonDb && pokemonDb.image} alt={`imagen de ${pokemonApi && pokemonApi.name || pokemonDb && pokemonDb.name}`} />
      </div>
      <div className='card-content'>
        <Link to={`/detail/${pokemonApi && pokemonApi.id || pokemonDb && pokemonDb.id}`}>
          <h2>{pokemonApi && pokemonApi.name || pokemonDb && pokemonDb.name}</h2>
        </Link>
        {pokemonApi&&<h3>API</h3> || pokemonDb&&<h3>DB</h3>}
        
      </div>
    </div>
  )
}


export default Card