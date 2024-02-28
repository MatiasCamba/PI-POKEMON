const axios = require('axios')
const { Pokemon } = require('../db');
const { Type } = require('../db')
const { Op } = require('sequelize');




exports.getPokemons = async (req, res) => {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const pokemonData = response.data.results;
        console.log('me llega la data de la api:', pokemonData)
        const dbData = await Pokemon.findAll()
        console.log('me llega la data de la db:', dbData)
        res.status(200).json({ pokemonData, dbData });

    } catch (error) {
        res.status(500).json({ error: error.message || "Error al recibir los datos!" })
    }

}

exports.getPokemonsById = async (req, res) => {
    const { id, idPokemon } = req.params;


    try {

        const apiResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const apiData = apiResponse.data;

        console.log("asi llega la api:", apiData);


        const bdData = await Pokemon.findByPk(idPokemon, {
            include: { model: Type },
        })

        console.log("asi llega la bd data:", bdData);


        res.status(200).json({ bdData, apiData });




    } catch (error) {
        res.status(404).json({ error: "Error al recibir el id del pokemon!" })
    }
}


exports.getPokemonsByName = async (req, res) => {
    const { name } = req.query
    const nameApi = name.toLowerCase();
    let dbResponse;
    let apiData;

    try {
        dbResponse = await Pokemon.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${nameApi}%`,
                } //true
            }
        });
    } catch (error) {
        return res.status(500).json({ error: 'Error al recibir datos de la base de datos.' });
    }


    try {

        const apiResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nameApi}`);
        apiData = {
            name: apiResponse.data.name,
            image: apiResponse.data.sprites.front_default,
            id: apiResponse.data.id
        } 



    } catch (error) {
       
        if (error.response && error.response.status === 404) {
            apiData = null; 
        } else {

            return res.status(500).json({ error: 'Error al recibir datos de la api.' });
        }
    } // IMPORTANTE


    if (dbResponse.length === 0 && !apiData) {

        return res.status(400).json({ error: 'El Pokémon no existe en la API ni en la base de datos.' });

    } else if (dbResponse.length > 0 || apiData) {
        return res.status(200).json({ dbResponse, apiData })
    }
}


exports.createPokemon = async (req, res) => {
    const { name, hp, def, speed, height, weight, typeName } = req.body;


    try {
        const created = await Pokemon.create({
            name,
            hp,
            def,
            speed,
            height,
            weight,

        })
        // lograr entrar al type , dentro acceder al name y pasarlo al addType
        const allType = await Type.findOne({ where: { name: typeName } })

        const TypeId = allType.id

        await created.addType(TypeId);
        const createdPokemon = await Pokemon.findOne({ where: { name } }, {
            include: {
                model: Type,
                through: {
                    attributes: [],
                },
            },
        })


        if (created) {
            res.status(200).json(createdPokemon);
        } else {
            res.status(404).json({ error: 'No se pudo crear un nuevo pokemon , intenta de nuevo!' })
        }

    } catch (error) {
        res.status(500).json({ error: 'fallo la peticion!' })
    }
}

