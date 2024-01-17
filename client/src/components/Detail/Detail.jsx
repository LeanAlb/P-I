import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showPokemons } from '../../redux/actions'
import style from './Detail.module.css'
import { Link } from 'react-router-dom'




const Detail = () => {
    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.allPokemons)
    const { name } = useParams();
    const [pokemon, setPokemon] = useState({});
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        axios(`http://localhost:3001/pokemons/${name}`).then(
            ({ data }) => {
                if (data.name) {
                    setPokemon(data)
                } else {
                    window.alert('No hay pokemons con ese nombre')
                }
            }
        );
        return setPokemon({});
    }, [name])

    useEffect(() => {
        const fetchPokemonImage = async () => {
            const pokemonData = allPokemons.find((pokemon) => pokemon.name === name);

            if (pokemonData && pokemonData.url) {
                try {
                    const response = await axios.get(pokemonData.url);
                    if (response.data.sprites && response.data.sprites.other.dream_world.front_default) {
                        setImageUrl(response.data.sprites.other.dream_world.front_default);
                    }
                } catch (error) {
                    console.error('Error al cargar la imagen del Pokémon:', error);
                }
            }
        };

        if (!allPokemons.length) {
            dispatch(showPokemons()).then(() => {
                fetchPokemonImage();
            });
        } else {
            fetchPokemonImage();
        }
    }, [dispatch, allPokemons, name]);

    return (
        <div className={style.detail}>
            <article className={style.card}>
                {imageUrl !== '' && <img src={imageUrl} alt={name} />}
                <h2>Nombre: {pokemon.name}</h2>
                <h2>ID: {pokemon.id}</h2>
                <h2>
                    Vida:
                    {pokemon.stats &&
                        Array.isArray(pokemon.stats) &&
                        pokemon.stats.map((statsData) => {
                            if (statsData.stat.name === "hp") {
                                const vida = statsData.base_stat;
                                return (
                                    <span key={statsData.stat.name}>{vida}</span>
                                );
                            }
                            return null;
                        })}
                </h2>
                <h2>
                    Ataque:
                    {pokemon.stats &&
                        Array.isArray(pokemon.stats) &&
                        pokemon.stats.map((statsData) => {
                            if (statsData.stat.name === "attack") {
                                const ataque = statsData.base_stat;
                                return (
                                    <span key={statsData.stat.name}>{ataque}</span>
                                );
                            }
                            return null;
                        })}
                </h2>
                <h2>
                    Defensa:
                    {pokemon.stats &&
                        Array.isArray(pokemon.stats) &&
                        pokemon.stats.map((statsData) => {
                            if (statsData.stat.name === "defense") {
                                const defensa = statsData.base_stat;
                                return (
                                    <span key={statsData.stat.name}>{defensa}</span>
                                );
                            }
                            return null;
                        })}
                </h2>
                <h2>Tipo:</h2>
                <ul>
                    {pokemon.types &&
                        Array.isArray(pokemon.types) &&
                        pokemon.types.map((typeData) => (
                            <li key={typeData.type.name}>{typeData.type.name}</li>
                        ))}
                </ul>
            </article>
            <Link to={'/home'}><button>Home</button></Link>
        </div>
    )
}


export default Detail