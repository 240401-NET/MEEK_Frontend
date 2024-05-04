import React, { createContext , useContext, useState} from "react";
import { Pokemon } from "../models/Pokemon";
import { fetchPokemonDataFromAPI } from "../models/PokemonAPICall";

interface PokemonDataContextType {
    pokemonData: Pokemon | null,
    fetchPokemonApiData: (pokemonName: string) => void,
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
    return (
        <PokemonDataContext.Provider value={{pokemonData, fetchPokemonApiData}}>
            {children}
        </PokemonDataContext.Provider>
    )
}

export const usePokemonData = () => useContext(PokemonDataContext);