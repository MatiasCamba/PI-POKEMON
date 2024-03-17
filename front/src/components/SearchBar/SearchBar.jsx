import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SEARCHPOKEMON } from '../../redux/actions/actions'
import './SearchBar.css'
import FilterOptions from '../Filters/FilterOptions'
import { REFRESHPOKEMON } from '../../redux/actions/actions'


const SearchBar = () => {
  const [name, setName] = useState('')
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(SEARCHPOKEMON(name))
  }

  const refresh = () => {

    dispatch(REFRESHPOKEMON())
  }
  return (
    <div className='searchBar-container'>
      <input className='searchInput' type="text"
        placeholder='Search Pokemon'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <button onClick={refresh}>Refresh</button>
      <aside>
        <FilterOptions />
      </aside>



    </div>
  )
}

export default SearchBar