import React from 'react'
import CardContainer from '../CardContainer/CardContainer'
import SearchBar from '../SearchBar/SearchBar'
import SearchContainer from '../SearchContainer/SearchContainer'



const Home = () => {

  return (
    <>
    <SearchBar /> 
    <hr />
    <SearchContainer />
    <CardContainer/>  
  </>
  )
}

export default Home