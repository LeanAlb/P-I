// actions.js
import axios from 'axios';

export const showPokemons = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios('http://localhost:3001/pokemons');
      dispatch({
        type: 'SHOW_POKEMONS',
        payload: data,
      });
    } catch (error) {
      throw Error('No se han encontrado pokemons');
    }
  };
};

export const changePage = (order) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'PAGINATION',
        payload: order,
      });
    } catch (error) {
      throw Error('Error al paginar');
    }
  };
};

export const typeSelector = (selectedType) => {
  return {
    type: 'SELECTOR',
    payload: selectedType,
  };
};

export const createPokemon = (pokemonData) => {
  return async (dispatch) => {
    
    try {
      const response = await axios.post('http://localhost:3001/pokemons', pokemonData);
      const newPokemon = response.data;

      
      dispatch({
        type: 'CREATE_POKEMON',
        payload: newPokemon,
      });
    } catch (error) {
      console.error('Error al crear el Pokémon:', error);
      throw Error('Error al crear el Pokémon');
    }
  };
};
export const updateNewPokemon = (updatedData) => {
  return {
    type: 'UPDATE_NEW_POKEMON',
    payload: updatedData,
  };
};
