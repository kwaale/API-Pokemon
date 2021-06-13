import { GET_POKEMONS_12, GET_ALL_TYPES } from '../actions/pokemonActions';

const initialState ={
    pokemons:[],
    types:[]
}

const reducer = (state = initialState, action) =>{
    console.log('Entra en reducer state', state, 'action.type' ,action.type);
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
        default:
            return{...state}
    }
}
export default reducer;