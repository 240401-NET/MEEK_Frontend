import React from 'react'
import { useSprite } from '../context/Spritecontext'
import { usePokemonData } from '../context/PokemonDataContext';

const SpriteComponent : React.FC = () => {
    const {pokemonData} = usePokemonData();
    const {sprite, handleSprite, handleShiny} = useSprite();

    return (
        <>
            <div>
                <h3>Select a Sprite:</h3>
                <img 
                    src={sprite || ''}
                    alt="Pokemon Sprite" 
                />
            <button onClick={() => {handleSprite(pokemonData!.sprites.front_default), handleShiny()}}>Default</button>
            <button onClick={() => {handleSprite(pokemonData!.sprites.front_shiny), handleShiny()}}>Shiny</button>
            </div>
        </>
    )
}

export default SpriteComponent