const postPokemon = require("./postPokemon.js");
const { Pokemon, Type } = require("../db.js");


const postPokemonHandler = async (req, res) => {

  const { name, image, life, attack, defense, types } =
    req.body;

  if (!name || !image || !life || !attack || !defense || !types) {
    
    return res.status(400).send("Informacion invalida");
  }

  try {
    const newPokemon = await postPokemon({
      name,
      image,
      life,
      attack,
      defense,
      types,
    });

    const createdPokemon = await Pokemon.findByPk(newPokemon.id, {
      include: Type,
    });

    const filteredType = {
      ...createdPokemon.toJSON(),
      types: createdPokemon.types.map((type) => type.name),
    };

    res.status(200).json(filteredType);
  } catch (error) {
    console.log("Error:", error);
    if (error.message === "Ya hay un Pokemon con este nombre") {
      res.status(400).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }

};

module.exports = {postPokemonHandler};