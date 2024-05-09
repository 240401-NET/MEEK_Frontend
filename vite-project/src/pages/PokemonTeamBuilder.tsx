
// import React, { useEffect, useState} from 'react'
// import { Pokemon } from '../models/Pokemon'
// import { fetchPokemonDataFromAPI } from '../models/PokemonAPICall'
// import { PokemonTeam } from '../models/PokemonTeamsInterface';
// import TeraTypeSelector from '../components/pokemonComponents/TeraTypeSelector';
// import AbilitiesSelector from '../components/pokemonComponents/AbilitiesSelector';
// import MoveSlotSelector from '../components/pokemonComponents/MoveSlotSelector';
// import {PokemonNatureSelector} from '../components/pokemonComponents/PokemonNature';
// import LevelSelector from '../components/pokemonComponents/PokemonLevel';
// import PokemonIVEVRenderer from '../components/pokemonComponents/PokemonIVEVS';
// import GenderSelector from '../components/pokemonComponents/GenderSelector';
// import { NavLink as Link } from 'react-router-dom';
// import HeldItemList from '../components/pokemonComponents/HeldItemList';
// import './PokemonTeamBuilder.css'
// import musicFile from "../assets/music.mp3";
// // import SpriteSelector from '../components/pokemonComponents/SpriteSelector';

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
import GenderSelector from '../components/pokemonComponents/GenderSelector';
import { NavLink as Link } from 'react-router-dom';
import HeldItemList from '../components/pokemonComponents/HeldItemList';
import './PokemonTeamBuilder.css'
import musicFile from "../assets/musicTwo.mp3";
// import SpriteSelector from '../components/pokemonComponents/SpriteSelector';


// const PokemonTeamBuilder: React.FC = () => {
//     const [pokemonData , setPokemonData] = useState<Pokemon | null>(null)
//     const [searchedPokemon, setSearchedPokemon] = useState<string>('')
//     const [selectedSprite, setSelectedSprite] = useState<string>('')
//     const [selectedItem, setSelectedItem] = useState<string>('');
//     const [savedPokemonTeam, setSavedPokemonTeam] = useState<PokemonTeam| null>(()=> {const savedTeam = localStorage.getItem('savedPokemonTeam');return savedTeam ? JSON.parse(savedTeam) : null;})
//     const [selectedTeraType, setSelectedTeraType] = useState('');
//     const [editMode, setEditMode] = useState<boolean>(false)
//     const [pokemonID, setPokemonID] = useState<string>('')
//     const [ability, setAbility] = useState('')
//     const [move1, setMove1] = useState('')
//     const [move2, setMove2] = useState('')
//     const [move3, setMove3] = useState('')
//     const [move4, setMove4] = useState('')
//     const [currentNature, setCurrentNature] = useState('')
//     const [currentLevel, setCurrentLevel] = useState(50)
//     // const [currentIVs, setCurrentIVs] = useState<Record<string, number>>({})
//     const [currentIVs, setCurrentIVs] = useState<{ hp?: number; attack?: number; defense?: number; special_attack?: number; special_defense?: number; speed?: number}>({})
//     // const [evs, setEVS] = useState<Record<string, number>>({})

//     useEffect(() =>{
//         const savedTeam = localStorage.getItem('savedPokemonTeam')
//         if(savedTeam)
//             {
//                 setSavedPokemonTeam(JSON.parse(savedTeam))
//             }
//     }, [])

//     const pokemonSearch = async (pokemonName : string) => {
//         try {
//             const responseData = await fetchPokemonDataFromAPI(pokemonName);
//             setPokemonData(responseData);
//             setSelectedSprite(responseData.sprites.front_default);
//         } catch (error) {
//             console.log("Can't find pokemon", error)
//         }

//     }
//     const handleSearch = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
//         event.preventDefault(); // Prevent default form submission or button click behavior
//         pokemonSearch(searchedPokemon);   
//     };

