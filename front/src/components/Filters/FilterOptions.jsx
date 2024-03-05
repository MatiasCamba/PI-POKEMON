import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { FILTERPOKEMONORDER } from '../../redux/actions/actions'
import { useState } from 'react'
import './FilterOptions.css'

const FilterOptions = () => {
    const dispatch = useDispatch();
   
    const [filtered , setFiltered] = useState(true);
    

    const handleFilterOrder = (e) => {
        const {value} = e.target
        dispatch(FILTERPOKEMONORDER(value));
        
        setFiltered(!filtered)
    }
  return (
    <div className='filterContainer'> 
        <label htmlFor="filterOrder">Order By:</label>
        <select name="filterOrder" id="filterOrder"  onChange={handleFilterOrder}>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
        </select>
      
    </div>
  )
}

export default FilterOptions