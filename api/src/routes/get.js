
const { Router, response } = require('express');
require('dotenv').config();

const { getFirst12, getTypesLoadDB, getPokemonApi } = require('../controlers/get');



const router = Router();

router.get('/', getPokemonApi);
router.get('/types', getTypesLoadDB);
router.get('/:id', getPokemonApi);

module.exports = router;