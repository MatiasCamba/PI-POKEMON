import React from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

const SearchCard = ({ pokemonSearchBarApi, pokemonSearchBarDb }) => {


  return (
    <div className='card-container'>
      <div className='card-logo'>

        <img src={pokemonSearchBarApi?.image ||pokemonSearchBarDb?.image } alt={`imagen de ${pokemonSearchBarApi?.name || pokemonSearchBarDb?.name}`} />
      </div>
      <div className='card-content'>
        <Link to={`/detail/${pokemonSearchBarApi?.id || pokemonSearchBarDb?.id}`}>
          <h2>{pokemonSearchBarApi?.name || pokemonSearchBarDb?.name}</h2>
        </Link>
        {pokemonSearchBarApi&&<h3>API</h3> || pokemonSearchBarDb&&<h3>DB</h3>}
      </div>
          




    </div>
  )
}

export default SearchCard