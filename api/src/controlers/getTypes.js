const fetch = require('node-fetch');
const { Type, Pokemon } = require('../db');
const { URL_TYPES } = require('../constants');

/**********************************************************/
/*     Consulta y Carga los TYPES(Solo nombre) en DB      */
/*               Devuelve solo array types                */
/**********************************************************/
const getTypesLoadDB = async (req, res) => {
    console.log('getTypesLoadDB Q')
    const response = await fetch(URL_TYPES);
    const data = await response.json();
    const typeNames = data.results.map(({ name }) => name);
    const types = await Promise.all(typeNames.map(async type => {
        const [aux] = await Type.findOrCreate({
            where: {
                name: type
            }
        })
        return aux.name
    }
    ));
    res.send(types)
}
/**********************************************************/
/*             Consulta por types en API y DB             */
/*               Devuelve array de pokemones              */
/**********************************************************/
const getPokemonsTypes = async(req, res)=>{
    try {
        const { type } = req.params;
        const pokemonsApi = await getTypesPokemonsApi(type);
        const pokemonsDB = await getTypesPokemonsDB(type);
        res.send(pokemonsDB.concat(pokemonsApi))
        
    } catch (error) {
        console.log('++++++++ERROR++++++++')
        console.error(error)
        console.log('++++++++ERROR++++++++')
    }
}




/**********************************************************/
/*               Consulta por types en API                */
/*               Devuelve array de pokemones              */
/**********************************************************/
const getTypesPokemonsApi = async (type) => {
    try {
        const response = await fetch(URL_TYPES);
        const data = await response.json();
        const {url} = data.results.find(result => result.name === type);
        const response_1 = await fetch(url);
        const {pokemon:data_1} = await response_1.json();
        const pokemons = await Promise.all(data_1.map(async ({pokemon})=>{
            const response_2 = await fetch(pokemon.url);
            const { id, name, height, weight, stats, types, sprites } = await response_2.json();
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
        }))
        return(pokemons)
    } catch (error) {
        console.log('++++++++ERROR++++++++')
        console.error(error)
        console.log('++++++++ERROR++++++++')
    }
}
/**********************************************************/
/*               Consulta por types en DB                */
/*               Devuelve array de pokemones              */
/**********************************************************/
const getTypesPokemonsDB = async (type) => {
    try {
        const data = await Type.findOne({
            where:{name:type},
            include:Pokemon,
            }
        )
        const ids = data.pokemons.map(d=>d.id)
        const pokemons = await Promise.all(ids.map( async id =>{
             const {
                name,life,strength,defense,speed,height,weight,img,types
             } = await Pokemon.findByPk(id,{include:Type})
             const obj = {
                id,name,life,strength,defense,speed,height,weight,img,
                types:types.map(t=>t.name)
             }
             return obj;
            }));
        return pokemons;
    } catch (error) {
        console.log('++++++++ERROR++++++++')
        console.error(error)
        console.log('++++++++ERROR++++++++')
    }
}
module.exports = {
    getTypesLoadDB,
    getPokemonsTypes
}
