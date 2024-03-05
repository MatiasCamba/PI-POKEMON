//importar actions
import { CREATE_POKEMON, GET_POKEMONS } from '../actions/actions'
import { SEARCH_POKEMON } from '../actions/actions'
import { POKEMON_DETAIL } from '../actions/actions'
import { FILTER_POKEMON_ORDER } from '../actions/actions'

const initialState = {
    pokemons: {},
    pokemonsBySearch: [],
    pokemonDetail: [],
    pokemonsFiltered: {}
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
                pokemonsBySearch: [...state.pokemonsBySearch,payload]
            }

        case POKEMON_DETAIL:
            return {
                ...state,
                pokemonDetail: payload,
            }
        
 /*        case CREATE_POKEMON:
            return{
                ...state,
                pokemonCreated: payload
            }
 */ 
            case FILTER_POKEMON_ORDER : 
            let filterByOrder = {...state.pokemons}
            let filteredPokemons;
         
                const filteredArray = filterByOrder.pokemonData.concat(filterByOrder.dbData);
               
                if(payload === 'ascending'){
                     filteredPokemons=filteredArray.sort((a,b)=>a.name.localeCompare(b.name))
                     
                }
                if(payload === 'descending'){
                    filteredPokemons = filteredArray.sort((a,b) => b.name.localeCompare(a.name))
                }
                
                
                return {
                    ...state,
                    pokemons: {pokemonData:filteredPokemons},
                   
                }

        default: return {
            ...state
        }
    }
}



export default rootReducer;