import React from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

const SearchCard = ({ pokemonSearchBar }) => {
  console.log("mi searchCard:", pokemonSearchBar)
  return (
    <div className='card-container'>
      <div className='card-logo'>

        <img src={pokemonSearchBar?.image} alt={`imagen de ${pokemonSearchBar.name}`} />
      </div>
      <div className='card-content'>
        <Link to={`/detail/${pokemonSearchBar?.id}`}>
          <h2>{pokemonSearchBar?.name}</h2>
        </Link>
      </div>





    </div>
  )
}

export default SearchCard