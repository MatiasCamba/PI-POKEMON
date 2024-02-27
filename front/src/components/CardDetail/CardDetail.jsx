import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { POKEMONDETAIL } from '../../redux/actions/actions';

const CardDetail = () => {
  const pokemonDetail = useSelector((state) => state.pokemonDetail)
  const dispatch = useDispatch()
  const { id } = useParams()



  useEffect(() => {
    dispatch(POKEMONDETAIL(id))
  }, [])

  return (
    <>
      <h1>{pokemonDetail.name}</h1>
      <h2>{pokemonDetail.id}</h2>
      {pokemonDetail.stats?.map((statsResponse, index) => (

        <p key={index}>{statsResponse.stat.name}:{statsResponse.base_stat}</p>



      ))}
      {/*    {pokemonDetail ? (
        <div>
          <h1>{pokemonDetail.name}</h1>
        </div>
      ) : (
        <p>Cargando...</p>
      )} */}
    </>

  )
}

export default CardDetail