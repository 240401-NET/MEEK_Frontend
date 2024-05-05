import React , {createContext, useState, useContext, useEffect} from 'react'
import { Nature } from '../models/Pokemon'
import { usePokemonData } from './PokemonDataContext'

interface NatureContextType {
    nature: string,
    natureData: Nature[],
    handleSelectedNature: (naturename: string) => void
}

interface Props {
    children: React.ReactNode
}

const NatureContext = createContext<NatureContextType>({
    nature: '',
    natureData: [],
    handleSelectedNature: () => {}
})

export const useNatureContext = () => {
    const _context = useContext(NatureContext);
    if (!_context) {
        throw new Error("useNature must be used within a pokemon provider");
    }
    return _context;
}

export const NatureProvider : React.FC<Props> = ({children}) => {
    const {pokemonData} = usePokemonData()
    
    
    const natureData : Nature[] = [
        { name: 'Adamant', increasedStat: 'attack', decreasedStat: 'special-attack' },
        { name: 'Bashful', increasedStat: 'none', decreasedStat: 'none' },
        { name: 'Bold', increasedStat: 'defense', decreasedStat: 'attack' },
        { name: 'Brave', increasedStat: 'attack', decreasedStat: 'speed' },
        { name: 'Calm', increasedStat: 'special-defense', decreasedStat: 'attack' },
        { name: 'Careful', increasedStat: 'special-defense', decreasedStat: 'special-attack' },
        { name: 'Docile', increasedStat: 'none', decreasedStat: 'none' },
        { name: 'Gentle', increasedStat: 'special-defense', decreasedStat: 'defense' },
        { name: 'Hardy', increasedStat: 'none', decreasedStat: 'none' },
        { name: 'Hasty', increasedStat: 'speed', decreasedStat: 'defense' },
        { name: 'Impish', increasedStat: 'defense', decreasedStat: 'special-attack' },
        { name: 'Jolly', increasedStat: 'speed', decreasedStat: 'special-attack' },
        { name: 'Lax', increasedStat: 'defense', decreasedStat: 'special-defense' },
        { name: 'Lonely', increasedStat: 'attack', decreasedStat: 'defense' },
        { name: 'Mild', increasedStat: 'special-attack', decreasedStat: 'defense' },
        { name: 'Modest', increasedStat: 'special-attack', decreasedStat: 'attack' },
        { name: 'Naive', increasedStat: 'speed', decreasedStat: 'special-defense' },
        { name: 'Naughty', increasedStat: 'attack', decreasedStat: 'special-defense' },
        { name: 'Quiet', increasedStat: 'special-attack', decreasedStat: 'speed' },
        { name: 'Quirky', increasedStat: 'none', decreasedStat: 'none' },
        { name: 'Rash', increasedStat: 'special attack', decreasedStat: 'special defense' },
        { name: 'Relaxed', increasedStat: 'defense', decreasedStat: 'speed' },
        { name: 'Sassy', increasedStat: 'special defense', decreasedStat: 'speed' },
        { name: 'Serious', increasedStat: 'none', decreasedStat: 'none' },
        { name: 'Timid', increasedStat: 'speed', decreasedStat: 'attack' },
    ]
    
    const [nature, setNature] = useState(natureData[1].name);

    useEffect(() =>{
        if(pokemonData) {
            LoadNature()
        }
    }, [pokemonData])

    const LoadNature = () => {
        setNature(natureData[1].name)
    }

    const handleSelectedNature = (natureName: string) => {
        setNature(natureName);
    }

    return (
        <NatureContext.Provider value = {{nature, natureData, handleSelectedNature}}>
            {children}
        </NatureContext.Provider>
    )
}

export const useNature = () => useContext(NatureContext);