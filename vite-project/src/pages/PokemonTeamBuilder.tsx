import React, { useEffect, useState} from 'react'
import { Pokemon } from '../models/Pokemon'
import { fetchPokemonDataFromAPI } from '../models/PokemonAPICall'
import { PokemonTeam } from '../models/PokemonTeamsInterface';
import TeraTypeSelector from '../components/pokemonComponents/TeraTypeSelector';
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
    
    const handleSpriteSelect = (spriteUrl :string) => {
        setSelectedSprite(spriteUrl)
    }

    const handleSavePokemon = () => {
        
        if (pokemonData ) {
            const editedPokemon = {
                id : pokemonID,
                data: pokemonData,
                sprite: selectedSprite,
                teraType: selectedTeraType
            }
            if (editMode && savedPokemonTeam) {
                const updatedPokemon = savedPokemonTeam?.pokemons.map((pokemon) =>
                    pokemon.id === editedPokemon.id ? 
                    {...pokemon, pokemon: editedPokemon, data: pokemonData, sprite: selectedSprite, teraType: selectedTeraType} : pokemon)
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
                    teraType: selectedTeraType
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
        teraType: string
    }) => {
        setPokemonID(selectedPokemon.id)
        setPokemonData(selectedPokemon.data)
        setSelectedSprite(selectedPokemon.sprite)
        setSelectedTeraType(selectedPokemon.teraType)
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
                    
                </div>
            )}
        </div>
    )
};  


export default PokemonTeamBuilder