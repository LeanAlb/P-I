import SearchBar from "../Searchbar/Searchbar";
import style from './HomePage.module.css';
import Cards from "../Cards/Cards";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { showPokemons, changePage} from "../../redux/actions";

const HomePage = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);

  useEffect(() => {
    if (!allPokemons.length) {
      dispatch(showPokemons());
    }
  }, [dispatch, allPokemons.length]);

  const pagination=(event)=>{
    dispatch(changePage(event.target.name))
  }
  

  return (
    <div className={style.home}>
      <SearchBar/>
      <Cards pokemons={allPokemons} />
      <div>
        <button onClick={pagination} name="prev">{"<<"}</button>
        <button onClick={pagination} name="next">{">>"}</button>
      </div>
    </div>
  );
}

export default HomePage;
