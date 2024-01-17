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

  const filter=(event)=>{
    dispatch(typeSelector(event.target.value))
  }

  return (
    <div className={style.home}>
      <SearchBar />
      <div className={style.typeSelector}>
        <span className={style.typeLabel}>Tipo:</span>
        <select name="tipos" id="tipo" defaultValue="-" className={style.tipoSelector}>
          <option value="-">-</option>
          <option value="normal" onClick={filter}>Normal</option>
          <option value="poison" onClick={filter}>Veneno</option>
          <option value="bug" onClick={filter}>Insecto</option>
          <option value="fire" onClick={filter}>Fuego</option>
          <option value="electric" onClick={filter}>Electricidad</option>
          <option value="dragon" onClick={filter}>Dragon</option>
          <option value="fighting" onClick={filter}>Pelea</option>
          <option value="ground" onClick={filter}>Tierra</option>
          <option value="ghost" onClick={filter}>Fantasma</option>
          <option value="water" onClick={filter}>Agua</option>
          <option value="psychic" onClick={filter}>Psiquico</option>
          <option value="dark" onClick={filter}>Oscuridad</option>
          <option value="shadow" onClick={filter}>Sombra</option>
          <option value="flying" onClick={filter}>Volador</option>
          <option value="rock" onClick={filter}>Piedra</option>
          <option value="steel" onClick={filter}>Acero</option>
          <option value="grass" onClick={filter}>Hierba</option>
          <option value="ice">Hielo</option>
          <option value="fairy" onClick={filter}>Hada</option>
          <option value="unknown" onClick={filter}>Desconocido</option>
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
