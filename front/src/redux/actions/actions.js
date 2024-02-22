export const GET_POKEMONS = 'GETPOKEMONS';
import axios from 'axios';

export const GETPOKEMONS =  () => async (dispatch) => {
   
        const apiResponse = await axios.get('https://pokeapi.co/api/v2/pokemon')
        const pokemonsData = apiResponse.data.results  //TRAE DATA CON NAME Y URL
      
        //map a pokemonsData (name , url) , por cada pokemon , ingresar a .url <= axios.get   
        const allUrlData = pokemonsData.map((pokemons)=> axios.get(pokemons.url)); // TRAE TODA LA DATA ADENTRO DE URL 
        console.log('aca hago el map de url :' , allUrlData)

        const allUrlDataResponse = await Promise.all(allUrlData); //TAMBIEN PUEDO USAR PROMISE.ALL QUE EQUIVALE AXIOS.ALL
        console.log('aca hago el axios.all: ' , allUrlDataResponse) //trae tanto url como results

        const allPokemonData = allUrlDataResponse.map((responseData)=>({  // asigno valores a las propiedas
                name: responseData.data.name,
                image: responseData.data.sprites.front_default,
        }))
        
        
        dispatch({
            type: GET_POKEMONS,
            payload: allPokemonData,
        })
 
}

