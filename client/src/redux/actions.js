import axios from 'axios';

export const showPokemons=()=>{
    return async (dispatch)=>{
        try {
            const {data}=await axios('http://localhost:3001/pokemons')
            dispatch({
                type: "SHOW_POKEMONS",
                payload: data
            })
        }catch (error){
            throw Error ('No se han encontrado pokemons')
        }
    }
};