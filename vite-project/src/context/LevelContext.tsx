import React, {useState, useContext, useEffect, createContext} from 'react';
import { usePokemonData } from "./PokemonDataContext";

interface LevelContextType {
    level : number,
    handleLevelSelect: (level: number) => void
}

interface Props {
    children: React.ReactNode
}

const LevelContext = createContext<LevelContextType>({
    level: 50,
    handleLevelSelect: () => {}
})

export const useLevelContext = () => {
    const _context = useContext(LevelContext);
    if (!_context) {
        throw new Error("useLevelContext must be used within a level provider");
    }
    return _context;
}

export const LevelProvider : React.FC<Props> = ({children}) => {
    const {pokemonData} = usePokemonData();
    const [level, setLevel] = useState(50);

    useEffect(() =>{
        if(pokemonData) {
            LoadLevel()
        }
    }, [pokemonData])

    const LoadLevel = () => {
        setLevel(50);
    }

    const handleLevelSelect = (level: number) => {
        setLevel(level);
    }

    return (
        <LevelContext.Provider value = {{level, handleLevelSelect}}>
            {children}
        </LevelContext.Provider>
    )
}

export const useLevel = () => useContext(LevelContext);