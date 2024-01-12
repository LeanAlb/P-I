import React from "react";
import SearchBar from "../Searchbar/Searchbar";
import style from './HomePage.module.css'
import Cards from "../Cards/Cards";



const HomePage=()=>{
    return(
        <div className={style.home}>
            <SearchBar/>
        </div>
    )
}

export default HomePage;