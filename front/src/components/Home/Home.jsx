import React from 'react'
import CardContainer from '../CardContainer/CardContainer'
import SearchBar from '../SearchBar/SearchBar'
import SearchContainer from '../SearchContainer/SearchContainer'
import { useDispatch, useSelector } from 'react-redux'
import { POKEMONTYPES } from '../../redux/actions/actions'
import { useEffect } from 'react'


const Home = () => {
const pokemonsBySearch =  useSelector((state)=> state.pokemonsBySearch )
const dispatch = useDispatch()



useEffect(()=>{
  dispatch(POKEMONTYPES())
},[])

  return (
    <>
    <SearchBar /> 
    <hr />

   {pokemonsBySearch.length > 0  ?  <SearchContainer /> :  <CardContainer />  } 
    
   
  </>
  )
}

export default Home