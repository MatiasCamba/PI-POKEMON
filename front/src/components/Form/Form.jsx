import React from 'react'
import { useState , useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { CREATEPOKEMON, POKEMONTYPES } from '../../redux/actions/actions'
import { nameValidation, imageValidation, statsValidation, typeValidation } from './Validations'
import './Form.css'

const Form = () => {

  const dispatch = useDispatch();
  const pokemonsTypes = useSelector((state)=> state.pokemonsTypes);

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
useEffect(()=>{

  dispatch(POKEMONTYPES())

},[]);

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

    if (!statsValidation(formData.hp) || !statsValidation(formData.attack) || !statsValidation(formData.defense) || !statsValidation(formData.speed) || !statsValidation(formData.height)||!statsValidation(formData.weight)) {
      alert('Error on stats field (HP,ATTACK, SPEED, HEIGHT OR WEIGHT)')
      return
    }
    if(!typeValidation(formData.types)){
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
        <hr />
        <label>Types:</label>
        {

          pokemonsTypes?.map((type)=>(
            <div className='div-types' key={type?.name}>
              <label htmlFor={type?.name}></label>
               <input type='checkbox' name={type?.name} onChange={handleTypes} value={type?.name}/> {type?.name}
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
