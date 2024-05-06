import React, { createContext , useContext, useState} from "react";
import { Pokemon } from "../models/Pokemon";
import { fetchPokemonDataFromAPI } from "../models/PokemonAPICall";

interface PokemonDataContextType {
    pokemonData: Pokemon | null,
    fetchPokemonApiData: (pokemonName: string) => void,
    handleSetPokemonData: (obj : Pokemon | null) => void
}

interface Props {
    children : React.ReactNode
}

const PokemonDataContext = createContext<PokemonDataContextType>({} as PokemonDataContextType);

export const usePokemonDataContext = () => {
    const _context = useContext(PokemonDataContext);
    if (!_context) {
        throw new Error("usePokemonDataContext must be used within a pokemon provider");
    }
    return _context;
}

export const PokemonDataProvider : React.FC<Props> = ( {children}) => {
    
    const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);

    const fetchPokemonApiData = async (pokemonName: string) => {
        try{
            const response = await fetchPokemonDataFromAPI(pokemonName);
            setPokemonData(response);
        } catch(error) {
            console.error("Error looking up Pokemon!", error);
            throw error;
        }
    }

    const handleSetPokemonData = (obj: Pokemon | null) => {
        setPokemonData(obj);
    }
    return (
        <PokemonDataContext.Provider value={{pokemonData, fetchPokemonApiData, handleSetPokemonData}}>
            {children}
        </PokemonDataContext.Provider>
    )
}

export const usePokemonData = () => useContext(PokemonDataContext);