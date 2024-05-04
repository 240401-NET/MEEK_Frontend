copy and paste this code over the top of the code from on PokemonTeamBuilder.tsx:
copy this code and paste over everything before "const clearPageData()"

import React, { useEffect, useState} from 'react'
import { Pokemon } from '../models/Pokemon'
import { fetchPokemonDataFromAPI } from '../models/PokemonAPICall'
import { PokemonTeam } from '../models/PokemonTeamsInterface';
import TeraTypeSelector from '../components/pokemonComponents/TeraTypeSelector';
import AbilitiesSelector from '../components/pokemonComponents/AbilitiesSelector';
import MoveSlotSelector from '../components/pokemonComponents/MoveSlotSelector';
import {PokemonNatureSelector} from '../components/pokemonComponents/PokemonNature';
import LevelSelector from '../components/pokemonComponents/PokemonLevel';
import PokemonIVEVRenderer from '../components/pokemonComponents/PokemonIVEVS';
import { NavLink as Link } from 'react-router-dom';
import './PokemonTeamBuilder.css'
// import SpriteSelector from '../components/pokemonComponents/SpriteSelector';

const PokemonTeamBuilder: React.FC = () => {
    const [pokemonData , setPokemonData] = useState<Pokemon | null>(null)
    const [seaerchedPokemon, setSearchedPokemon] = useState<string>('')
    const [selectedSprite, setSelectedSprite] = useState<string>('')
    const [savedPokemonTeam, setSavedPokemonTeam] = useState<PokemonTeam| null>(()=> {
        const savedTeam = localStorage.getItem('savedPokemonTeam');
        return savedTeam ? JSON.parse(savedTeam) : null;
    })
    const [selectedTeraType, setSelectedTeraType] = useState('');
    const [editMode, setEditMode] = useState<boolean>(false)
    const [pokemonID, setPokemonID] = useState<string>('')
    const [ability, setAbility] = useState('')
    const [move1, setMove1] = useState('')
    const [move2, setMove2] = useState('')
    const [move3, setMove3] = useState('')
    const [move4, setMove4] = useState('')
    const [currentNature, setCurrentNature] = useState('')
    const [currentLevel, setCurrentLevel] = useState(50)
    // const [currentIVs, setCurrentIVs] = useState<Record<string, number>>({})
    const [currentIVs, setCurrentIVs] = useState<{ hp?: number; attack?: number; defense?: number; special_attack?: number; special_defense?: number; speed?: number}>({})
    // const [evs, setEVS] = useState<Record<string, number>>({})

    useEffect(() =>{
        const savedTeam = localStorage.getItem('savedPokemonTeam')
        if(savedTeam)
            {
                setSavedPokemonTeam(JSON.parse(savedTeam))
            }
    }, [])

    const pokemonSearch = async (pokemonName : string) => {
        try {
            const responseData = await fetchPokemonDataFromAPI(pokemonName);
            setPokemonData(responseData);
            setSelectedSprite(responseData.sprites.front_default);
        } catch (error) {
            console.log("Can't find pokemon", error)
        }

    }
    const handleSearch = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Prevent default form submission or button click behavior
        pokemonSearch(seaerchedPokemon);   
    };

    const handleSpriteSelect = (spriteUrl :string) => {
        setSelectedSprite(spriteUrl);
    }



- then paste this into in the form section where it says on submit:
handleSearch