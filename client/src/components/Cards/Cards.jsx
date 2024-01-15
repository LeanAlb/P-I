import Card from "../Card/Card";
import style from './Cards.module.css'

const Cards=({pokemons})=>{
    console.log(pokemons, 'results desde cards')
    return(
        <div className={style.cards}>
            {
                pokemons.map((pokemon, index)=>{
                    return <Card
                    key={index}
                    id={index+1}
                    nombre={pokemon.name}
                    imagen={pokemon.url}
                    // image={pokemons.image && pokemons.image.url}
                    />
                })
            }
        </div>
    )
}

export default Cards;