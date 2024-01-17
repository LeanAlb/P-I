// Card.jsx
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { showPokemons } from '../../redux/actions';
import { Link } from 'react-router-dom';
import style from './Card.module.css';

const Card = ({ nombre, id }) => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);
  const [imageUrl, setImageUrl] = useState('');
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const pokemonData = allPokemons.find((pokemon) => pokemon.name === nombre);

      if (pokemonData && pokemonData.url) {
        try {
          const response = await axios.get(pokemonData.url);

          const pokemonTypes = response.data.types.map((type) => type.type.name);
          setTypes(pokemonTypes);

          if (response.data.sprites && response.data.sprites.other.dream_world.front_default) {
            setImageUrl(response.data.sprites.other.dream_world.front_default);
          }
        } catch (error) {
          console.error('Error al cargar detalles del Pokémon:', error);
        }
      }
    };

    if (!allPokemons.length) {
      dispatch(showPokemons()).then(() => {
        fetchPokemonDetails();
      });
    } else {
      fetchPokemonDetails();
    }
  }, [dispatch, allPokemons, nombre]);

  if (!allPokemons.length || types.length === 0) {
    return <div>...Cargando</div>;
  }

  return (
    <div className={style.card}>
      <h3>Nombre: {nombre}</h3>
      <h3>ID: {id}</h3>
      <h4>Tipos:</h4>
      <h5>
        {types.map((type) => (
          <li key={type}>{type}</li>
        ))}
      </h5>
      {imageUrl !== '' && <img src={imageUrl} alt={nombre} />}

      <Link to={`/pokemons/${nombre}`}>
        <button className={style.button}>
          Detalle
        </button>
      </Link>
    </div>
  );
};

export default Card;
