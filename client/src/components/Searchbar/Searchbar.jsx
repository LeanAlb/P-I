import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from './SearchBar.module.css';

const SearchBar = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setName(event.target.value);
    }

    const handleSearch = () => {
        // Realiza la redirección a la ruta específica
        navigate(`/pokemons/${name}`);
    }

    return (
        <div>
            <input type="text" value={name} onChange={handleChange} className={style.bar} />
            <button onClick={handleSearch}>Buscar</button>
        </div>
    )
}

export default SearchBar;
