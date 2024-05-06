import React, {useState, useContext, useEffect, createContext} from 'react';
import { PokemonTeam } from '../models/Pokemon';
import { usePokemonData } from './PokemonDataContext';

interface SavePokemonContextType {
    savedPokemonTeam : PokemonTeam,
    editMode: boolean,
    teamName: string,
    rosterOrder: number,
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
    setSavedPokemonTeam: React.Dispatch<React.SetStateAction<PokemonTeam>>,
    setTeamName: React.Dispatch<React.SetStateAction<string>>,
    setRosterOrder: React.Dispatch<React.SetStateAction<number>>,
}

interface Props {
    children: React.ReactNode
}

const initialSavedPokemonTeam : PokemonTeam = {
    id: undefined,
    name: '',
    trainerId: undefined,
    pokemonTeamMembers: []
}
export const SavePokemonContext = createContext<SavePokemonContextType>({
    savedPokemonTeam : initialSavedPokemonTeam,
    editMode: false,
    teamName: "",
    rosterOrder: 0,
    setEditMode: () => {},
    setSavedPokemonTeam: () => {},
    setTeamName: () => {},
    setRosterOrder: () => {}
});

export const useSaveContext = () => {
    const _context = useContext(SavePokemonContext);
    if (!_context) {
        throw new Error("useSavePokemonContext must be used within a pokemon provider");
    }
    return _context;
}

export const SavePokemonProvider : React.FC<Props> = ( {children} ) => {
    const {pokemonData} = usePokemonData();
    const [savedPokemonTeam, setSavedPokemonTeam] = useState<PokemonTeam>(initialSavedPokemonTeam)
    const [editMode, setEditMode] = useState<boolean>(false);
    const [teamName, setTeamName] = useState<string>('');
    const [rosterOrder, setRosterOrder] = useState<number>(0);

    useEffect(() => {
        const savedTeam = localStorage.getItem('savedPokemonTeam')
        if(savedTeam) { 
            setSavedPokemonTeam(JSON.parse(savedTeam))
        } else {
            console.log("no saved teams available")
        }
    },[])

    return (
        <SavePokemonContext.Provider value = {{savedPokemonTeam, setSavedPokemonTeam, editMode, setEditMode, teamName, setTeamName, rosterOrder, setRosterOrder }}>
            {children}
        </SavePokemonContext.Provider>
    )
}

export const useSavePokemon = () => useContext(SavePokemonContext);