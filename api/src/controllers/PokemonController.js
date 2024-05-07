const axios = require('axios')
const { Pokemon } = require('../db');
const { Type } = require('../db')
const { Op } = require('sequelize');




exports.getPokemons = async (req, res) => {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=65');
        const pokemonData = response.data.results;
      
        const dbData = await Pokemon.findAll({
            include: {model: Type,
                attributes: ['name'],
                through: {attributes:[]}
            }
        })
        console.log('dbData',dbData)
     
        res.status(200).json({ pokemonData, dbData });

    } catch (error) {
        res.status(500).json({ error: error.message || "Error at receiving data!" })
    }

}

exports.getPokemonsById = async (req, res) => {
    const { id } = req.params;


    try {
        if (Number(id)) {
            const apiResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const apiData = apiResponse.data;
            const apiDataUpdate = {
                id: apiData.id,
                name: apiData.name,
                image: apiData.sprites.front_default,
                hp: apiData.stats[0].base_stat,
                attack: apiData.stats[1].base_stat,
                defense: apiData.stats[2].base_stat,
                speed: apiData.stats[5].base_stat,
                height: apiData.height,
                weight: apiData.weight,
                types: apiData.types.map((element) => {
                    return element.type
                })
            }


            return res.status(200).json(apiDataUpdate);
        } else {

            const bdData = await Pokemon.findByPk(id, {
                include: { model: Type },
            })

            return res.status(200).json(bdData);
        }
    } catch (error) {
        res.status(404).json({ error: "Error at pokemon ID!" })
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
                } 
            }
        });
      
    } catch (error) {
        
        return res.status(500).json({ error: 'Error on receiving data from DB.' });
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

            return res.status(500).json({ error: 'Error on receiving data from API.' });
        }
    } // IMPORTANTE


    if (dbResponse.length === 0 && !apiData) {

        return res.status(400).json({ error: 'Pokemon does not exists neither on DB and API' });

    } else if (dbResponse.length > 0 || apiData) {
        return res.status(200).json({ dbResponse, apiData })
    }
}


exports.createPokemon = async (req, res) => {
    const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;
   



    try {
        const created = await Pokemon.create({
            name,
            image,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
        })

        const allType = await Promise.all(types.map((type) => Type.findOne({ where: { name: type } })))

        const TypeId = allType.map((type) => type.dataValues.id)
        

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
            res.status(404).json({ error: 'Could not create pokemon , try again!' })
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}



