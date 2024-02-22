import React from 'react'

const Card = ({pokemon}) => {
  return (
    <div>
   
        <hr />
        <p>{pokemon.name}</p>
         <hr />
      <img src={pokemon.image} alt={`imagen de ${pokemon.name}`}/>
        <hr /> 
     

    </div>
  )
}

export default Card