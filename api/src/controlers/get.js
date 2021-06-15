const fetch = require('node-fetch');
const { Pokemon, Type } = require('../db');
const { Op } = require('sequelize');
const { response } = require('express');

/**********************************************************/
/*                        DB y API                        */
/*Busca por Id o name                                    */
/*Devuelve un solo pokemon                              */
/**********************************************************/
const getPokemonApi = async (req, res) => {
    // console.log('getPokemonApi')
    const { id } = req.params;
    const { name } = req.query;
    // console.log('Aqui name',name)
    // console.log('Aqui id',id)
    if (id && id) {
        const data = await getPokeApiFetch(id);
        if(data ==='Not found'){
            // console.log('Buscamos DB id')
            let pokemon = await Pokemon.findOne({where:{id},include:Type})
            pokemon = {
                id:pokemon.id,
                name:pokemon.name,
                life:pokemon.life,
                strong:pokemon.strong,
                defense:pokemon.defense,
                speed:pokemon.speed,
                height:pokemon.height,
                weight:pokemon.weight,
                img:pokemon.img,
                types:pokemon.types.map(t=>t.name)
            }
            return res.send(pokemon);
        }
        return res.send(data);
    }
    if(name && name){
        // console.log('entra en if name',name)
        const data = await getPokeApiFetch(name);
        if(data ==='Not found'){
            // console.log('Buscamos DB name')
            let pokemon = await Pokemon.findOne({where:{name},include:Type})
            pokemon = {
                id:pokemon.id,
                name:pokemon.name,
                life:pokemon.life,
                strong:pokemon.strong,
                defense:pokemon.defense,
                speed:pokemon.speed,
                height:pokemon.height,
                weight:pokemon.weight,
                img:pokemon.img,
                types:pokemon.types.map(t=>t.name)
            }
            // console.log(pokemon)
            return res.send(pokemon);
        }
        return res.send(data);
    }
    
    await getFirst12(req,res)

}
/**********************************************************/
/*                  Fetch API: ID y Name                  */
/*          Consulta la api por nombre y por id           */
/*            Devuelve not found o el pokemons            */
/**********************************************************/
const getPokeApiFetch = async (argument) => {
    console.log('getTypesLoadDB')

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
/*********************************************************/
/*Consulta get principal*/
/*Devuelve solo datos necesarios de 12 para ruta principal     */
/*********************************************************/

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


module.exports = {
    getFirst12,
    getTypesLoadDB,
    getPokemonApi,
}
// const getPokeApiName = async (req, res) => {
//     const { name } = req.body;
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
//     const { height, weight, stats, types, sprites } = await response.json();
//     const data = {
//         id,
//         name,
//         types: types.map(({ type }) => type.name),
//         height,
//         weight,
//         life:stats[0].base_stat,
//         strength:stats[1].base_stat,
//         defense:stats[2].base_stat,
//         speed:stats[5].base_stat,
//         img: sprites.other['official-artwork'].front_default
//     }
// }
/**********************************************************/
/*                  Consulta: ID                          */
/*            Devuelve not found o el pokemons            */
/**********************************************************/
// const getPokeApiId = async (req, res) => {
//     console.log('Linea 1', req.params.id)
//     const { id } = req.params
//     const data = await getPokeApiFetch(id)
//     // console.log('Linea 4',data)
//     res.send(data)
// }