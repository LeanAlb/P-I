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

export const changePage=(order)=>{
    return async (dispatch)=>{
        try {
           dispatch({
            type: "PAGINATION",
            payload: order
           }) 
        } catch (error) {
            throw Error('Error al paginar')
        }
    }
}
// En tu archivo de acciones (actions.js)
export const typeSelector = (selectedType) => ({
    type: "TYPE_SELECTOR",
    payload: selectedType,
  });
  

