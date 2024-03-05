import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../Card/Card';
import { GETPOKEMONS } from '../../redux/actions/actions';

import React from 'react'


const CardContainer = () => {
    const dispatch = useDispatch();
    const pokemons = useSelector((state) => state.pokemons);
    

    useEffect(()=>{
        dispatch(GETPOKEMONS())
    },[]);

    return (
        <div className='card-container'>
            {pokemons.pokemonData?.map((pokemon) => {
                return <Card 
                key={pokemon?.name} 
                pokemonApi={pokemon} />
            })}
            {pokemons.dbData?.map((pokemon)=>{
                return <Card 
                key={pokemon?.name}
                pokemonDb={pokemon}
                />
            })}
        </div>
    )
}


export default CardContainer