const fetch = require('node-fetch');
const { Type } = require('../db');
const { URL_TYPES } = require('../constants');
const {getPokeApiFetch} = require('./get')


/**********************************************************/
/*            Consulta y Carga los TYPES(Solo nombre) en DB            */
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
//Trae pokemones por tipo
const getTypesPokemons = async (req, res) => {
    try {
        
        const { type } = req.params;
        console.log('getTypesLoadDB Q',type)
        const response = await fetch(URL_TYPES);
        const data = await response.json();
        const {url} = data.results.find(result => result.name === type);
        const response_1 = await fetch(url);
        const {pokemon:data_1} = await response_1.json();
        console.log('pokemons',data_1[0])
        // pokemons {
        //     pokemon: { name: 'mankey', url: 'https://pokeapi.co/api/v2/pokemon/56/' },
        //     slot: 1
        //   }
        const pokemons = await Promise.all(data_1.map(async (element)=>{
        console.log('url',element.url)

            const response_2 = await fetch(element.url);
            const { id, name, height, weight, stats, types, sprites } = await response.json();
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
        console.log(pokemons[0]);



        console.log('type1',url)
        
        
        // const types = await Promise.all(typeNames.map(async type => {
        //     const [aux] = await Type.findOrCreate({
        //         where: {
        //             name: type
        //         }
        //     })
        //     return aux.name
        // }
        // ));
        res.send('types')
    } catch (error) {
        console.log('++++++++ERROR++++++++')
        console.error(error)
        console.log('++++++++ERROR++++++++')
    }
}



module.exports = {
    getTypesLoadDB,
    getTypesPokemons
}
