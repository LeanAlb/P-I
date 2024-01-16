const axios = require('axios');
const URL = 'https://pokeapi.co/api/v2/pokemon/';
const { Pokemon, Type } = require('../db');

const postPokemon = async ({ name, image, life, attack, defense, types }) => {
  const existingPokemon = await Pokemon.findOne({ where: { name: name } });
  if (existingPokemon) {
    throw Error('Ya hay un Pokémon con este nombre');
  }

  try {
    const response = await axios.get(`${URL}${name.toLowerCase()}`);
    if (response.data) {
      throw Error('Ya hay un Pokémon con este nombre');
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
    defense,
  });

  await newPokemon.setTypes(typesInstances);

  return newPokemon;
};

module.exports = { postPokemon };
