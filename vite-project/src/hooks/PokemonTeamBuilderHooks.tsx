import {useState, useEffect} from 'react'
import { Pokemon, PokemonTeam, PokemonTeamMember } from '../models/Pokemon'
import { fetchPokemonDataFromAPI } from '../models/PokemonAPICall'


export const usePokemonTeamBuilderHooks = () => {
    
    const [selectedSprite, setSelectedSprite] = useState<string>('')
    const [savedPokemonTeam, setSavedPokemonTeam] = useState<PokemonTeam| null>(()=> {const savedTeam = localStorage.getItem('savedPokemonTeam'); return savedTeam ? JSON.parse(savedTeam) : null;})
    const [selectedTeraType, setSelectedTeraType] = useState('');
    const [editMode, setEditMode] = useState<boolean>(false)
    const [pokemonID, setPokemonID] = useState<string>('')
    const [ability, setAbility] = useState('')
    const [moves, setMoves] = useState<string[]>(['', '', '', '']);
    const [currentNature, setCurrentNature] = useState('')
    const [currentLevel, setCurrentLevel] = useState(50)
    const [selectedGender, setSelectedGender] = useState<string>('Random'); // New state for selected gender

}

export const usePokemonApiSearch = () => {
    const [pokemonData , setPokemonData] = useState<Pokemon | null>(null);
    const [searchedPokemon, setSearchedPokemon] = useState<string>('');
    const [selectedSprite, setSelectedSprite] = useState<string>("");
    const fetchPokemon = async (pokemonName: string) => {
        try {
            const responseData = await fetchPokemonDataFromAPI(pokemonName);
            setPokemonData(responseData);
            setSelectedSprite(responseData.sprites.front_default)
        } catch (error) {
            console.log("Can't find pokemon", error)
        }
        
    }
    useEffect(() => {
        if (pokemonData !== null) {
            console.log('Pokemon data:', pokemonData);
        }
    }, [pokemonData]);
    const handleSearch = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Prevent default form submission or button click behavior
        fetchPokemon(searchedPokemon);   
    };

    return { pokemonData , fetchPokemon, setSearchedPokemon, searchedPokemon, handleSearch, selectedSprite}
}

export const chooseSprite = () => {

}