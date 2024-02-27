//importar actions
import { GET_POKEMONS } from '../actions/actions'
import { SEARCH_POKEMON } from '../actions/actions'
import { POKEMON_DETAIL } from '../actions/actions'

const initialState = {
    pokemons: [],
    pokemonsBySearch: [],
    pokemonDetail: []
}


const rootReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: payload

            }
        case SEARCH_POKEMON:
            return {
                ...state,
                pokemonsBySearch: [payload]
            }

        case POKEMON_DETAIL:
            return {
                ...state,
                pokemonDetail: payload,
            }

        default: return {
            ...state
        }
    }
}



export default rootReducer;