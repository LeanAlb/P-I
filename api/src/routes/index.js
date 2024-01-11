const { Router } = require('express');
const {getAllPokemons, getPokemonId, getPokemonName, getPokemonType, postPokemon}=require('../controllers/getPokemons')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons', getAllPokemons)

router.get('/pokemons/:id', getPokemonId)

router.get('/pokemons/:name', getPokemonName)

router.get('/type/:id', getPokemonType)

router.post('/pokemons', postPokemon)

module.exports = router;
