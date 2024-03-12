//importar actions
import { CREATE_POKEMON, FILTER_BY_TYPE, FILTER_POKEMON_ORIGIN, GET_POKEMONS, POKEMON_TYPES } from '../actions/actions'
import { SEARCH_POKEMON } from '../actions/actions'
import { POKEMON_DETAIL } from '../actions/actions'
import { FILTER_POKEMON_ORDER } from '../actions/actions'

const initialState = {
    pokemons: {}, //RENDERIZAR
    pokemonsBackup: [], // MODIFICAR ()
    pokemonsBySearch: [],
    pokemonDetail: [],
    pokemonsTypes: [],
}


const rootReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case GET_POKEMONS:

            return {
                ...state,
                pokemons: payload,
                pokemonsBackup: payload,
               
            }


        case SEARCH_POKEMON:

            if (Array.isArray(payload)) {
                return {
                    ...state,
                    pokemonsBySearch: [...state.pokemonsBySearch.concat(payload)]
                }
            } else {
                return {
                    ...state,
                    pokemonsBySearch: [...state.pokemonsBySearch, payload]
                }
            }


        case POKEMON_DETAIL:
            return {
                ...state,
                pokemonDetail: payload,
            }


        case FILTER_POKEMON_ORDER:
            let filterByOrder = { ...state.pokemons }
            let filteredPokemons;

            const filteredArray = filterByOrder.pokemonData?.concat(filterByOrder?.dbData);

            if (payload === 'ascending') {
                filteredPokemons = filteredArray.sort((a, b) => a.name.localeCompare(b.name))

            }
            if (payload === 'descending') {
                filteredPokemons = filteredArray.sort((a, b) => b.name.localeCompare(a.name))
            }


            return {
                ...state,
                pokemons: { pokemonData: filteredPokemons },

            }


        case FILTER_POKEMON_ORIGIN:
            let filterOrigin = { ...state.pokemonsBackup }
           
            

            const filterByApi = filterOrigin.pokemonData?.filter((pokemon) => pokemon?.origin === payload)
            const filterByDb = filterOrigin.dbData?.filter((pokemon) => pokemon?.origin === payload)
        
            if(payload === 'ALL'){
                return{
                    ...state,
                    pokemons : state.pokemonsBackup
                }
            } 

            if(payload === 'DB'){
                return {
                    ...state,
                    pokemons : {pokemonData: [], dbData : filterByDb}
                }

            } if(payload ==='API'){
                return{
                    ...state,
                    pokemons : {pokemonData : filterByApi, dbData: filterByDb}
                }
            }


        case FILTER_BY_TYPE:


        case POKEMON_TYPES:
            return {
                ...state,
                pokemonsTypes: payload,
            }

        default: return {
            ...state
        }

    }
}




export default rootReducer;