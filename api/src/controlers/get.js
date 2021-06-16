const fetch = require('node-fetch');
const { Pokemon, Type } = require('../db');
const { Op } = require('sequelize');
const { response } = require('express');

/**********************************************************/
/*                        DB y API                        */
/*                   Busca por Id o Name                  */
/*          Devuelve un solo pokemon / Not Found          */
/**********************************************************/
const getPokemonApi = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.query;
        console.log('Aqui name', name)
        console.log('Aqui id', id)
        if (id && id) {
            const data = await getPokeApiFetch(id);
            if (data === 'Not found') {
                console.log('Buscamos DB id')
                res.send(await getPokemonIdDB(id));
            }
            return res.send(data);
        }
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
        await getFirst12(req, res)
    } catch (error) {
        console.error(error);
        if (error instanceof TypeError) {
            res.send('No se encontro pokemon');
        }
    }
}
/**********************************************************/
/*                  Fetch API: ID y Name                  */
/*          Consulta la api por nombre y por id           */
/*            Devuelve not found o el pokemons            */
/**********************************************************/
const getPokeApiFetch = async (argument) => {
    // console.log('getTypesLoadDB')
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${argument}`);
    if (response.status === 404) {
        // console.log('Entra en el if')
        const data = 'Not found';
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
/*            Consulta y Carga los TYPES en DB            */
/*Devuelve solo datos necesarios de 12 para ruta principal*/
/**********************************************************/
const getTypesLoadDB = async (req, res) => {
    console.log('getTypesLoadDB')
    const response = await fetch(`https://pokeapi.co/api/v2/type`);
    const data = await response.json();
    const typeNames = data.results.map(({ name }) => name);
    typeNames.forEach(async (name) => {
        const [type] = await Type.findOrCreate({
            where: {
                name
            }
        })
    });
    res.send(typeNames)
}
/**********************************************************/
/*                Consulta get principal                  */
/*Devuelve solo datos necesarios de 12 para ruta principal*/
/**********************************************************/
const getFirst12 = async (req, res) => {
    try {
        const data = []
        for (let i = 1; i <= 12; i++) {
            const { name, types, img } = await getPokeApiFetch(i)
            const date = {
                name,
                types,
                img
            };

            data.push(date);
        }
        res.send(data);
    } catch (error) {
        console.error(error);
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
    getFirst12,
    getTypesLoadDB,
    getPokemonApi,
}
