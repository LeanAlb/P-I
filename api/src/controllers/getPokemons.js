const axios = require ('axios')
const URL= 'https://pokeapi.co/api/v2/pokemon'
const {Pokemon, Type}=require ('../db')
const { Sequelize } = require('sequelize')

const getAllPokemons= async (req, res)=>{
    try{
        const response= await axios.get(`${URL}/?limit=150&offset=0`)
        res.status(200).json(response.data)
    } catch(error){
        res.status(400).json({error: 'Ha ocurrido un error'})
    }
}

const getPokemonId=async(req, res)=>{
    const {id}=req.params;
    try{
        const response=await axios.get(`${URL}/${id}/`)
        res.status(200).json(response.data)
    } catch(error){
        res.status(400).json({error: 'No hay pokemons con ese ID'})
    }
}

const getPokemonName=async (req, res)=>{
    const {name}=req.params;
    try{
        const response=await axios.get(`${URL}/${name}/`)
        res.status(200).json(response.data)
    } catch (error){
        res.status(400).json({error: 'No hay pokemons con ese nombre'})
    }
}

const getPokemonType=async (req, res)=>{
    const {id}=req.params
    try{
        const response= await axios.get(`https://pokeapi.co/api/v2/type/${id}`)
        res.status(200).json(response.data)
    } catch (error){
        res.status(400).json({error: 'No hay pokemons de ese tipo'})
    }
}

const postPokemon=async (req, res)=>{
    const {id, nombre, imagen, vida, ataque, defensa, types}=req.body;
    try{
        const pokemonCreado=await Pokemon.create({
            id,
            nombre,
            imagen,
            vida, 
            ataque, 
            defensa,
        });
        const encontrarType=await Type.findAll({
            where:{
                name:{
                    [Sequelize.Op.in]:types,
                },
            },
        });

        await pokemonCreado.addType(encontrarType);

        res.status(200).json(pokemonCreado)
    }catch(error){
        res.status(500).json({error: 'Error al crear el pokemon'})
    }

}

module.exports={getAllPokemons, getPokemonId, getPokemonName, getPokemonType, postPokemon}