//     const handleSpriteSelect = (spriteUrl :string) => {
//         setSelectedSprite(spriteUrl);
//     }

//     const clearPageData = () => {
//         setPokemonData(null)
//         setSearchedPokemon('')
//         setSelectedTeraType('')
//         setAbility('')
//         setMove1('')
//         setMove2('')
//         setMove2('')
//         setMove2('')
//         setCurrentNature('')
//         setCurrentLevel(50)
//         // setEVS({})
//             setCurrentIVs({
//                 hp:  0,
//                 attack: 0,
//                 defense:  0,
//                 special_attack: 0,
//                 special_defense: 0,
//                 speed: 0
//                 // Add other IVs as needed
//               });

//     }

//     const handleSavePokemon = () => {
        
//         if (pokemonData ) {
//             const editedPokemon = {
//                 id : pokemonID,
//                 data: pokemonData,
//                 sprite: selectedSprite,
//                 teraType: selectedTeraType,
//                 ability: ability,
//                 move_1: move1,
//                 move_2: move2,
//                 move_3: move3,
//                 move_4: move4,
//                 nature: currentNature,
//                 level: currentLevel,
//                 ivs: {
//                     hp: currentIVs.hp,
//                     attack: currentIVs.attack,
//                     defense: currentIVs.attack,
//                     special_attack: currentIVs.special_attack,
//                     special_defense: currentIVs.special_defense,
//                     speed: currentIVs.speed
//                 }
//             }
//             if (editMode && savedPokemonTeam) {
//                 const updatedPokemon = savedPokemonTeam?.pokemons.map((pokemon) =>
//                     pokemon.id === editedPokemon.id ? 
//                     {...pokemon, pokemon: editedPokemon, id: `pokemon-${pokemonData.name}-${savedPokemonTeam ? savedPokemonTeam.pokemons.length + 1 : 1}`, 
//                         data: pokemonData, sprite: selectedSprite, teraType: selectedTeraType, ability : ability,
//                         move_1: move1, move_2: move2, move_3: move3, move_4: move4, nature: currentNature, level: currentLevel,
//                         ivs: {hp: currentIVs.hp!, attack: currentIVs.attack!, defense: currentIVs.defense!, special_attack: currentIVs.special_attack!,
//                             special_defense: currentIVs.special_defense!, speed: currentIVs.speed!
//                         },
//                         } : pokemon)
//                     const updatedTeam = {
//                         ...savedPokemonTeam,
//                         pokemons: updatedPokemon,
//                     }
//                 setSavedPokemonTeam(updatedTeam)
//                 localStorage.setItem('savedPokemonTeam', JSON.stringify(updatedTeam))
//             } else {
//                 const newPokemon = {
//                     id: `pokemon-${pokemonData.name}-${savedPokemonTeam ? savedPokemonTeam.pokemons.length + 1 : 1}`,
//                     data: pokemonData,
//                     sprite: selectedSprite,
//                     teraType: selectedTeraType,
//                     ability: ability,
//                     move_1: move1,
//                     move_2: move2,
//                     move_3: move3,
//                     move_4: move4,
//                     nature: currentNature,
//                     level: currentLevel,
//                     ivs: {
//                         hp: currentIVs.hp!,
//                         attack: currentIVs.attack!,
//                         defense: currentIVs.attack!,
//                         special_attack: currentIVs.special_attack!,
//                         special_defense: currentIVs.special_defense!,
//                         speed: currentIVs.speed!
//                     }
//                 }
//                 const updatedTeam = savedPokemonTeam 
//                 ? {
//                     ...savedPokemonTeam,
//                     pokemons: [...(savedPokemonTeam.pokemons || []), newPokemon]
//                 }
//                 : {
//                     pokemons: [newPokemon],
//                 }
//                 setSavedPokemonTeam(updatedTeam)
//                 localStorage.setItem('savedPokemonTeam', JSON.stringify(updatedTeam))
//             }
//             setEditMode(false)
//             clearPageData();
//             console.log(savedPokemonTeam)
//         }
//     }

