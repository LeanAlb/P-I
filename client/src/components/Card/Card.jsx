import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import React, { useEffect } from 'react';
import { showPokemons } from '../../redux/actions'
import style from './Card.module.css'


const Card=({nombre, id, imagen})=>{

    const dispatch=useDispatch()
    const allPokemons=useSelector((state)=>state.allPokemons)
    useEffect(()=>{
        if(!allPokemons.length){
            dispatch(showPokemons())
        }
    },[])
    if(!allPokemons.length){
        return(
            <div>
                ...Cargando
            </div>
        )
    }
    return(
        <div>
            <h3>Nombre: {nombre}</h3>
            <h3>ID: {id}</h3>
            <img src={imagen} alt={nombre}/>
            
        </div>
    )
}


export default Card;