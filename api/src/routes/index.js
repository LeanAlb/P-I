const { Router } = require('express');
const {getAllPokemons, getPokemonId}=require('../controllers/getPokemons')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons', getAllPokemons)

// router.get('/pokemons/:id/', getPokemonId)

module.exports = router;
