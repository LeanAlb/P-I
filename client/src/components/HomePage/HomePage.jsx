import React from "react";
import SearchBar from "../Searchbar/Searchbar";
import style from './HomePage.module.css'
import Cards from "../Cards/Cards";
import { useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import { showPokemons } from "../../redux/actions";



const HomePage=()=>{
    // const dispatch=useDispatch()
    // const allPokemons=useSelector((state)=>state.allPokemons)

    // // useEffect(()=>{
    // //     if(!allPokemons.length){
    // //         dispatch(showPokemons())
    // //     }
    // // },[])
    // if(!allPokemons.length){
    //     return (
    //         <div>
    //         Cargando...
    //     </div>
    //     )
    // }
    return(
        <div className={style.home}>
            <SearchBar/>
            {/* <Cards pokemons={allPokemons}/> */}
        </div>
    )
}

export default HomePage;