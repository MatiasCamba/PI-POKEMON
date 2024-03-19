import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CREATEPOKEMON, POKEMONTYPES } from '../../redux/actions/actions'
import { nameValidation, imageValidation, statsValidation, typeValidation } from './Validations'
import './Form.css'

const Form = () => {

  const dispatch = useDispatch();
  const pokemonsTypes = useSelector((state) => state.pokemonsTypes);

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
  const [error, setError] = useState({
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
  useEffect(() => {

    dispatch(POKEMONTYPES())

  }, []);

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

    let errorMessage = '';
    if (name === 'name') {
      errorMessage = nameValidation(value) ? '' : 'Error on name field';
    } else if (name === 'image') {
      errorMessage = imageValidation(value) ? '' : 'Error on image field (must be an URL)';
    } else if (['hp', 'attack', 'defense', 'speed', 'height', 'weight'].includes(name)) {
      errorMessage = statsValidation(value) ? '' : `Error on ${name} field`;
    }

    setError((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    /*  if (!nameValidation(formData.name)) {
     setError({ ...error, name: 'Error on name field' })
      return
    } 
 
     if (!imageValidation(formData.image)) {
       alert('Error on image field')
       return
     }
 
     if (!statsValidation(formData.hp) || !statsValidation(formData.attack) || !statsValidation(formData.defense) || !statsValidation(formData.speed) || !statsValidation(formData.height)||!statsValidation(formData.weight)) {
       alert('Error on stats field (HP,ATTACK, SPEED, HEIGHT OR WEIGHT)')
       return
     } */
    if (!typeValidation(formData.types)) {
      alert('You must select at least one pokemon type!')
      return
    }

    dispatch(CREATEPOKEMON(formData))

  }


  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <h1> <strong>Create your own Pokemon!</strong></h1>

        <label htmlFor="name">Name:</label>
        <input type="text" id='name' name='name' onChange={handleInputChange} value={formData.name} />
        <span className='error-message'>{error.name}</span>
        <br />

        <label htmlFor="image">Image:</label>
        <input type="text" id='image' name='image' onChange={handleInputChange} value={formData.image} />
        <span className='error-message'>{error.image}</span>
        <br />

        <label htmlFor="hp">Hp:</label>
        <input type="text" id='hp' name='hp' onChange={handleInputChange} value={formData.hp} />
        <span className='error-message'>{error.hp}</span>
        <br />

        <label htmlFor="attack">Attack:</label>
        <input type="text" id='attack' name='attack' onChange={handleInputChange} value={formData.attack} />
        <span className='error-message'>{error.attack}</span>
        <br />

        <label htmlFor="defense">Defense:</label>
        <input type="text" id='defense' name='defense' onChange={handleInputChange} value={formData.defense} />
        <span className='error-message'>{error.defense}</span>
        <br />

        <label htmlFor="speed">Speed:</label>
        <input type="text" id='speed' name='speed' onChange={handleInputChange} value={formData.speed} />
        <span className='error-message'>{error.speed}</span>
        <br />

        <label htmlFor="height">Height</label>
        <input type="text" id='height' name='height' onChange={handleInputChange} value={formData.height} />
        <span className='error-message'>{error.height}</span>
        <br />

        <label htmlFor="weight">Weight:</label>
        <input type="text" id='weight' name='weight' onChange={handleInputChange} value={formData.weight} />
        <span className='error-message'>{error.weight}</span>
        <br />
        <hr />
        <label>Types:</label>
        {

          pokemonsTypes?.map((type) => (
            <div className='div-types' key={type?.name}>
              <label htmlFor={type?.name}></label>
              <input type='checkbox' name={type?.name} onChange={handleTypes} value={type?.name} /> {type?.name}
              <span className='error-message'>{error.types}</span>
            </div>
          ))
        }

        <hr />
        <button type='submit'>Create Pokemon</button>
      </form>
    </div>
  )
}

export default Form
