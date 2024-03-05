import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SEARCHPOKEMON } from '../../redux/actions/actions'
import './SearchBar.css'
import FilterOptions from '../Filters/FilterOptions'


const SearchBar = () => {
  const [name, setName] = useState('')
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(SEARCHPOKEMON(name))
  }

  return (
    <div className='searchBar-container'>
      <input className='searchInput' type="text"
        placeholder='Search Pokemon'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>


      <aside>
        <FilterOptions />
      </aside>



    </div>
  )
}

export default SearchBar