const { Router } = require('express');
const {getAllPokemons, getPokemonId, getPokemonName, getPokemonType}=require('../controllers/pokemonControllers')
const{postPokemonHandler}=require('../controllers/postPokemonHandler')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons', getAllPokemons)

router.get('/pokemons/:name', getPokemonName)

router.get('/types', getPokemonType)

router.post('/pokemons', postPokemonHandler)

router.get('/pokemons/:id', getPokemonId)

module.exports = router;
