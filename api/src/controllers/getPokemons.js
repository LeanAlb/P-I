const axios = require ('axios')
const URL= 'https://pokeapi.co/api/v2/pokemon'
const {Pokemon}=require ('../db')

const getAllPokemons= async (req, res)=>{
    try{
        const response= await axios.get(URL)
        res.status(200).json(response.data)
    } catch(error){
        res.status(400).json({error: 'Ha ocurrido un error'})
    }
}

const getPokemonId=async(req, res)=>{
    const {id}=req.params;
    try{
        const response=await axios.get(`${URL}/${id}`)
        res.status(200).json(response.data)
    } catch(error){
        res.status(400).json({error: 'No hay pokemons con ese ID'})
    }
}

module.exports={getAllPokemons}