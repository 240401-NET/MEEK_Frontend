import React, {useContext, useEffect, useState, createContext} from 'react';
import { Pokemon } from '../../models/Pokemon';
// import './PokemonTeamBuilder.css';


interface PokemonContextType {
    pokemonData: Record<string,Pokemon | null>
    setSearchPokemon : (name: string, data: Pokemon | null) => void
}

interface Props {
    children: React.ReactNode
}

const PokemonContext = createContext<PokemonContextType>({
    pokemonData: {},
    setSearchPokemon: () => {},
  
});

const usePokemonContext = () => useContext(PokemonContext);


const PokemonDataProvider : React.FC<Props> = ({children}) => {
    const [pokemonData, setPokemonData] = useState<Record<string, Pokemon | null>>({});

    // on page load, go into local storage get any item that says pokemondata, parse that information
    useEffect(() =>{
        const saveData = localStorage.getItem('pokemonData');
        if(saveData) {
            setPokemonData(JSON.parse(saveData));
        }
    }, [])

    // when there are changes to pokemon data, go into local storage, find a key value pair with pokemondata, and change the value to
    // changed pokemondata
    useEffect(() =>{
        localStorage.setItem('pokemonData', JSON.stringify(pokemonData))
    }, [pokemonData])

    const setSearchPokemon = (name: string, data: Pokemon | null) => {
        setPokemonData((preData) => ({...preData, [name] : data}));
        
    }
    
    return (
        <PokemonContext.Provider value = {{pokemonData, setSearchPokemon}}>
            {children}
        </PokemonContext.Provider>
    )
}

export { PokemonDataProvider, usePokemonContext }