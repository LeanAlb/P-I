const { Router } = require('express');
const {getAllPokemons, getPokemonId, getPokemonName, getPokemonType}=require('../controllers/getPokemons')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemon', getAllPokemons)

router.get('/pokemon/:id', getPokemonId)

router.get('/pokemon/:name', getPokemonName)

router.get('/type/:id', getPokemonType)

module.exports = router;
