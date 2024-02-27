export const GET_POKEMONS = 'GETPOKEMONS';
export const SEARCH_POKEMON = 'SEARCHPOKEMON';
export const POKEMON_DETAIL = 'POKEMONDETAIL';

import axios from 'axios';

export const GETPOKEMONS = () => async (dispatch) => {

        const apiResponse = await axios.get('https://pokeapi.co/api/v2/pokemon')
        const pokemonsData = apiResponse.data.results  //TRAE DATA CON NAME Y URL

        //map a pokemonsData (name , url) , por cada pokemon , ingresar a .url <= axios.get   
        const allUrlData = pokemonsData.map((pokemons) => axios.get(pokemons.url)); // TRAE TODA LA DATA ADENTRO DE URL 
        //console.log('aca hago el map de url :' , allUrlData)

        const allUrlDataResponse = await Promise.all(allUrlData); //TAMBIEN PUEDO USAR PROMISE.ALL QUE EQUIVALE AXIOS.ALL
        //console.log('aca hago el axios.all: ' , allUrlDataResponse) //trae tanto url como results

        const allPokemonData = allUrlDataResponse.map((responseData) => ({  // asigno valores a las propiedas
                name: responseData.data.name,
                image: responseData.data.sprites.front_default,
                id: responseData.data.id
        }))


        dispatch({
                type: GET_POKEMONS,
                payload: allPokemonData,
        })

}

export const SEARCHPOKEMON = (name) => async (dispatch) => {
        try {
                const searchResponse = await axios.get(`http://localhost:3001/name?name=${name}`)

                if (searchResponse && searchResponse.data) {
                        dispatch({
                                type: SEARCH_POKEMON,
                                payload: searchResponse.data
                        })

                }
                console.log("me llega esta respuesta", searchResponse)


        } catch (error) {
                alert('error al buscar!')
        }

}

export const POKEMONDETAIL = (id) => async (dispatch) => {
        try {
                const detailData = await axios.get(`http://localhost:3001/detail/${id}`)
                const detailResponse = detailData.data.apiData
            
                
                
                if (detailResponse) {
                    dispatch({
                                type: POKEMON_DETAIL,
                                payload: detailResponse
                        })
                }
        } catch (error) {
                alert('error al cargar detalle!')
        }
        
        
}
/* 
pokemonDetail.id,
pokemonDetail.name,
pokemonDetail.sprites.front_default,
pokemonDetail.height,
pokemonDetail.weight,
pokemonDetail.stats.map((statsResponse)=>({
        name: statsResponse.stat.name,
        value: statsResponse.base_stat
})),
pokemonDetail.types.map((typeResponse)=>({
        name: typeResponse.type.name
})) 



})) */

//para crear propiedad conviene map  en la action 
// para solo renderizar conviene map en el jsx