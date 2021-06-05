const { Router } = require('express');
const post = require('./post');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', post);


module.exports = router;
