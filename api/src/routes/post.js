
const { Router, response } = require('express');
require('dotenv').config();
const fetch = require('node-fetch');
const { Pokemon, Type } = require('../db');
const { Op } = require('sequelize');
//const { route } = require('.');

const router = Router();
console.log('post.js', Pokemon)
router.post('/', async (req, res) => {
    const pokemon = { name, life, strong, defense, speed, height, weight, img } = req.body;

    
    res.send(`Pokemon creado ${pokemon.name}`)

});
module.exports = router;