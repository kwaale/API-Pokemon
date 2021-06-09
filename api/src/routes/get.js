
const { Router, response } = require('express');
require('dotenv').config();

const { getFirst12, getPokeApiId } = require('../controlers/get');

// const { types } = require('pg');
//const { route } = require('.');

const router = Router();

router.get('/:id', getPokeApiId);
router.get('/', getFirst12);
// router.get('/', async (req, res) => {
//     const data = []
//     for(let i = 1; i <= 12; i++){
//         console.log('i',i)
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
//     const { id, name, height, weight, stats, types, sprites } = await response.json();
//     const date = {id, name, height, weight, stats, types, sprites};
//     data.push(date)
//     }
//     res.send(data)
// });
module.exports = router;