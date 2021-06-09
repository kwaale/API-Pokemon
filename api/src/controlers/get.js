const fetch = require('node-fetch');
const { Pokemon, Type } = require('../db');
const { Op } = require('sequelize');

const getDBApiFetchId = async (id)=>{
    const pokemon = Pokemon.findOne({where:{id}})
    
    // const data = {
    //     id,
    //     name,
    //     types: types.map(({ type }) => type.name),
    //     height,
    //     weight,
    //     life:stats[0].base_stat,
    //     strength:stats[1].base_stat,
    //     defense:stats[2].base_stat,
    //     speed:stats[5].base_stat,
    //     img: sprites.other['official-artwork'].front_default
    // }
    // return data;
}

const getPokeApiFetch = async (id)=>{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const { name, height, weight, stats, types, sprites } = await response.json();
    const data = {
        id,
        name,
        types: types.map(({ type }) => type.name),
        height,
        weight,
        life:stats[0].base_stat,
        strength:stats[1].base_stat,
        defense:stats[2].base_stat,
        speed:stats[5].base_stat,
        img: sprites.other['official-artwork'].front_default
    }
    return data;
}

const getPokeApiName = async (req, res) => {
    const { name } = req.body;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const { height, weight, stats, types, sprites } = await response.json();
    const data = {
        id,
        name,
        types: types.map(({ type }) => type.name),
        height,
        weight,
        life:stats[0].base_stat,
        strength:stats[1].base_stat,
        defense:stats[2].base_stat,
        speed:stats[5].base_stat,
        img: sprites.other['official-artwork'].front_default
    }
}
const getPokeApiId = async (req, res) => {
    console.log('Linea 1', req.params.id)
    const { id } = req.params
    const data = await getPokeApiFetch(id)
    console.log('Linea 4',data)
    res.send(data)
}
/*********************************************************/
/*Recibe lista de primeros 12  de la api desde la pokeapi*/
/*Devuelve solo datos necesarios para ruta principal     */
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

// Obtener el detalle de un pokemon en particular
// Debe traer solo los datos pedidos en la ruta de detalle de pokemon
// Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes


module.exports = {
    getFirst12,
    getPokeApiId
}