
const { Router, response } = require('express');
require('dotenv').config();
const fetch = require('node-fetch');
const { Pokemon, Type } = require('../db');
const { Op } = require('sequelize');
//const { route } = require('.');

const router = Router();

router.post('/', async (req, res) => {

});
module.exports = router;