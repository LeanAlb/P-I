import Card from "../Card/Card";
import style from './Cards.module.css'

const Cards=({pokemons})=>{
    return(
        <div className={style.cards}>
            {
                pokemons.map((pokemons)=>{
                    return <Card
                    key={pokemons.id}
                    id={pokemons.id}
                    nombre={pokemons.name}
                    // image={pokemons.image && pokemons.image.url}
                    />
                })
            }
        </div>
    )
}

export default Cards;