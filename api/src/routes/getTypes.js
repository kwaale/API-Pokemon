
const { Router, response } = require('express');
require('dotenv').config();

const { getTypesLoadDB, getPokemonsTypes} = require('../controlers/getTypes');

const router = Router();

router.get('/:type', getPokemonsTypes);
router.get('/', getTypesLoadDB);

module.exports = router;