export const GET_POKEMONS = 'GETPOKEMONS';
export const SEARCH_POKEMON = 'SEARCHPOKEMON';
export const POKEMON_DETAIL = 'POKEMONDETAIL';
export const CREATE_POKEMON = 'CREATEPOKEMON';
export const FILTER_POKEMON_ORDER = 'FILTERPOKEMONORDER'

import axios, { all } from 'axios';

export const GETPOKEMONS = () => async (dispatch) => {



        const apiResponse = await axios.get('http://localhost:3001/home')
        const pokemonsData = apiResponse.data.pokemonData;
        const dataDb = apiResponse.data.dbData;


        const allUrlData = pokemonsData.map((pokemons) => (pokemons.url));

        let allUrlDataResponse = [];
        await Promise.all(allUrlData.map(async (url) => {
                try {
                        const { data } = await axios.get(url)

                        allUrlDataResponse.push(data)

                } catch (error) {
                        throw new Error('No fue posible realizar la petición')
                }
        }));
        let urlData = [];
        allUrlDataResponse.map((pokemon) => urlData.push(
                {
                        name: pokemon.name,
                        image: pokemon.sprites.front_default,
                        id: pokemon.id,
                }
        ))



        dispatch({
                type: GET_POKEMONS,
                payload: { pokemonData: urlData, dbData: dataDb }
        })

}

export const SEARCHPOKEMON = (name) => async (dispatch) => {
        try {
                const searchResponse = await axios.get(`http://localhost:3001/name?name=${name}`)

                if (searchResponse && searchResponse.data) {
                        dispatch({
                                type: SEARCH_POKEMON,
                                payload:
                                        searchResponse.data,
                                // dbResponse: searchResponse.data.dbResponse
                        })

                }
                // console.log("me llega esta respuesta", searchResponse)


        } catch (error) {
                alert('error on search!')
        }

}

export const POKEMONDETAIL = (id) => async (dispatch) => {
        try {
                const detailData = await axios.get(`http://localhost:3001/detail/${id}`)
                
                const detailResponse = detailData.data
             



                if (detailResponse) {
                        dispatch({
                                type: POKEMON_DETAIL,
                                payload: detailResponse
                        })
                }
        } catch (error) {
                alert('Error loading pokemon detail!')
        }


}

export const CREATEPOKEMON = (formData) => async (dispatch) => {

        try {
                const createData = await axios.post(`http://localhost:3001/add`, formData)


                dispatch({
                        type: CREATE_POKEMON,
                        payload: createData.data
                })


        } catch (error) {

                alert('Can`t create pokemon')

        }
}

export const FILTERPOKEMONORDER = (order) => {
        return {
                type: FILTER_POKEMON_ORDER,
                payload: order
        }

}



//para crear propiedad conviene map  en la action
// para solo renderizar conviene map en el jsx