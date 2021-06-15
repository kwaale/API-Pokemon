export const GET_POKEMONS_12 = 'GET_POKEMONS_12';
export const GET_ALL_TYPES = 'GET_ALL_TYPES';
export const GET_POKEMON = 'GET_POKEMON';



console.log('Pasa por pokemonActions.js')

export function getPokemons_12() {
    return async function (dispatch) {
        console.log('Linea')
        const response = await fetch('http://localhost:3001/pokemons');
        const data = await response.json();
        return dispatch({
            type: GET_POKEMONS_12,
            payload: data
        });

    }
}
export function getAllTypes() {
    return async function (dispatch) {
        console.log('Linea')
        const response = await fetch('https://pokeapi.co/api/v2/type');
        const { results } = await response.json();
        const types = results.map(t => t.name);
        return dispatch({
            type: GET_ALL_TYPES,
            payload: types
        });

    }
}
export function getPokemon(name) {
    return async function (dispatch) {
        const response = await fetch(`http://localhost:3001/pokemons?name=${name}`);
        const data = await response.json()
        console.log('Linea', data)
        return dispatch({
            type: GET_POKEMON,
            payload: data
        });
    }

}
