import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { FILTERPOKEMONORDER } from '../../redux/actions/actions'
import { FILTERPOKEMONORIGIN } from '../../redux/actions/actions'
import { FILTERPOKEMONTYPE } from '../../redux/actions/actions'
import { FILTERPOKEMONBYATTACK } from '../../redux/actions/actions'
import { useState } from 'react'
import './FilterOptions.css'

const FilterOptions = () => {
    const dispatch = useDispatch();
    const types = useSelector((state)=> state.pokemonsTypes)
   


    const handleFilterAttack = (e) => {

      const {value} = e.target
      dispatch(FILTERPOKEMONBYATTACK(value))
    

    }


    const handleFilterOrigin = (e) => {
      
      
      const {value} = e.target
      dispatch(FILTERPOKEMONORIGIN(value))
     

    }


    const handleFilterOrder = (e) => {
        const {value} = e.target
        dispatch(FILTERPOKEMONORDER(value));
       
    }

    const handleFilterType = (e)=> {
      const {value} = e.target
      const originValue = document.getElementById('filterOrigin').value;
      
      dispatch(FILTERPOKEMONTYPE(value,originValue))
      
   
    }



  return (
    <div className='filterContainer'> 
        <label htmlFor="filters">Order By:</label>
        <select name="filterOrder" id="filterOrder"  onChange={handleFilterOrder}>

            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
            
        </select>
        <select name="filterByAttack" id="filterByAttack" onChange={handleFilterAttack}>
          <option value="attack+">Attack(ascending)</option>
          <option value="attack-">Attack(descending)</option>
        </select>
        <select name="filterOrigin" id="filterOrigin" onChange={handleFilterOrigin}>

          <option value="ALL">ALL</option>
          <option value="DB">DB</option>
          <option value="API">API</option>

        </select>
        <select name="filterType" id="filterType" onChange={handleFilterType}>

        {types?.map((type)=>(

            <option value={type?.name}>{type?.name}</option>
        ))} 

      </select>

          

    </div>
  )
}

export default FilterOptions