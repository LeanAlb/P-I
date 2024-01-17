// reducer.js
import { showPokemons } from "./actions";

const initialState = {
  allPokemons: [],
  allPokemonsBackUp: [],
  currentPage: 0,
  typeFiltered: [],
  newPokemon: {
    name: '',
    image: '',
    life: 0,
    attack: 0,
    defense: 0,
    types: '',
  },
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
      if (actions.payload === "next" && firstIndex >= state.allPokemonsBackUp.length) return state;
      if (actions.payload === "prev" && prevPage < 0) return state;
      return {
        ...state,
        allPokemons: allPokemonsCopy.splice(firstIndex, itemsPerPage),
        currentPage: actions.payload === "next" ? nextPage : prevPage,
      };
      case "SELECTOR":
        return {
          ...state,
          typeFiltered: actions.payload === "all" ? [] : [actions.payload], // Puede variar según la estructura de tu estado
        };
    case "CREATE_POKEMON":
      
      return {
        ...state,
        
        allPokemonsBackUp: [...state.allPokemonsBackUp, actions.payload],
        
        allPokemons: state.typeFiltered.length
          ? state.allPokemons.filter((pokemon) =>
              pokemon.types.some((type) => state.typeFiltered.includes(type))
            )
          : state.allPokemons,
      };
    case "UPDATE_NEW_POKEMON":
      return {
        ...state,
        newPokemon: {
          ...state.newPokemon,
          ...actions.payload,
        },
      };

    default:
      return { ...state };
  }
};

export default reducer;
