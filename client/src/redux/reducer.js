import { showPokemons } from "./actions";

const initialState = {
  allPokemons: [],
  allPokemonsBackUp: [],  // Agregado el array de respaldo
  currentPage: 0,
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

      // Copiar el array antes de aplicar splice
      const allPokemonsCopy = [...state.allPokemonsBackUp];

      return {
        ...state,
        allPokemons: allPokemonsCopy.splice(firstIndex, itemsPerPage),
        currentPage: actions.payload === "next" ? nextPage : prevPage,
      };

    default:
      return { ...state };
  }
};

export default reducer;
