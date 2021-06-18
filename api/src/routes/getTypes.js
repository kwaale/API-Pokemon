
const { Router, response } = require('express');
require('dotenv').config();

const { getTypesLoadDB, getTypesPokemons} = require('../controlers/getTypes');

const router = Router();

router.get('/:type', getTypesPokemons);
router.get('/', getTypesLoadDB);

module.exports = router;