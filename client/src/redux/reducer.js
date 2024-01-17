import { showPokemons } from "./actions";

const initialState = {
  allPokemons: [],
  allPokemonsBackUp: [],  
  currentPage: 0,
  typeFiltered: []
};

const reducer = (state = initialState, actions) => {
  const itemsPerPage = 12;
  switch (actions.type) {
    case "SHOW_POKEMONS":
      return {
        ...state,
        allPokemons: [...actions.payload].splice(0, itemsPerPage),
        allPokemonsBackUp: actions.payload,
      };
    case "PAGINATION":
      const nextPage = state.currentPage + 1;
      const prevPage = state.currentPage - 1;
      const firstIndex =
        actions.payload === "next" ? nextPage * itemsPerPage : prevPage * itemsPerPage;

      const allPokemonsCopy = [...state.allPokemonsBackUp];
      if (actions.payload ==="next" && firstIndex>= state.allPokemonsBackUp.length)return state;
      if (actions.payload ==="prev" && prevPage<0) return state;
      return {
        ...state,
        allPokemons: allPokemonsCopy.splice(firstIndex, itemsPerPage),
        currentPage: actions.payload === "next" ? nextPage : prevPage,
      };
    case "SELECTOR":
      if(actions.payload=== "normal"){}
      if(actions.payload=== "poison"){}
      if(actions.payload=== "bug"){}
      if(actions.payload=== "fire"){}
      if(actions.payload=== "electric"){}
      if(actions.payload=== "dragon"){}
      if(actions.payload=== "fighting"){}
      if(actions.payload=== "ground"){}
      if(actions.payload=== "ghost"){}
      if(actions.payload=== "water"){}
      if(actions.payload=== "psychic"){}
      if(actions.payload=== "dark"){}
      if(actions.payload=== "shadow"){}
      if(actions.payload=== "flying"){}
      if(actions.payload=== "rock"){}
      if(actions.payload=== "steel"){}
      if(actions.payload=== "grass"){}
      if(actions.payload=== "ice"){}
      if(actions.payload=== "fairy"){}
      if(actions.payload=== "unknown"){}
      return{
        ...state,
        
      }

    default:
      return { ...state };
  }
};

export default reducer;
