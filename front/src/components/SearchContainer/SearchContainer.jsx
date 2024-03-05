import React from 'react'
import { useSelector } from 'react-redux'
import SearchCard from '../Card/SearchCard'

const SearchContainer = () => {
    const pokemon = useSelector((state) => state.pokemonsBySearch)

    return (

        <div className='card-container'>

            {pokemon?.map((pokemon, index) => {
               

                return <SearchCard key={index} pokemonSearchBar={pokemon.apiData}/>
            })}

        </div>
    )
}

export default SearchContainer