const axios = require('axios')
const { Pokemon } = require('../db');
const {Type} = require('../db')
const { Op } = require('sequelize')



exports.getPokemons = async (req, res) => {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const pokemonData = response.data;
        res.status(200).json(pokemonData);

    } catch (error) {
        res.status(500).json({ error: error.message || "Error al recibir los datos!" })
    }

}

exports.getPokemonsById = async (req, res) => {
    const { id, idPokemon } = req.params;


    try {

        const apiResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const apiData = apiResponse.data.id;

        console.log("asi llega la api:", apiData);


        const bdData = await Pokemon.findByPk(idPokemon, {
            include: Type,
        })

        console.log("asi llega la bd data:", bdData);


        res.status(200).json({ bdData, apiData });




    } catch (error) {
        res.status(404).json({ error: "Error al recibir el id del pokemon!" })
    }
}

exports.getPokemonsByName = async (req, res) => {
    const { name, nameBd } = req.query

    try {
        const apiResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const apiData = apiResponse.data.name;
        console.log("me llega la data asi :", apiData)

        const dbResponse = await Pokemon.findOne({
            where: {
                name: {
                    [Op.iLike]: nameBd,
                }
            }
        });
        console.log("me llega la bd asi :", dbResponse)

        apiData || dbResponse ? res.status(200).json({ apiData, dbResponse }) : res.status(400).json({ error: 'No se encontró pokemon con ese nombre!' })

    } catch (error) {
        res.status(404).json({ error: 'Error al recibir datos!' })
    }
}

exports.createPokemon = async (req, res) => {
    const { name, hp, def, speed, height, weight} = req.body;
    
    console.log("me llego esta info: ", name, hp, def, speed, height, weight)

    try {
        const created = await Pokemon.create({
            name,
            hp,
            def,
            speed,
            height,
            weight,
        }, {
            include: Type
        })

        console.log("me llego este created :", created)


        if (created) {
            res.status(200).json(created);
        } else {
            res.status(404).json({ error: 'No se pudo crear un nuevo pokemon , intenta de nuevo!' })
        }

    } catch (error) {
        res.status(500).json({ error: 'fallo la peticion!' })
    }
}

