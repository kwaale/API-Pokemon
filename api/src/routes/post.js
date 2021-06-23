
const { Router, response } = require('express');
require('dotenv').config();
const fetch = require('node-fetch');
const { Pokemon, Type } = require('../db');
const { Op } = require('sequelize');
//const { route } = require('.');

const router = Router();
// console.log('Pasa post.js')
router.post('/create', async (req, res) => {
    // console.log('Req.body',req.body)
    const name = req.body.name.toLowerCase();
    const { life, types, strength, defense, speed, height, weight, img } = req.body;
    const [pokemon] = await Pokemon.findOrCreate({
        where:{
            name
        },
        defaults: { name, life, strength, defense, speed, height, weight, img },
    });
    types.forEach(async (name)=>{
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