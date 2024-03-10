//importar actions
import { CREATE_POKEMON, FILTER_POKEMON_ORIGIN, GET_POKEMONS, POKEMON_TYPES } from '../actions/actions'
import { SEARCH_POKEMON } from '../actions/actions'
import { POKEMON_DETAIL } from '../actions/actions'
import { FILTER_POKEMON_ORDER } from '../actions/actions'

const initialState = {
    pokemons: {},
    pokemonsBySearch: [],
    pokemonDetail: [],
    pokemonsTypes: [],
}


const rootReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case GET_POKEMONS:

            return {
                ...state,
                pokemons: payload
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

            const filteredArray = filterByOrder.pokemonData.concat(filterByOrder.dbData);

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
            let filterByOrigin = { ...state.pokemons }
            let filteredOrigin;
            //const allFilterArray = filterByOrigin.pokemonData.concat(filterByOrigin.dbData);

            if (payload === 'API') {
                filteredOrigin = filterByOrigin.pokemonData?.filter(pokemon => pokemon?.origin === 'API')
                return {
                    ...state,
                    pokemons: { ...filterByOrigin,pokemonData: filteredOrigin }
                }
            } else if (payload === 'DB') {
                filteredOrigin = filterByOrigin.dbData?.filter(pokemon => pokemon?.origin === 'DB')
                return {
                    ...state,
                    pokemons: { ...filterByOrigin,pokemonData: filteredOrigin }
                }
            } else {
                return state
            }


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