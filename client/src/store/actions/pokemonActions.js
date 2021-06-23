export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_ALL_TYPES = 'GET_ALL_TYPES';
export const GET_POKEMON_NAME = 'GET_POKEMON_NAME';
export const GET_POKEMON_ID = 'GET_POKEMON_ID';
export const GET_POKEMONS_PAGINATIONS = 'GET_POKEMONS_PAGINATIONS';
export const GET_POKEMONS_FILTER = 'GET_POKEMONS_FILTER';
export const GET_TYPES = 'GET_TYPES';
export const GET_POKEMONS_TYPE = 'GET_POKEMONS_TYPE';
export const GET_ORDER_ASCENDENTE = 'GET_ORDER_ASCENDENTE';
export const GET_ORDER_DESCENDENTE = 'GET_ORDER_DESCENDENTE';



// console.log('Pasa por pokemonActions.js')

export function getPokemons() {
    return async function (dispatch) {
        // console.log('Linea')
        const response = await fetch('http://localhost:3001/pokemons');
        const data = await response.json();
        return dispatch({
            type: GET_POKEMONS,
            payload: data
        });

    }
}
export function getAllTypes() {
    return async function (dispatch) {
        // console.log('Linea')
        const response = await fetch('https://pokeapi.co/api/v2/type');
        const { results } = await response.json();
        const types = results.map(t => t.name);
        return dispatch({
            type: GET_ALL_TYPES,
            payload: types
        });

    }
}
export function getPokemonName(name) {
    return async function (dispatch) {
        const response = await fetch(`http://localhost:3001/pokemons?name=${name}`);
        const data = await response.json();
        // console.log('data en pokemonsActios.js', data)
        return dispatch({
            type: GET_POKEMON_NAME,
            payload: data
        });
    }
}
export function getPokemonId(id) {
    return async function (dispatch) {
        const response = await fetch(`http://localhost:3001/pokemons/${id}`);
        const data = await response.json();
        // console.log('data en pokemonsActios.js', data)
        return dispatch({
            type: GET_POKEMON_ID,
            payload: data
        });
    }
}

export function getPokemonPagination(skip, limit) {
    console.log('Paginado', skip,limit)
    return async function (dispatch) {
        const response = await fetch(`http://localhost:3001/pokemons?skip=${skip}&limit=${limit}`);
        const data = await response.json();

        // console.log('data en pokemonsActios.js', data)
        return dispatch({
            type: GET_POKEMONS_PAGINATIONS,
            payload: data
        });
    }

}
export function getPokemonFilter(skip, limit, ord) {
    // console.log('*****skip, limit, ord', skip, limit, ord)
    return async function (dispatch) {
        const response = await fetch(`http://localhost:3001/pokemons?skip=${skip}&limit=${limit}&ord=${ord}`);
        const data = await response.json();
        // console.log('LINEA', data[0])

        return dispatch({
            type: GET_POKEMONS_FILTER,
            payload: data
        });
    }

}
export function getTypes() {
    // console.log('*****getTypes')
    return async function (dispatch) {
        const response = await fetch(`http://localhost:3001/types`);
        const data = await response.json();
        // console.log('LINEA', data[0])

        return dispatch({
            type: GET_TYPES,
            payload: data
        });
    }

}
export function getPokemonsType(type) {
    // console.log('*****skip, limit, ord', type)
    return async function (dispatch) {
        const response = await fetch(`http://localhost:3001/types/${type}`);
        const data = await response.json();
        // console.log('LINEA', data[0])

        return dispatch({
            type: GET_POKEMONS_TYPE,
            payload: data
        });
    }

}
export function getOrderAsdName(pokemons) {
    return {
        type: GET_ORDER_ASCENDENTE,
        payload: pokemons.sort((a,b)=>{
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            if (a.name === b.name) return 0;
        })
    }
}
export function getOrderDesName(pokemons) {
    return {
        type: GET_ORDER_DESCENDENTE,
        payload: pokemons.sort((a,b)=>{
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
            if (a.name === b.name) return 0;
        })
    }
}



