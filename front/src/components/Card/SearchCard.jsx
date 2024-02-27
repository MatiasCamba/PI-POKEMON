import React from 'react'
import './Card.css'

const SearchCard = ({ pokemonSearchBar }) => {
  console.log("mi searchCard:", pokemonSearchBar)
  return (
    <div className='card-container'>
    <div className='card-logo'>

    <img src={pokemonSearchBar?.image} alt={`imagen de ${pokemonSearchBar.name}`} />
    </div>
    <div className='card-content'>

    <h2>{pokemonSearchBar?.name}</h2>
    </div>
 
 



  </div>
  )
}

export default SearchCard