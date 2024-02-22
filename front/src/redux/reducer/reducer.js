//importar actions
import {GET_POKEMONS} from '../actions/actions'

const initialState = {
pokemons: [],
}


const rootReducer = (state = initialState ,{type,payload}) =>{

    switch(type){
        case GET_POKEMONS : 
        return{
            ...state,
            pokemons : payload
            
        }
        

        default: return{
            ...state
        }
    }
}
console.log('mi estado:', initialState)


export default rootReducer;