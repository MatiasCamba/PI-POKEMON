import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../Card/Card';
import { GETPOKEMONS } from '../../redux/actions/actions';
import Paginate from '../Pagination/Paginate'
import React from 'react'


const CardContainer = () => {
    const pokemons = useSelector((state) => state.pokemons);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GETPOKEMONS())
    }, []);

    const [pokemonsPerPage] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const allPokemons = pokemons?.pokemonData?.concat(pokemons.dbData);



    const lastPokemonIndex = currentPage * pokemonsPerPage;
    const firstPokemonIndex = (currentPage - 1) * pokemonsPerPage;
    const currentPokemons = allPokemons?.slice(firstPokemonIndex, lastPokemonIndex);


    const changePage = (number) => setCurrentPage(number)


    return (
        <>
            <div className='card-container'>
                {currentPokemons?.map((pokemons) => {
                    if (pokemons.origin === 'API') {
                        return <Card key={pokemons?.name} pokemonApi={pokemons} />;
                    } else if (pokemons.origin === 'DB') {
                        return <Card key={pokemons?.name} pokemonDb={pokemons} />;
                    }
                    return null;
                })}
            </div>
            <div className='paginate-container'>
                <Paginate pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons?.length} changePage={changePage} />
            </div>
        </>


    )
}


export default CardContainer