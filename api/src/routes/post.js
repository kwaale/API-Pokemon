
const { Router, response } = require('express');
require('dotenv').config();
const fetch = require('node-fetch');
const { Pokemon, Type } = require('../db');
const { Op } = require('sequelize');
//const { route } = require('.');

const router = Router();
console.log('Pasa post.js')
router.post('/', async (req, res) => {
    const { name, life, type, strong, defense, speed, height, weight, img } = req.body;
    const [pokemon] = await Pokemon.findOrCreate({
        where:{
            name
        },
        defaults: { name, life, strong, defense, speed, height, weight, img },
    });
    type.forEach(async (name)=>{
        const [type] = await Type.findOrCreate({
            where:{
                name
            }
        })
        pokemon.addTypes(type)
    });
    res.send(`Creado ${pokemon.name}`);
     });
module.exports = router;