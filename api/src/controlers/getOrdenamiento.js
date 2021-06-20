const fetch = require('node-fetch');
const { Pokemon, Type } = require('../db');
const { Op } = require('sequelize');
const { response } = require('express');
const { BASIC_URL_POKEMON } = require('../constants');

const getOrdenamiento = async (skip, limit, ord='asda') => {
    console.log('Ruta getOrdenamiento')
    console.log('skip', skip)
    console.log('limit', limit)
    console.log('ord', ord)
    //Ascendente Alfabeticamente
    if (ord === 'asda') {
        const pokemons = await getPokeApiFetchSkipLimit(skip, limit)
        const pokemonsOrdAs = await pokemons.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            if (a.name === b.name) return 0;
        });
        return pokemonsOrdAs;
    }
    //Desendente Alfabeticamente
    if (ord === 'desa') {
        const pokemons = await getPokeApiFetchSkipLimit(skip, limit)
        const pokemonsOrdAs = await pokemons.sort((a, b) => {
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
            if (a.name === b.name) return 0;
        });
        return pokemonsOrdAs;
    }
    //Desendente Fuerza
    if (ord === 'desf') {
        const pokemons = await getPokeApiFetchSkipLimit(skip, limit)
        const pokemonsOrdAs = await pokemons.sort((a, b) => {
            if (a.strength > b.strength) return -1;
            if (a.strength < b.strength) return 1;
            if (a.strength === b.strength) return 0;
        });
        return pokemonsOrdAs;
    }
    //Ascendente Fuerza
    if (ord === 'asdf') {
        const pokemons = await getPokeApiFetchSkipLimit(skip, limit)
        const pokemonsOrdAs = await pokemons.sort((a, b) => {
            if (a.strength > b.strength) return 1;
            if (a.strength < b.strength) return -1;
            if (a.strength === b.strength) return 0;
        });
        return pokemonsOrdAs;
    }
}
//Busca la cantidad de pokemones desde skip, hasta limit y los retorna con la data necesaria.
const getPokeApiFetchSkipLimit = async (skip, limit) => {
    try {
        const response = await fetch(`${BASIC_URL_POKEMON}?offset=${skip}&limit=${limit}`);
        const { results } = await response.json();
        const data = await Promise.all(results.map(async (result) => {
            const info = await fetch(result.url);
            const { id, name, height, weight, stats, types, sprites } = await info.json();
            const pokemon = {
                id,
                name,
                height,
                weight,
                life: stats[0].base_stat,
                strength: stats[1].base_stat,
                defense: stats[2].base_stat,
                speed: stats[5].base_stat,
                types: types.map(({ type }) => type.name),
                img: sprites.other['official-artwork'].front_default
            }
            return pokemon
        })
        )
        return data
    } catch (error) {
        return ['Not Found']
    }
}


module.exports = {
    getOrdenamiento
}
