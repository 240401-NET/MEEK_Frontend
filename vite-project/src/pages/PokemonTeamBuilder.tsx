import React, { useEffect, useState} from 'react'
import { Pokemon } from '../models/Pokemon'
// import { fetchPokemonDataFromAPI } from '../models/PokemonAPICall'
import { PokemonTeam } from '../models/PokemonTeamsInterface';
import TeraTypeSelector from '../components/pokemonComponents/TeraTypeSelector';
import AbilitiesSelector from '../components/pokemonComponents/AbilitiesSelector';
import MoveSlotSelector from '../components/pokemonComponents/MoveSlotSelector';
import {PokemonNatureSelector} from '../components/pokemonComponents/PokemonNature';
import LevelSelector from '../components/pokemonComponents/PokemonLevel';
import PokemonIVEVRenderer from '../components/pokemonComponents/PokemonIVEVS';
import { NavLink as Link } from 'react-router-dom';
import './PokemonTeamBuilder.css'
import { usePokemonApiSearch } from '../hooks/PokemonTeamBuilderHooks';
// import SpriteSelector from '../components/pokemonComponents/SpriteSelector';

const PokemonTeamBuilder: React.FC = () => {
    const {pokemonData, setSearchedPokemon, handleSearch} = usePokemonApiSearch();
    // const [seaerchedPokemon, setSearchedPokemon] = useState<string>('')
    const [selectedSprite, setSelectedSprite] = useState<string>('')
    const [savedPokemonTeam, setSavedPokemonTeam] = useState<PokemonTeam| null>(()=> {
        const savedTeam = localStorage.getItem('savedPokemonTeam');
        return savedTeam ? JSON.parse(savedTeam) : null;
    })
    const [selectedTeraType, setSelectedTeraType] = useState('');
    const [editMode, setEditMode] = useState<boolean>(false)
    const [pokemonID, setPokemonID] = useState<string>()
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

    const clearPageData = () => {
        // setPokemonData(null)
        setSearchedPokemon('')
        setSelectedTeraType('')
        setAbility('')
        setMove1('')
        setMove2('')
        setMove2('')
        setMove2('')
        setCurrentNature('')
        setCurrentLevel(50)
        // setEVS({})
            setCurrentIVs({
                hp:  0,
                attack: 0,
                defense:  0,
                special_attack: 0,
                special_defense: 0,
                speed: 0
                // Add other IVs as needed
              });

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
                nature: currentNature,
                level: currentLevel,
                ivs: {
                    hp: currentIVs.hp,
                    attack: currentIVs.attack,
                    defense: currentIVs.attack,
                    special_attack: currentIVs.special_attack,
                    special_defense: currentIVs.special_defense,
                    speed: currentIVs.speed
                }
            }
            if (editMode && savedPokemonTeam) {
                const updatedPokemon = savedPokemonTeam?.pokemons.map((pokemon) =>
                    pokemon.id === editedPokemon.id ? 
                    {...pokemon, pokemon: editedPokemon, id: `pokemon-${pokemonData.name}-${savedPokemonTeam ? savedPokemonTeam.pokemons.length + 1 : 1}`, 
                        data: pokemonData, sprite: selectedSprite, teraType: selectedTeraType, ability : ability,
                        move_1: move1, move_2: move2, move_3: move3, move_4: move4, nature: currentNature, level: currentLevel,
                        ivs: {hp: currentIVs.hp!, attack: currentIVs.attack!, defense: currentIVs.defense!, special_attack: currentIVs.special_attack!,
                            special_defense: currentIVs.special_defense!, speed: currentIVs.speed!
                        },
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
                    nature: currentNature,
                    level: currentLevel,
                    ivs: {
                        hp: currentIVs.hp!,
                        attack: currentIVs.attack!,
                        defense: currentIVs.attack!,
                        special_attack: currentIVs.special_attack!,
                        special_defense: currentIVs.special_defense!,
                        speed: currentIVs.speed!
                    }
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
            clearPageData();
            console.log(savedPokemonTeam)
        }
    }

    const loadPokemonOnClick = (selectedPokemon: { id: string, data: Pokemon, sprite: string, 
        teraType: string, ability :string, move_1: string, move_2: string, move_3: string, move_4: string,
        nature: string, level : number, ivs: Record<string,number>
    }) => {
        setPokemonID(selectedPokemon.id)
        // setPokemonData(selectedPokemon.data)
        setSelectedSprite(selectedPokemon.sprite)
        setSelectedTeraType(selectedPokemon.teraType)
        setAbility(selectedPokemon.ability)
        setMove1(selectedPokemon.move_1)
        setMove2(selectedPokemon.move_2)
        setMove3(selectedPokemon.move_3)
        setMove4(selectedPokemon.move_4)
        setCurrentNature(selectedPokemon.nature)
        setCurrentLevel(selectedPokemon.level)
        // setCurrentIVs(selectedPokemon.ivs)
        setCurrentIVs({
            hp: selectedPokemon.ivs.hp || 0,
            attack: selectedPokemon.ivs.attack || 0,
            defense: selectedPokemon.ivs.defense || 0,
            special_attack: selectedPokemon.ivs.special_attack || 0,
            special_defense: selectedPokemon.ivs.special_defense || 0,
            speed: selectedPokemon.ivs.speed || 0
            // Add other IVs as needed
          });
        setEditMode(true);
    }
    const handleIVChange = (stat: string, value: number ) =>{
        setCurrentIVs((prevIVs) => ({...prevIVs, [stat] : value}))
    }

    return (
        <div>
            <Link to="/">
                <button>Logout</button>
            </Link>
            <form onSubmit={handleSearch}>
                <input 
                    type="text"
                    placeholder='Enter Pokemon Name'
                    onChange={(e) => setSearchedPokemon(e.target.value)}
                />
                <button type='submit'>Search</button>
            </form>
            <div>
                <button onClick={handleSavePokemon}>Save</button>
            </div>

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
                    <h2>{pokemonData!.name}</h2>
                    <p>Type(s): {pokemonData!.types.map((type) => type.type.name).join(', ')}</p>
                    <div>
                        <h3>Select a Sprite:</h3>
                        <img 
                            src={selectedSprite || ''}
                            alt="Pokemon Sprite" 
                        />
                        <button onClick={() => handleSpriteSelect(pokemonData!.sprites.front_default)}>Default</button>
                        <button onClick={() => handleSpriteSelect(pokemonData!.sprites.front_shiny)}>Shiny</button>
                    </div>
                    
                    <TeraTypeSelector setSelectedTeraType={setSelectedTeraType} selectedTeraType={selectedTeraType}></TeraTypeSelector>
                    <PokemonNatureSelector setCurrentNature={setCurrentNature} currentNature={currentNature}></PokemonNatureSelector>
                    <AbilitiesSelector abilityUrls={pokemonData!.abilities.map(ability => ability.ability.url)} selectedAbility={ability} setSelectedAbility={setAbility}></AbilitiesSelector>
                    <LevelSelector currentLevel={currentLevel} setCurrentLevel={setCurrentLevel}></LevelSelector>
                    <PokemonIVEVRenderer 
                        hp={currentIVs.hp!}
                        attack={currentIVs.attack!}
                        defense={currentIVs.defense!}
                        special_attack={currentIVs.special_attack!}
                        special_defense={currentIVs.special_defense!}
                        speed={currentIVs.speed!}
                        onChangeHP={(value) => handleIVChange('hp', value!)}
                        onChangeAttack={(value) => handleIVChange('attack', value!)}
                        onChangeDefense={(value) => handleIVChange('defense', value!)}
                        onChangeSpecialAttack={(value) => handleIVChange('special_attack', value!)}
                        onChangeSpecialDefense={(value) => handleIVChange('special_defense', value!)}
                        onChangeSpeed={(value) => handleIVChange('speed', value!)}
                        >
                        </PokemonIVEVRenderer>
                    <MoveSlotSelector moveNames={pokemonData!.moves.map((move) => move.move.name)} selectedMove={move1} setSelectedMove={setMove1}></MoveSlotSelector>
                    <MoveSlotSelector moveNames={pokemonData!.moves.map((move) => move.move.name)} selectedMove={move2} setSelectedMove={setMove2}></MoveSlotSelector>
                    <MoveSlotSelector moveNames={pokemonData!.moves.map((move) => move.move.name)} selectedMove={move3} setSelectedMove={setMove3}></MoveSlotSelector>
                    <MoveSlotSelector moveNames={pokemonData!.moves.map((move) => move.move.name)} selectedMove={move4} setSelectedMove={setMove4}></MoveSlotSelector>
                </div>
            )}
        </div>
    )
};  


export default PokemonTeamBuilder