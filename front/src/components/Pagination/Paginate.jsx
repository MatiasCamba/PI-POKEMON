import React from 'react'
import './Paginate.css'

const Paginate = ({ pokemonsPerPage, allPokemons, changePage }) => {



  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i)
  }


  return (
    <div className='page-container'>

      {pageNumbers?.map(number => (
        <p key={number}>
          <a className='page-link' onClick={() => changePage(number)}>{number} </a>
        </p>
      ))}

    </div>
  )
}

export default Paginate