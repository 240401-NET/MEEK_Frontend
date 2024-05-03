import React , {useState, useEffect} from 'react';
import '../../pages/PokemonTeamBuilder.css';

interface Props {
    sprites: {front_default : string, front_shiny : string }
}

const SpriteSelector : React.FC<Props> = ({ sprites }) => {
    const [selectedSprite, setSelectedSprite] = useState<"front_default" | "front_shiny">("front_default")

    const handlePokemonSpriteSelection = (sprite: "front_default" | "front_shiny") => {
        setSelectedSprite(sprite);
    }

    useEffect(() => {
        setSelectedSprite("front_default")
    },[sprites])

    return (
        <div>
            {sprites[selectedSprite] ? (
                <img src={sprites[selectedSprite]} alt="" />
            ) : (
                <p>no sprite available</p>
            )}
        <label>
            <input 
                type="radio"
                value="front_default"
                checked={selectedSprite === "front_default"}
                onChange={() => handlePokemonSpriteSelection("front_default")} 
                />
                Defualt
        </label>
        <label>
            <input 
                type="radio"
                value="front_shiny"
                checked={selectedSprite === "front_shiny"}
                onChange={() => handlePokemonSpriteSelection("front_shiny")} 
                />
                Shiny
        </label>
    </div>
    )
}

export default SpriteSelector