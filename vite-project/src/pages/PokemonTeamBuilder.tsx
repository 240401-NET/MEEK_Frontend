import React, { useEffect, useState} from 'react'
import { Pokemon } from '../models/Pokemon'
import { fetchPokemonDataFromAPI } from '../models/PokemonAPICall'
import { PokemonTeam } from '../models/PokemonTeamsInterface';
import TeraTypeSelector from '../components/pokemonComponents/TeraTypeSelector';
import AbilitiesSelector from '../components/pokemonComponents/AbilitiesSelector';
import MoveSlotSelector from '../components/pokemonComponents/MoveSlotSelector';
import {PokemonNatureSelector} from '../components/pokemonComponents/PokemonNature';
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
        setSelectedTeraType('')
        setAbility('')
        setMove1('')
        setMove2('')
        setMove2('')
        setMove2('')
        setCurrentNature('')

    }
    
    const handleSpriteSelect = (spriteUrl :string) => {
        setSelectedSprite(spriteUrl)
    }

    const handleSavePokemon = () => {
        
        if (pokemonData ) {
            const editedPokemon = {
                id : pokemonID,
                data: pokemonData,
                sprite: selectedSprite,
                teraType: selectedTeraType,
                ability: ability,
                move_1: move1,
                move_2: move2,
                move_3: move3,
                move_4: move4,
                nature: currentNature
            }
            if (editMode && savedPokemonTeam) {
                const updatedPokemon = savedPokemonTeam?.pokemons.map((pokemon) =>
                    pokemon.id === editedPokemon.id ? 
                    {...pokemon, pokemon: editedPokemon, id: `pokemon-${pokemonData.name}-${savedPokemonTeam ? savedPokemonTeam.pokemons.length + 1 : 1}`, 
                        data: pokemonData, sprite: selectedSprite, teraType: selectedTeraType, ability : ability,
                        move_1: move1, move_2: move2, move_3: move3, move_4: move4, nature: currentNature
                        } : pokemon)
                    const updatedTeam = {
                        ...savedPokemonTeam,
                        pokemons: updatedPokemon,
                    }
                setSavedPokemonTeam(updatedTeam)
                localStorage.setItem('savedPokemonTeam', JSON.stringify(updatedTeam))
            } else {
                const newPokemon = {
                    id: `pokemon-${pokemonData.name}-${savedPokemonTeam ? savedPokemonTeam.pokemons.length + 1 : 1}`,
                    data: pokemonData,
                    sprite: selectedSprite,
                    teraType: selectedTeraType,
                    ability: ability,
                    move_1: move1,
                    move_2: move2,
                    move_3: move3,
                    move_4: move4,
                    nature: currentNature
                }
                const updatedTeam = savedPokemonTeam 
                ? {
                    ...savedPokemonTeam,
                    pokemons: [...(savedPokemonTeam.pokemons || []), newPokemon]
                }
                : {
                    pokemons: [newPokemon],
                }
                setSavedPokemonTeam(updatedTeam)
                localStorage.setItem('savedPokemonTeam', JSON.stringify(updatedTeam))
            }
            setEditMode(false)
            console.log(savedPokemonTeam)
        }
    }

    const loadPokemonOnClick = (selectedPokemon: { id: string, data: Pokemon, sprite: string, 
        teraType: string, ability :string, move_1: string, move_2: string, move_3: string, move_4: string,
        nature: string
    }) => {
        setPokemonID(selectedPokemon.id)
        setPokemonData(selectedPokemon.data)
        setSelectedSprite(selectedPokemon.sprite)
        setSelectedTeraType(selectedPokemon.teraType)
        setAbility(selectedPokemon.ability)
        setMove1(selectedPokemon.move_1)
        setMove2(selectedPokemon.move_2)
        setMove2(selectedPokemon.move_3)
        setMove2(selectedPokemon.move_4)
        setCurrentNature(selectedPokemon.nature)
        setEditMode(true);
    }

    return (
        <div>
            <form onSubmit={() =>pokemonSearch(seaerchedPokemon)}>
                <input 
                    type="text"
                    placeholder='Enter Pokemon name'
                    onChange={(e) => setSearchedPokemon(e.target.value)}
                />
                <button type='submit'>Search</button>
            </form>


            {(savedPokemonTeam && savedPokemonTeam.pokemons.length > 0) && (
                <div>
                    <h3>Saved Pokemon</h3>
                    <ul>
                        {savedPokemonTeam.pokemons.map((pokemon) =>(
                            <li key={pokemon.id} onClick={() => loadPokemonOnClick(pokemon)}>
                                {pokemon.data.name}: {pokemon.teraType}    
                            </li>

                        ))}
                    </ul>
                </div>
            )}
            {pokemonData && (
                <div>
                    <h2>{pokemonData.name}</h2>
                    <p>Type(s): {pokemonData.types.map((type) => type.type.name).join(', ')}</p>
                    <div>
                        <h3>Select a sprite:</h3>
                        <img 
                            src={selectedSprite || ''}
                            alt="Pokemon Sprite" 
                        />
                        <button onClick={() => handleSpriteSelect(pokemonData.sprites.front_default)}>Default</button>
                        <button onClick={() => handleSpriteSelect(pokemonData.sprites.front_shiny)}>Shiny</button>
                    </div>
                    <button onClick={handleSavePokemon}>Save</button>
                    <TeraTypeSelector setSelectedTeraType={setSelectedTeraType} selectedTeraType={selectedTeraType}></TeraTypeSelector>
                    <PokemonNatureSelector setCurrentNature={setCurrentNature} currentNature={currentNature}></PokemonNatureSelector>
                    <AbilitiesSelector abilityUrls={pokemonData.abilities.map(ability => ability.ability.url)} selectedAbility={ability} setSelectedAbility={setAbility}></AbilitiesSelector>
                    <MoveSlotSelector moveNames={pokemonData.moves.map((move) => move.move.name)} selectedMove={move1} setSelectedMove={setMove1}></MoveSlotSelector>
                    <MoveSlotSelector moveNames={pokemonData.moves.map((move) => move.move.name)} selectedMove={move2} setSelectedMove={setMove2}></MoveSlotSelector>
                    <MoveSlotSelector moveNames={pokemonData.moves.map((move) => move.move.name)} selectedMove={move3} setSelectedMove={setMove3}></MoveSlotSelector>
                    <MoveSlotSelector moveNames={pokemonData.moves.map((move) => move.move.name)} selectedMove={move4} setSelectedMove={setMove4}></MoveSlotSelector>
                </div>
            )}
        </div>
    )
};  


export default PokemonTeamBuilder