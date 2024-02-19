const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const PokemonController = require('../controllers/PokemonController')
const TypeController = require('../controllers/TypeController')

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/',PokemonController.getPokemons);
router.get('/type',TypeController.getPokemonTypes);
router.get('/name', PokemonController.getPokemonsByName);
router.post('/add',PokemonController.createPokemon);
router.get('/:id',PokemonController.getPokemonsById);


module.exports = router;
