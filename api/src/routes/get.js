
const { Router, response } = require('express');
require('dotenv').config();

const { getPokemonApi } = require('../controlers/get');
// const { getOrdenamiento } = require('../controlers/getOrdenamiento');



const router = Router();

router.get('/', getPokemonApi);
router.get('/:id', getPokemonApi);

module.exports = router;