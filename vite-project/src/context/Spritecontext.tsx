import { Sprite } from "../models/Pokemon";
import React, {useState, useContext, useEffect, createContext} from 'react';
import { usePokemonData } from "./PokemonDataContext";

interface SpriteContextType {
    sprites: Sprite | null,
    sprite: string,
    shiny: boolean,
    handleSprite: (spriteURL: string) => void,
    handleShiny: () => void
}

interface Props {
    children: React.ReactNode
}
const SpritesContext = createContext<SpriteContextType>({} as SpriteContextType);

export const useSpritesContext = () => {
    const _context = useContext(SpritesContext);
    if (_context) {
        throw new Error("useSprite must be used within a pokemon provider");
    }
    return _context;
}

export const SpritesProvider :  React.FC<Props> = ({children}) => {
    const {pokemonData} = usePokemonData();
    const [sprite, setSprite] = useState<string>(pokemonData?.sprites.front_default!)
    const [sprites, setSprites] = useState<Sprite | null>(null);
    const [shiny, setShiny] = useState<boolean>(false);

    useEffect (() => {
        loadSprite (); 
    }, [pokemonData])

    const loadSprite = () => {
        if (pokemonData) {
            setSprites(pokemonData.sprites);
            setSprite(pokemonData.sprites.front_default)
            setShiny(false);
        }
    }

    const handleSprite = (spriteURL : string) => {
        setSprite(spriteURL);
    }
    
    const handleShiny = () => {
        if(sprite === pokemonData?.sprites.front_shiny) {
            setShiny(true);
        }
        else {
            setShiny(false);
        }
    }

    return (
        <SpritesContext.Provider value = {{sprites, shiny, sprite, handleSprite, handleShiny}}>
            {children}
        </SpritesContext.Provider>
    )
}

export const useSprite = () => useContext(SpritesContext);