//     const loadPokemonOnClick = (selectedPokemon: { id: string, data: Pokemon, sprite: string, 
//         teraType: string, ability :string, move_1: string, move_2: string, move_3: string, move_4: string,
//         nature: string, level : number, ivs: Record<string,number>
//     }) => {
//         setPokemonID(selectedPokemon.id)
//         setPokemonData(selectedPokemon.data)
//         setSelectedSprite(selectedPokemon.sprite)
//         setSelectedTeraType(selectedPokemon.teraType)
//         setAbility(selectedPokemon.ability)
//         setMove1(selectedPokemon.move_1)
//         setMove2(selectedPokemon.move_2)
//         setMove3(selectedPokemon.move_3)
//         setMove4(selectedPokemon.move_4)
//         setCurrentNature(selectedPokemon.nature)
//         setCurrentLevel(selectedPokemon.level)
//         // setCurrentIVs(selectedPokemon.ivs)
//         setCurrentIVs({
//             hp: selectedPokemon.ivs.hp || 0,
//             attack: selectedPokemon.ivs.attack || 0,
//             defense: selectedPokemon.ivs.defense || 0,
//             special_attack: selectedPokemon.ivs.special_attack || 0,
//             special_defense: selectedPokemon.ivs.special_defense || 0,
//             speed: selectedPokemon.ivs.speed || 0
//             // Add other IVs as needed
//           });
//         setEditMode(true);
//     }
//     const handleIVChange = (stat: string, value: number ) =>{
//         setCurrentIVs((prevIVs) => ({...prevIVs, [stat] : value}))
//     }
//     const handleSave = () =>{
//         handleSavePokemon()
//     }

//     const button = document.querySelector("#save-button");
//     button?.addEventListener ("click", onClick, false);
//     function onClick (event: any) {
//         event.preventDefault();
//         handleSave();
//     }

//     const deletePokemon = (pokemonId: string) => {
//         // Filter out the Pokémon with the specified ID from the team
//         const updatedTeam = {
//             ...savedPokemonTeam,
//             pokemons: savedPokemonTeam!.pokemons.filter((pokemon) => pokemon.id !== pokemonId)
//         };
    
//         // Update the state to reflect the deletion
//         setSavedPokemonTeam(updatedTeam);
    
//         // Optionally, update local storage or perform any other necessary actions
//         localStorage.setItem('savedPokemonTeam', JSON.stringify(updatedTeam));
//     };

//        // Function to handle gender selection
//     const handleGenderSelection = (gender: string) => {
//         setSelectedGender(gender);
//     };

    

