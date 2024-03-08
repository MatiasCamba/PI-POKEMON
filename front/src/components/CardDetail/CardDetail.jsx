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
            <h1 >{pokemonDetail?.name}</h1>
            <hr />
            <img src={pokemonDetail?.image} alt={`imagen de ${pokemonDetail?.name}`} />
            <h2>{pokemonDetail?.id}</h2>
            <hr />
            <p><strong>Hp:</strong>:{pokemonDetail?.hp}</p>
            <p><strong>Attack</strong>:{pokemonDetail?.attack}</p>
            <p><strong>Defense</strong>:{pokemonDetail?.defense}</p>
            <p><strong>Speed</strong>:{pokemonDetail?.speed}</p>
            <p><strong>Height</strong>:{pokemonDetail?.height}</p>
            <p><strong>Weight</strong>:{pokemonDetail?.weight}</p>
            <hr />
            {pokemonDetail?.types?.map((typeResponse, index) => (
              <p key={index} className='pokemon-types'> Types: {typeResponse.name}</p>
              
            ))}
            
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>

  )
}

export default CardDetail