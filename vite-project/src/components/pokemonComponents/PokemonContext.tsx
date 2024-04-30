import React, {useContext, useEffect, useState, createContext} from 'react'
import { Pokemon } from '../../models/Pokemon';


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

// interface Pokemon {
//     // From PokeAPI
//     name: string
//     types: {type : {name: string} } []
//     abilities : {ability : {name: string , url: string} } []
//     moves: {move: {name: string} } []
//     stats: {base_stat: number, effort : number, stat: {name: string} } []
//     sprites: {front_default : string, front_shiny : string }
//     // user defined based off interaction with user
//     nature: string
//     teraType: string
//     ivs: {
//         hp: number
//         attack: number
//         defense: number
//         special_attack: number
//         special_defense: number
//         speed: number
//     }
//     evs: {
//         hp: number
//         attack: number
//         defense: number
//         special_attack: number
//         special_defense: number
//         speed: number
//     }
//     level: number
//     moveSet: string[]
// }

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