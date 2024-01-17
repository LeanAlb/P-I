import { useDispatch } from "react-redux";
import Card from "../Card/Card";
import style from './Cards.module.css';
import { useEffect } from "react";

const Cards = ({ pokemons }) => {
  return (
    <div className={style.cards}>
      {pokemons.map((pokemon) => {
        // Extraer el ID del final de la URL
        const urlParts = pokemon.url.split("/");
        const id = urlParts[urlParts.length - 2];

        return (
          <Card
            key={id}
            nombre={pokemon.name}
            id={id}
          />
        );
      })}
    </div>
  );
};

export default Cards;
