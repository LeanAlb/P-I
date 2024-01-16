const axios = require ('axios')
const URL= 'https://pokeapi.co/api/v2/pokemon/'
const {Pokemon, Type}=require ('../db')
const { Sequelize } = require('sequelize')

const getAllPokemons= async (req, res)=>{
    try{
        const response= await axios.get(`${URL}/?limit=1302&offset=0`)
        res.status(200).json(response.data.results)
    } catch(error){
        res.status(400).json({error: 'Ha ocurrido un error'})
    }
}

const getPokemonId = async (req, res) => {
  const {id}=req.params;
  try {
    const response=await axios.get(`${URL}/${id}`)
    res.status(200).json(response.data)
  } catch (error) {
    res.status(400).json({error: 'No hay pokemons con ese ID'})
  }
  };

const getPokemonName=async (req, res)=>{
    const {name}=req.params;
    try{
        const response=await axios.get(`${URL}/${name}/`)
        res.status(200).json(response.data)
    } catch (error){
        res.status(400).json({error: 'No hay pokemons con ese nombre'})
    }
}

const getPokemonType = async () => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/type");

    if (response && response.data && response.data.results) {
      const typesFromAPI = response.data.results;

      const typesToSave = typesFromAPI.map(async (type) => {
        const typeDetails = await axios.get(type.url);

        const savedType = await Type.create({
          name: typeDetails.data.name,
          url: typeDetails.data.url,
        });

        return savedType;
      });

      const savedTypes = await Promise.all(typesToSave);

      console.log("Tipos guardados en la base de datos:", savedTypes);
    }
  } catch (error) {
    console.error('Error al obtener tipos de Pokémon:', error);
  }
    
    
};



module.exports={getAllPokemons, getPokemonId, getPokemonName, getPokemonType}