//     return (
//     <div className="page-container"> {/* Add the page-container class here */}
//         <Link to="/"></Link>
//             <Link to="/">
//                 <button>Logout</button>
//             </Link>
//             <form onSubmit={handleSearch} className="custom-form">
//         <input type="text" placeholder='Enter Pokemon Name' onChange={(e) => setSearchedPokemon(e.target.value)}className="custom-input" />
//         <button type='submit' className="search-button">Search</button>
//         <button type='submit' id = "save-button" className="save-button" onClick={(handleSavePokemon)}>Save</button>
//             </form>
//             {savedPokemonTeam && savedPokemonTeam.pokemons.length > 0 && (
//     <div>
//         <form className="pokemon-team-form">
//             <h3>Pokemon Team</h3>
//             <ul>
//                 {savedPokemonTeam.pokemons.map((pokemon) => (
//                     <li key={pokemon.id} onClick={() => loadPokemonOnClick(pokemon)}>
//                         {pokemon.data.name.charAt(0).toUpperCase() + pokemon.data.name.slice(1)} : {pokemon.teraType}
//                         <img src={pokemon.sprite} alt={pokemon.data.name} />
//                         <button className="delete-button" onClick={() => deletePokemon(pokemon.id)}></button>
//                     </li>
//                 ))}
//             </ul>
//             {/* Check if the team has exactly 6 Pokemon before allowing to add more */}
//             {savedPokemonTeam.pokemons.length === 6 && (
//                 <p>This team already has 6 Pokémon. You cannot add more.</p>
//             )}
//         </form>
//     </div>
// )}
//             {pokemonData && (
//                 <div>
//                     <form className='pokemon-form'>
//                     <h2>{pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h2>
//                     <p>Type(s): {pokemonData.types.map((type) => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)).join(', ')}</p>
//                     <div>
//                         {/* <h3>Select Sprite:</h3> */}
//                         <img src={selectedSprite || ''} alt="Pokemon Sprite" />
//                         <button type='button' className="default-button"onClick={() => handleSpriteSelect(pokemonData.sprites.front_default)}>Default</button>
//                         <button type ='button'className="shiny-button"onClick={() => handleSpriteSelect(pokemonData.sprites.front_shiny)}>Shiny</button>
//                     </div>
//                     <div>
//                         {/* Render the GenderSelector component */}
//                         <GenderSelector onSelect={handleGenderSelection} />
//                     </div>
//                     <TeraTypeSelector setSelectedTeraType={setSelectedTeraType} selectedTeraType={selectedTeraType}></TeraTypeSelector>
//                     <PokemonNatureSelector setCurrentNature={setCurrentNature} currentNature={currentNature}></PokemonNatureSelector>
//                     <AbilitiesSelector abilityUrls={pokemonData.abilities.map(ability => ability.ability.url)} selectedAbility={ability} setSelectedAbility={setAbility}></AbilitiesSelector>
//                     <LevelSelector currentLevel={currentLevel} setCurrentLevel={setCurrentLevel}></LevelSelector>
//                     <PokemonIVEVRenderer 
//                         hp={currentIVs.hp!}
//                         attack={currentIVs.attack!}
//                         defense={currentIVs.defense!}
//                         special_attack={currentIVs.special_attack!}
//                         special_defense={currentIVs.special_defense!}
//                         speed={currentIVs.speed!}
//                         onChangeHP={(value) => handleIVChange('hp', value!)}
//                         onChangeAttack={(value) => handleIVChange('attack', value!)}
//                         onChangeDefense={(value) => handleIVChange('defense', value!)}
//                         onChangeSpecialAttack={(value) => handleIVChange('special_attack', value!)}
//                         onChangeSpecialDefense={(value) => handleIVChange('special_defense', value!)}
//                         onChangeSpeed={(value) => handleIVChange('speed', value!)}
//                         >
//                     </PokemonIVEVRenderer>
//                     <div style={{ display: 'flex', flexDirection: 'row' }}>
//                     <MoveSlotSelector moveNames={pokemonData.moves.map((move) => move.move.name)} selectedMove={move1} setSelectedMove={setMove1}></MoveSlotSelector>
//                     <MoveSlotSelector moveNames={pokemonData.moves.map((move) => move.move.name)} selectedMove={move2} setSelectedMove={setMove2}></MoveSlotSelector>
//                     <MoveSlotSelector moveNames={pokemonData.moves.map((move) => move.move.name)} selectedMove={move3} setSelectedMove={setMove3}></MoveSlotSelector>
//                     <MoveSlotSelector moveNames={pokemonData.moves.map((move) => move.move.name)} selectedMove={move4} setSelectedMove={setMove4}></MoveSlotSelector>
//                     </div>
//                     </form>
//                 </div>
//             )}
//                 <div>
//         <audio autoPlay loop>
//           <source src={musicFile} type="audio/mp3" />
//           Your browser does not support the audio element.
//         </audio>
//       </div>
//         </div>
//     )
// };  


// export default PokemonTeamBuilder

// function setSelectedGender(gender: string) {
//     throw new Error('Function not implemented.');
// }

