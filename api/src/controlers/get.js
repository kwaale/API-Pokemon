const fetch = require('node-fetch');
const { Pokemon, Type } = require('../db');
const { BASIC_URL_POKEMON } = require('../constants');
const { response } = require('express');
const { getOrdenamiento } = require('./getOrdenamiento');

/**********************************************************/
/*                        DB y API                        */
/*                   Busca por Id o Name                  */
/*          Devuelve un solo pokemon / Not Found          */
/**********************************************************/
const getPokemonApi = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, skip, limit, ord } = req.query;
        //Obtiene cualquier ordenamiento, por cantidad
        if (typeof (skip) !== "undefined" && typeof (limit) !== "undefined" && typeof (ord) !== "undefined") {
            const data = await getOrdenamiento(skip, limit, ord);
            res.send(data)
        }
        //Obtiene uno por ID
        if (id && id) {
            const data = await getPokeApiFetch(id);
            if (data === 'Not found') {
                console.log('Buscamos DB id')
                res.send(await getPokemonIdDB(id));
            }
            return res.send(data);
        }
        //Obtiene uno por NAME
        if (name && name) {
            console.log('entra en if name', name)
            const data = await getPokeApiFetch(name);
            if (data === 'Not found') {
                console.log('Buscamos DB name')
                res.send(await getPokemonNameDB(name));
                return res.send(pokemon);
            }
            return res.send(data);
        }
        console.log('Dentro de getPokemonApi funcion')
        return res.send(await getPokeApiFetchSkipLimit(0, 12));
    } catch (error) {
        return res.send(['Not Found']);
    }
}
/**********************************************************/
/*                  Fetch API: ID y Name                  */
/*          Consulta la api por nombre y por id           */
/*            Devuelve pokemon o not found                */
/**********************************************************/
const getPokeApiFetch = async (argument) => {
    // console.log('getTypesLoadDB')
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${argument}`);
    if (response.status === 404) {
        // console.log('Entra en el if')
        const data = ['Not found'];
        return data;
    }
    const { id, name, height, weight, stats, types, sprites } = await response.json();
    console.log(name)
    const data = {
        id,
        name,
        types: types.map(({ type }) => type.name),
        height,
        weight,
        life: stats[0].base_stat,
        strength: stats[1].base_stat,
        defense: stats[2].base_stat,
        speed: stats[5].base_stat,
        img: sprites.other['official-artwork'].front_default
    }
    return data;
}
/**********************************************************/
/* Busca la cantidad de pokemones desde skip, hasta limit */
/*            retorna con toda la data a usar             */
/**********************************************************/
const getPokeApiFetchSkipLimit = async (skip, limit) => {
    try {
        const response = await fetch(`${BASIC_URL_POKEMON}?offset=${skip}&limit=${limit}`);
        console.log('skip, limit')
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
        console.log(error)
        return ['Not Found']
    }
}
/*********************************************************/
/*               Consulta la DB por ID                   */
/*     Devuelve pokemon si lo encuentra / Not found      */
/*********************************************************/
const getPokemonIdDB = async (search) => {
    try {
        const {
            id, name, life, strong, defense, speed, height, weight, img, types
        } = await Pokemon.findOne({ where: { id: search }, include: Type })
        const pokemon = {
            id, name, life, strong, defense, speed, height, weight, img,
            types: types.map(t => t.name)
        }
        return pokemon;
    } catch (error) {
        return 'Not found'
    }
}
/*********************************************************/
/*               Consulta la DB por Nombre               */
/*     Devuelve pokemon si lo encuentra / Not found      */
/*********************************************************/
const getPokemonNameDB = async (search) => {
    console.log('Entre en getPokemonNameDB');
    try {
        const {
            id, name, life, strong, defense, speed, height, weight, img, types
        } = await Pokemon.findOne({ where: { name: search }, include: Type })
        const pokemon = {
            id, name, life, strong, defense, speed, height, weight, img,
            types: types.map(t => t.name)
        }
        return pokemon;
    } catch (error) {
        return 'Not found'
    }
}

module.exports = {
    // getFirst12,
    // getTypesLoadDB,
    getPokeApiFetch,
    getPokemonApi,
}
