import React from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

const SearchCard = ({ pokemonSearchBar }) => {


  return (
    <div className='card-container'>
      <div className='card-logo'>

        <img src={pokemonSearchBar?.image} alt={`imagen de ${pokemonSearchBar.name}`} />
      </div>
      <div className='card-content'>
        <Link to={`/detail/${pokemonSearchBar?.id}`}>
          <h2>{pokemonSearchBar?.name}</h2>
        </Link>
       {/*    {dbResponse && (
          <Link to={`/detail/${dbResponse?.id}`}>
            <h2>{dbResponse?.name}</h2>
          </Link>)} */}
      </div>
          




    </div>
  )
}

export default SearchCard