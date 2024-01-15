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

const getPokemonId = async (id) => {
  
    let localPokemon;
  
    if (isNaN(id)) {
      localPokemon = await Pokemon.findOne({ where: { id: id }, include: Type });
    } 
  
    if (localPokemon) {
      const localPokemonJSON = localPokemon.toJSON(); 
      localPokemonJSON.types = localPokemon.types.map((type) => type.name); 
      return localPokemonJSON; 
    } else if (!isNaN(id)) {
      const getPokemonByIdResponse = await axios(`${URL}/${id}`);
      const data = getPokemonByIdResponse.data;
      const filteredData = await getData(data);
      return filteredData;
    }
  
    throw Error("Pokemon not found");
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

    const response = await axios.get("https://pokeapi.co/api/v2/type");
    const apiTypes = response.data.results;
  
    for (let typeData of apiTypes) {
      const typeName = typeData.name;
      
      const allType = await Type.findAll({ where: { name: typeName } });
  
      if (allType.length === 0) {
        await Type.create({ name: typeName });
      }
    }
  
    return await Type.findAll();
  };

const postPokemon = async ({ name, image, life, attack, defense, types }) => {

    const existingPokemon = await Pokemon.findOne({ where: { name: name } });
    if(existingPokemon){throw Error ('Pokemon with this name already exists')}
  
  
    try {
      const response = await axios.get(`${URL}${name.toLowerCase()}`);
      if (response.data) {
        throw Error("Pokemon with this name already exists");
      }
    } catch (error) {
      if (error.response && error.response.status !== 404) {
        throw error;
      }
    }
      
      let typesInstances = [];
      
     for (let typeName of types) {
       let typeInstance = await Type.findOrCreate({ where: { name: typeName } });
       typesInstances.push(typeInstance[0]);
     }
  
      let newPokemon = await Pokemon.create({
        name,
        image,
        life,
        attack,
        defense
      });
  
      await newPokemon.setTypes(typesInstances);
  
      return newPokemon;
   
  };



module.exports={getAllPokemons, getPokemonId, getPokemonName, getPokemonType, postPokemon}