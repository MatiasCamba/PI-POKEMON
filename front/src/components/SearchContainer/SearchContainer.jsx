import React from 'react'
import { useSelector } from 'react-redux'
import SearchCard from '../Card/SearchCard'

const SearchContainer = () => {
    const pokemonsBySearch = useSelector((state) => state.pokemonsBySearch)


 
    return (
        <div className='card-container'>

            {pokemonsBySearch?.map((pokemon, index) => {
                if (pokemon?.origin === 'API') {

                    return <SearchCard key={index} pokemonSearchBarApi={pokemon} />;
                } else if (pokemon?.origin === 'DB') {

                    return <SearchCard key={index} pokemonSearchBarDb={pokemon} />;
                }
                return null;


            })}
    
        </div>
    )
}

export default SearchContainer