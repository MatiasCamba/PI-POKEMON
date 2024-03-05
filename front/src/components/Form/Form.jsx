import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CREATEPOKEMON } from '../../redux/actions/actions'
import { nameValidation, imageValidation, statsValidation, typeValidation } from './Validations'
import './Form.css'

const Form = () => {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    types: [],
  })

  const handleTypes = (e) => {

    const { name, checked } = e.target;

    if (checked) {
      setFormData((prev) => ({
        ...prev,
        types: [...prev.types, name]
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        types: prev.types.filter((type) => type !== name),
      }))
    }

  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nameValidation(formData.name)) {
      alert('Error on name field')
      return
    }

    if (!imageValidation(formData.image)) {
      alert('Error on image field')
      return
    }

    if (!statsValidation(formData.hp) || !statsValidation(formData.attack) || !statsValidation(formData.defense)) {
      alert('Error on stats field (HP,ATTACK OR DEFENSE)')
      return
    }
    if(!typeValidation(formData.types)){
      alert('You must select a correct pokemon type!')
    }

    dispatch(CREATEPOKEMON(formData))
    console.log('me llega form data:', formData)
  }


  return (
    <>
      <h1> <strong>Crea tu Pokemon!</strong></h1>
      <form onSubmit={handleSubmit}>

        <label htmlFor="name">Name:</label>
        <input type="text" id='name' name='name' onChange={handleInputChange} value={formData.name} /> <br />

        <label htmlFor="image">Image:</label>
        <input type="text" id='image' name='image' onChange={handleInputChange} value={formData.image} /> <br />

        <label htmlFor="hp">Hp:</label>
        <input type="text" id='hp' name='hp' onChange={handleInputChange} value={formData.hp} /> <br />

        <label htmlFor="attack">Attack:</label>
        <input type="text" id='attack' name='attack' onChange={handleInputChange} value={formData.attack} /> <br />

        <label htmlFor="defense">Defense:</label>
        <input type="text" id='defense' name='defense' onChange={handleInputChange} value={formData.defense} /> <br />

        <label htmlFor="speed">Speed:</label>
        <input type="text" id='speed' name='speed' onChange={handleInputChange} value={formData.speed} /> <br />

        <label htmlFor="height">Height</label>
        <input type="text" id='height' name='height' onChange={handleInputChange} value={formData.height} /> <br />

        <label htmlFor="weight">Weight:</label>
        <input type="text" id='weight' name='weight' onChange={handleInputChange} value={formData.weight} /> <br />

        <label>Types:</label>
        <input type="checkbox" name='fire' onChange={handleTypes} />Fire
        <input type="checkbox" name='water' onChange={handleTypes} />Water
        <input type="checkbox" name='grass' onChange={handleTypes} />Grass
        <input type="checkbox" name='poison' onChange={handleTypes} />Poison
        <input type="checkbox" name='fighting' onChange={handleTypes} />Fighting

        <hr />
        <button type='submit'>Create Pokemon</button>
      </form>
    </>
  )
}

export default Form
