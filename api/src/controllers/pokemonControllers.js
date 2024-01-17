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


const getPokemonType = async (req, res) => {
  try {
    
    const response = await axios.get('https://pokeapi.co/api/v2/type');

    if (response && response.data && response.data.results) {
      const typesFromAPI = response.data.results;

      
      const countTypesInDB = await Type.count();

      
      if (countTypesInDB === 0) {
        const typesToSave = typesFromAPI.map(async (type) => {
          
          const typeDetailsResponse = await axios.get(type.url);
          const typeName = typeDetailsResponse.data.name;

          
          const [savedType, created] = await Type.findOrCreate({
            where: { name: typeName },
          });

          return savedType;
        });

        
        const savedTypes = await Promise.all(typesToSave);

        console.log('Tipos guardados en la base de datos:', savedTypes.map(type => type.name));

        
        res.status(200).json(savedTypes.map(type => type.name));
      } else {
        console.log('La base de datos ya contiene tipos. No se guardaron nuevos tipos.');

        
        res.status(200).json('La base de datos ya contiene tipos. No se guardaron nuevos tipos.');
      }
    }
  } catch (error) {
    console.error('Error al obtener/guardar tipos de Pokémon:', error);

    
    res.status(400).json({ error: 'Error al cargar los tipos' });
  }
};







module.exports={getAllPokemons, getPokemonId, getPokemonName, getPokemonType}