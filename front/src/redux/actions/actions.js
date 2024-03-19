export const GET_POKEMONS = 'GETPOKEMONS';
export const SEARCH_POKEMON = 'SEARCHPOKEMON';
export const POKEMON_DETAIL = 'POKEMONDETAIL';
export const CREATE_POKEMON = 'CREATEPOKEMON';
export const FILTER_POKEMON_ORDER = 'FILTERPOKEMONORDER'
export const POKEMON_TYPES = 'POKEMONTYPES';
export const FILTER_POKEMON_ORIGIN = 'FILTERPOKEMONORIGIN';
export const FILTER_POKEMON_TYPE = 'FILTERPOKEMONTYPE';
export const FILTER_POKEMON_BY_ATTACK = 'FILTERPOKEMONBYATTACK';
export const REFRESH_POKEMON = 'REFRESHPOKEMON';


import axios, { all } from 'axios';

export const GETPOKEMONS = () => async (dispatch) => {



        const apiResponse = await axios.get('http://localhost:3001/home')
        const pokemonsData = apiResponse.data.pokemonData;
        const dataDb = apiResponse.data.dbData;
        let newDataDb = []
        dataDb.map((pokemon,index) => newDataDb.push(
                
                {
                        ...pokemon,
                        origin: "DB",
                        types: dataDb[index].types?.map((type) => type?.name)
                        
                }
                ))
                
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
                                types: pokemon.types?.map((element) => element.type.name),
                                attack : pokemon.stats[1].base_stat,
                                origin: "API"
                        }
                        ))
                        
                


        dispatch({
                type: GET_POKEMONS,
                payload: { pokemonData: urlData, dbData: newDataDb }
        })

}
export const REFRESHPOKEMON = () => {

        return ({
                type: REFRESH_POKEMON,
        })


}

export const SEARCHPOKEMON = (name) => async (dispatch) => {
        try {
                const searchResponse = await axios.get(`http://localhost:3001/name?name=${name}`)

                let searchApi;
                let searchDb;

                if (searchResponse.data.apiData !== null) {
                        searchApi = {
                                ...searchResponse.data.apiData,
                                origin: 'API'
                        }

                }
                if (searchResponse.data.dbResponse.length > 0) {

                        searchDb = searchResponse.data.dbResponse.map((pokemon) => ({
                                ...pokemon,
                                origin: 'DB'
                        })
                        )
                }


                if (searchApi !== undefined && searchDb !== undefined) {
                        dispatch({
                                type: SEARCH_POKEMON,
                                payload: [searchApi, searchDb[0]]
                        })

                } else if (searchDb !== undefined) {
                        dispatch({
                                type: SEARCH_POKEMON,
                                //payload: searchDb[0]
                                payload: [searchDb[0]]
                        })
                } else if (searchApi !== undefined) {
                        dispatch({
                                type: SEARCH_POKEMON,
                                //payload: searchApi
                                payload: [searchApi]
                        })
                }

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

                if (createData) {
                        alert('Pokemon creado!')
                }

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
export const FILTERPOKEMONBYATTACK = (order) => {
        return {
                type: FILTER_POKEMON_BY_ATTACK,
                payload: order
        }
}
export const FILTERPOKEMONORIGIN = (origin) => {

        return {
                type: FILTER_POKEMON_ORIGIN,
                payload: origin
        }
}
export const FILTERPOKEMONTYPE = (type,origin) => {
      
        return {
                type: FILTER_POKEMON_TYPE,
                payload: {
                        type : type,
                        origin : origin
                }
        }
}

export const POKEMONTYPES = () => async (dispatch) => {
        try {
                const { data } = await axios.get('https://pokeapi.co/api/v2/type')

                dispatch({
                        type: POKEMON_TYPES,
                        payload: data.results
                })

        } catch (error) {
                alert('error al recuperar tipos de pokemon')
        }
}

