import { GET_POKEMONS, GET_POKEMONS_PAGINATIONS, GET_POKEMON_ID, GET_ALL_TYPES, GET_POKEMON_NAME, GET_POKEMONS_FILTER } from '../actions/pokemonActions';

const initialState ={
    pokemons:[],
    types:[],
    pokemon:{}
}

const reducer = (state = initialState, action) =>{
    // console.log('Entra en reducer state', state, 'action.type' ,action.type);
    switch(action.type){
        case GET_POKEMONS:
        return{
            ...state,
            pokemons:action.payload
        }
        case GET_ALL_TYPES:
        return{
            ...state,
            types:action.payload
        }
        case GET_POKEMON_ID:
            return{
                ...state,
                pokemon:action.payload
            }
        case GET_POKEMON_NAME:
            // console.log('Entra en redudcer get pokemon action payload', action.payload)
        return{
            ...state,
            pokemon:action.payload
        }
        case GET_POKEMONS_PAGINATIONS:
        return{
            ...state,
            pokemons:action.payload
        }
        case GET_POKEMONS_FILTER:
        return{
            ...state,
            pokemons:action.payload
        }
        default:
            return{...state}
    }
}
export default reducer;