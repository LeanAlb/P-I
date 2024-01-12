import { useState } from "react";
import style from './SearchBar.module.css'

const SearchBar=()=>{
    const [name, setName]=useState('');
    const handleChange=(event)=>{
        setName(event.target.value);
    }

    return (
        <div>
            <input type="text" value={name} onChange={handleChange} className={style.bar}/>
            <button onClick={()=>{onSearch(name)}}>Buscar</button>
        </div>
    )
}


export default SearchBar;