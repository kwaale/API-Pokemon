
const { Router, response } = require('express');
require('dotenv').config();

const { getTypesLoadDB, getPokemonApi } = require('../controlers/get');
const { getOrdenamiento } = require('../controlers/get');



const router = Router();

router.get('/', getPokemonApi);
router.get('/types', getTypesLoadDB);
router.get('/:id', getPokemonApi);
router.get('/:ord', getOrdenamiento);

module.exports = router;