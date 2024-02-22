const axios = require('axios')
const { Type } = require('../db')

exports.getPokemonTypes = async (req, res) => {
       
    
    try {
        const apiTypeData = await axios.get(`https://pokeapi.co/api/v2/type`)
       
        
        const dbTypeData = apiTypeData.data.results
       
        
        
        
        await Promise.all(dbTypeData.map( (type) => {
             Type.create({ name: type.name})
        }))
        res.status(200).json({ message: 'Tipo de pokemon guardado!' })
    }

    catch (error) {
        res.status(404).json({ error: 'Fallo la obtencion de tipo de pokemon!' })
    }
}

