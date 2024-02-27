import React from 'react'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import { SEARCHPOKEMON } from '../../redux/actions/actions'
import './SearchBar.css'


const SearchBar = () => {
    const [name, setName] = useState('')
    const dispatch = useDispatch();

    const handleSearch = () => {
        dispatch(SEARCHPOKEMON(name))
    }

  return (
    <div className='searchBar-container'>
        <input type="text" 
                placeholder='Buscar Pokemon'
                value={name}
                onChange={(e)=> setName(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>


      {/*   {pokemon.dbResponse?.map((objeto)=>{
          return <Card key={objeto} name={objeto}/>
        })} */}

        
       
    </div>
  )
}

export default SearchBar