import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { POKEMONDETAIL } from '../../redux/actions/actions';
import './CardDetail.css'

const CardDetail = () => {
  const pokemonDetail = useSelector((state) => state.pokemonDetail)
  const dispatch = useDispatch()
  const { id } = useParams()



  useEffect(() => {
    dispatch(POKEMONDETAIL(id))
  }, [])

  return (
    <>

      {pokemonDetail ? (
        <div className='cardDetail-container'>
          <div className='cardDetail'>
          <h1>{pokemonDetail.name}</h1>
          <hr />
          <img src={pokemonDetail.sprites?.front_default} alt={`imagen de ${pokemonDetail.name}`} />
          <h2>{pokemonDetail.id}</h2>
          <hr />
          {pokemonDetail.stats?.map((statsResponse, index) => (
            <p key={index}><strong>{statsResponse.stat.name}</strong>:{statsResponse.base_stat}</p>
          ))}
          <p><strong>weight:</strong>{pokemonDetail.weight}</p>
          <p><strong>height:</strong>{pokemonDetail.height}</p>
          <hr />
          {pokemonDetail.types?.map((typeResponse) => (
            <p className='pokemon-types'>Types: {typeResponse.type.name}</p>

          ))}
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </>

  )
}

export default CardDetail