const fetch = require('node-fetch');

/*********************************************************/
/*Recibe lista de primeros 12  de la api desde la pokeapi*/
/*Devuelve solo datos necesarios para ruta principal     */
/*********************************************************/
const getFirst12 = async (req, res) => {
    try {
        const data = []
        for (let i = 1; i <= 12; i++) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const { name, types, sprites } = await response.json();
            const date = {
                name,
                types: types.map(({ type }) => type.name),
                img: sprites.other['official-artwork'].front_default
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

const getPokemonId = async (req, res) =>{
        
}

module.exports = {
    getFirst12,
    getPokemonId
}