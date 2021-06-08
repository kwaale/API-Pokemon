const { Router } = require('express');
const post = require('./post');
const get = require('./get');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', get);
router.use('/pokemons', post);

module.exports = router;
