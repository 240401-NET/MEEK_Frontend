import React, {useContext, useEffect, useState, createContext} from 'react'

interface PokemonContextType {
    pokemonData: Record<string, Pokemon | null>;
    setSearchPokemon : (name: string, data: Pokemon) => void;
    clearSearchPokemon: (name:string) => void;
}

interface Props {
    children: React.ReactNode
}

const PokemonContext = createContext<PokemonContextType>({
    pokemonData: {},
    setSearchPokemon: () => {},
    clearSearchPokemon: () => {}    
});

const usePokemonContext = () => useContext(PokemonContext);

interface Pokemon {
    // From PokeAPI
    name: string
    types: {type : {name: string} } []
    abilities : {ability : {name: string , url: string} } []
    moves: {move: {name: string} } []
    stats: {base_stat: number, effort : number, stat: {name: string} } []
    sprites: {front_default : string, front_shiny : string }
    // user defined based off interaction with user
    nature: string
    teraType: string
    ivs: {
        hp: number
        attack: number
        defense: number
        special_attack: number
        special_defense: number
        speed: number
    }
    evs: {
        hp: number
        attack: number
        defense: number
        special_attack: number
        special_defense: number
        speed: number
    }
    level: number
    moveSet: string[]
}

const PokemonDataProvider : React.FC<Props> = ({children}) => {
    const [pokemonData, setPokemonData] = useState<Record<string, Pokemon | null>>({});

    useEffect(() =>{
        const saveData = localStorage.getItem('pokemonData');
        if(saveData) {
            setPokemonData(JSON.parse(saveData));
        }
    }, [])

    useEffect(() =>{
        localStorage.setItem('pokemonData', JSON.stringify(pokemonData))
    }, [pokemonData])

    const setSearchPokemon = (name: string, data: Pokemon) => {
        setPokemonData((preData) => ({...preData, [name]: data}));
    }

    const clearSearchPokemon = (name: string) =>{
        setPokemonData((preData) => {
            const updatedData = {...preData};
            delete updatedData[name];
            return updatedData;
        });
    };

    return (
        <PokemonContext.Provider value= {{pokemonData, setSearchPokemon, clearSearchPokemon}}>
            {children}
        </PokemonContext.Provider>
    )
}

export { PokemonDataProvider, usePokemonContext }