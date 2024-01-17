import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from './SearchBar.module.css';
import { Link } from "react-router-dom";

const SearchBar = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setName(event.target.value);
    }

    const handleSearch = () => {
        navigate(`/pokemons/${name}`);
    }

    return (
        <div>
            <input type="text" value={name} onChange={handleChange} className={style.bar} />
            <button onClick={handleSearch}>Buscar</button>
            <Link to={'/pokemons'}><button>Crear Pokemon</button></Link>
        </div>
    )
}

export default SearchBar;
