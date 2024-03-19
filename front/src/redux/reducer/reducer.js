//importar actions
import { CREATE_POKEMON, FILTER_POKEMON_BY_ATTACK, FILTER_POKEMON_ORIGIN, GET_POKEMONS, POKEMON_TYPES } from '../actions/actions'
import { SEARCH_POKEMON } from '../actions/actions'
import { POKEMON_DETAIL } from '../actions/actions'
import { FILTER_POKEMON_ORDER } from '../actions/actions'
import { FILTER_POKEMON_TYPE } from '../actions/actions'
import { REFRESH_POKEMON } from '../actions/actions'

const initialState = {
    pokemons: {}, //RENDERIZAR
    pokemonsBackup: [], // MODIFICAR ()
    pokemonsBySearch: [],
    pokemonDetail: [],
    pokemonsTypes: [],
    pokemonsTypeBackup: [],

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
                    pokemonsBySearch: payload
                    // pokemonsBySearch: [...state.pokemonsBySearch.concat(payload)]

                }
            } else {
                return {
                    ...state,
                    pokemonsBySearch: payload,
                    // pokemonsBySearch: [...state.pokemonsBySearch, payload]
                }
            }

        case REFRESH_POKEMON:

            return {
                ...state,
                pokemonsBySearch: [],
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

            if (payload === 'ALL') {
                return {
                    ...state,
                    pokemons: state.pokemonsBackup
                }
            }

            if (payload === 'DB') {
                return {
                    ...state,
                    pokemons: { pokemonData: [], dbData: filterByDb }
                }

            } if (payload === 'API') {
                return {
                    ...state,
                    pokemons: { pokemonData: filterByApi, dbData: filterByDb }
                }
            }

        case FILTER_POKEMON_TYPE:

            const copyPokemonTypes = { ...state.pokemonsBackup };

            const filteredPokemonTypeApi = copyPokemonTypes.pokemonData?.filter((pokemons) => {
                const filteredTypes = pokemons.types?.some((type) => type === payload.type)

                if (filteredTypes === true) {
                    return pokemons;
                }
            })

            const filteredPokemonTypeDb = copyPokemonTypes.dbData?.filter((pokemons) => {

                const filteredTypes = pokemons.types?.some((type) => type === payload.type)

                if (filteredTypes === true) {
                    return pokemons;
                }
            })

            if (payload.origin === 'ALL') {
                return {
                    ...state,
                    pokemons: { pokemonData: filteredPokemonTypeApi, dbData: filteredPokemonTypeDb }
                }
            }

            if (payload.origin === 'API') {
                return {
                    ...state,
                    pokemons: { pokemonData: filteredPokemonTypeApi, dbData: [] }
                }
            }

            if (payload.origin === 'DB') {
                return {
                    ...state,
                    pokemons: { dbData: filteredPokemonTypeDb, pokemonData: [] }
                }
            }


        case FILTER_POKEMON_BY_ATTACK:

            const filterAttack = { ...state.pokemonsBackup };
            let filteredAttack

          
            
            if (payload === 'attack-') {
                const filteredArray =  filterAttack.pokemonData?.concat(filterAttack.dbData)
                
                filteredAttack = filteredArray?.sort((a, b) => a.attack - b.attack) 
            }

            if (payload === 'attack+') {
                const filteredArray =  filterAttack.pokemonData?.concat(filterAttack.dbData)
                
                filteredAttack = filteredArray?.sort((a, b) => b.attack - a.attack) 
          }
            

            return {
                ...state,
                pokemons: { pokemonData:filteredAttack}
            }




        case POKEMON_TYPES:
            return {
                ...state,
                pokemonsTypes: payload,
                pokemonsTypeBackup: payload,

            }

        default: return {
            ...state
        }

    }
}




export default rootReducer;