import { showPokemons } from "./actions";

const initialState={
    allPokemons:[],
    pokemonByName:[],
    pokemonDetail: []
}

const reducer=(state=initialState, actions)=>{
    switch(actions.type){
        case "SHOW_POKEMONS":
            return {
                ...state,
                allPokemons: actions.payload
            }
        default: return {...state}
    }
}

export default reducer;