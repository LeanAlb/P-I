import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { showPokemons } from '../../redux/actions';
import {Link} from 'react-router-dom'

import style from './Card.module.css';

const Card = ({ nombre, id }) => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchPokemonImage = async () => {
      const pokemonData = allPokemons.find((pokemon) => pokemon.name === nombre);

      if (pokemonData && pokemonData.url) {
        try {
          const response = await axios.get(pokemonData.url);
          if (response.data.sprites && response.data.sprites.other.dream_world.front_default) {
            setImageUrl(response.data.sprites.other.dream_world.front_default);
          }
        } catch (error) {
          console.error('Error al cargar la imagen del Pokémon:', error);
        }
      }
    };

    if (!allPokemons.length) {
      dispatch(showPokemons()).then(() => {
        fetchPokemonImage();
      });
    } else {
      fetchPokemonImage();
    }
  }, [dispatch, allPokemons, nombre]);

  if (!allPokemons.length) {
    return <div>...Cargando</div>;
  }

  return (
    <div className={style.card}>
        <h3>Nombre: {nombre}</h3>
        <h3>ID: {id}</h3>
        {imageUrl !== '' && <img src={imageUrl} alt={nombre} />}
        <Link to={`/pokemons/${nombre}`}>
            <button className={style.button}>
                Detail
            </button>
        </Link>
    
    </div>
  );
};

export default Card;
