import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { FILTERPOKEMONORDER } from '../../redux/actions/actions'
import { FILTERPOKEMONORIGIN } from '../../redux/actions/actions'
import { useState } from 'react'
import './FilterOptions.css'

const FilterOptions = () => {
    const dispatch = useDispatch();
   
    const [filtered , setFiltered] = useState(true);
    
    const handleFilterOrigin = (e) => {

      const {value} = e.target
      dispatch(FILTERPOKEMONORIGIN(value))
      setFiltered(!filtered)

    }
    const handleFilterOrder = (e) => {
        const {value} = e.target
        dispatch(FILTERPOKEMONORDER(value));
        
        setFiltered(!filtered)
    }
  return (
    <div className='filterContainer'> 
        <label htmlFor="filters">Order By:</label>
        <select name="filterOrder" id="filterOrder"  onChange={handleFilterOrder}>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
        </select>
        <select name="filterOrigin" id="filterOrigin" onChange={handleFilterOrigin}>
          <option value="API">API</option>
          <option value="DB">DB</option>

        </select>
      
    </div>
  )
}

export default FilterOptions