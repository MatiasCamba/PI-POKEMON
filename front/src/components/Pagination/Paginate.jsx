import React from 'react'
import { useState } from 'react';
import './Paginate.css'

const Paginate = ({ pokemonsPerPage, allPokemons, changePage }) => {

  const [currentPage, setCurrentPage] = useState(1)

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i)
  }

  const handlePrevClick = () => {
    const newPage = Math.max(currentPage - 1, 1)
    setCurrentPage(newPage)
    changePage(newPage)
  }

  const handleNextClick = () => {
    const newPage = Math.min(currentPage + 1, pageNumbers.length)
    setCurrentPage(newPage);
    changePage(newPage)
  }

  return (
    <div className='page-container'>
      <button className='page-link-button' onClick={handlePrevClick}>
        Anterior
      </button>
      {pageNumbers?.map(number => (
        <p key={number}>
          <a className='page-link' onClick={() => changePage(number)}>{number} </a>
        </p>
      ))}
      <button className='page-link-button' onClick={handleNextClick} >
        Siguiente
      </button>
    </div>
  )
}

export default Paginate