// HomePage.jsx
import React, { useEffect } from 'react';
import SearchBar from '../Searchbar/Searchbar';
import style from './HomePage.module.css';
import Cards from '../Cards/Cards';
import { useDispatch, useSelector } from 'react-redux';
import { showPokemons, changePage, typeSelector } from '../../redux/actions';

const HomePage = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);

  useEffect(() => {
    if (!allPokemons.length) {
      dispatch(showPokemons());
    }
  }, [dispatch, allPokemons.length]);

  const pagination = (event) => {
    dispatch(changePage(event.target.name));
  };

  const filter = (event) => {
    dispatch(typeSelector(event.target.value));
  };

  console.log(allPokemons, 'allPokemons');

  return (
    <div className={style.home}>
      <SearchBar />
      <div className={style.typeSelector}>
        <span className={style.typeLabel}>Tipo:</span>
        <select name="tipos" id="tipo" defaultValue="-" className={style.tipoSelector} onChange={filter}>
          <option value="-">-</option>
          <option value="normal">Normal</option>
          <option value="poison">Veneno</option>
          <option value="bug">Insecto</option>
          <option value="fire">Fuego</option>
          <option value="electric">Electricidad</option>
          <option value="dragon">Dragon</option>
          <option value="fighting">Pelea</option>
          <option value="ground">Tierra</option>
          <option value="ghost">Fantasma</option>
          <option value="water">Agua</option>
          <option value="psychic">Psiquico</option>
          <option value="dark">Oscuridad</option>
          <option value="shadow">Sombra</option>
          <option value="flying">Volador</option>
          <option value="rock">Piedra</option>
          <option value="steel">Acero</option>
          <option value="grass">Hierba</option>
          <option value="ice">Hielo</option>
          <option value="fairy">Hada</option>
          <option value="unknown">Desconocido</option>
        </select>
      </div>

      <Cards pokemons={allPokemons} />
      <div>
        <button onClick={pagination} name="prev">
          {"<<"}
        </button>
        <button onClick={pagination} name="next">
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default HomePage;
