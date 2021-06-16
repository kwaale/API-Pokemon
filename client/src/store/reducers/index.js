import { GET_POKEMONS_12, GET_ALL_TYPES, GET_POKEMON } from '../actions/pokemonActions';

const initialState ={
    pokemons:[],
    types:[],
    pokemon:{}
}

const reducer = (state = initialState, action) =>{
    // console.log('Entra en reducer state', state, 'action.type' ,action.type);
    switch(action.type){
        case GET_POKEMONS_12:
        return{
            ...state,
            pokemons:action.payload
        }
        case GET_ALL_TYPES:
        return{
            ...state,
            types:action.payload
        }
        case GET_POKEMON:
            // console.log('Entra en redudcer get pokemon action payload', action.payload)
        return{
            ...state,
            pokemon:action.payload
        }
        default:
            return{...state}
    }
}
export default reducer;