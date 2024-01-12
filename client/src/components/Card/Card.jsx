import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import { showPokemons } from '../../redux/actions'
import style from './Card.module.css'


const Card=({id, name, imagen})=>{
    const dispatch=useDispatch()
    const allPokemons=useSelector((state)=>state.allPokemons)
    useEffect(()=>{
        if(!allPokemons.length){
            dispatch(showPokemons())
        }
    },[])
    return(
        <div>
            <Link to={`/pokemons/${id}`}>
                <button>
                    <h3>Nombre: {name}</h3>
                    <h3>id: {id}</h3>
                    {/* <img src={imagen} alt={nombre} /> */}
                </button>
            </Link>
        </div>
    )
}


export default Card;