import "./PokemonTeamBuilder.css"
import React, { useEffect, useState} from 'react'
import { NavLink as Link } from 'react-router-dom'
import { BackEndPokemonTeamInterface, MoveSet, MoveSetInitiailState, PokemonBackEndApiCall, PokemonTeamMember, StatImplementation } from '../models/Pokemon'
import { fetchPokemonDataFromAPI } from '../models/PokemonAPICall'
import GenderSelector from '../components/pokemonComponents/GenderSelector'
import TeraTypeSelector from '../components/pokemonComponents/TeraTypeSelector'
import { PokemonNatureSelector } from '../components/pokemonComponents/PokemonNature'
import AbilitiesSelector from '../components/pokemonComponents/AbilitiesSelector'
import LevelSelector from '../components/pokemonComponents/PokemonLevel'
import PokemonIVEVRenderer from '../components/pokemonComponents/PokemonIVEVS'
import MoveSlotSelector from '../components/pokemonComponents/MoveSlotSelector'

const initialPreviouslySavedTeamState : BackEndPokemonTeamInterface = {
    id: 0,
    name: "",
    pokemonTeamMembers: []
}

const TeamCreator : React.FC = () => {
    // sets up the initial load state of the webpage:
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [editMode, setEditMode] = useState<boolean>(true);
    const [previouslySavedTeam, setPreviouslySavedTeam] = useState<BackEndPokemonTeamInterface>(initialPreviouslySavedTeamState);
    const [pokemonTeamId, setPokemonTeamId] = useState<number>(0);
    const [pokemonTeamName, setPokemonTeamName] = useState<string>('');
    const [pokemonTeamMembers, setPokemonTeamMembers] = useState<PokemonTeamMember[]>([]);
    const [currentlySavedPokemonTeamMemembers, setCurrentlySavedPokemonTeamMembers] = useState<PokemonTeamMember[]>([]);
    const [searchedPokemonReponseData, setSearchedPokmonResponseData] = useState<PokemonBackEndApiCall | null>(null)
    const [searchedPokemon, setSearchedPokemon] = useState<string>("");
    const [localStorageKey, setLocalStorageKey] = useState<string>("");
    const [displayPokemon, setDisplayPokemon] = useState<boolean>(false);

    // Pokemon States: Everything that defines what a pokemon teammember is:
    const [pkmApiId, setPkmApiId] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [level, setLevel] = useState<number>(50);
    const [chosenAbility, setChosenAbility] = useState<string>('');
    const [gender, setGender] = useState<boolean>(false);
    const [isShiny, setIsShiny] = useState<boolean>(false);
    const [teraType, setTeraType] = useState<string>('');
    const [heldItem, setHeldItem] = useState<string>('');
    const [rosterOrder, setRosterOrder] = useState<number>(0);
    const [nature, setNature] = useState<string>('');
    const [pokemonMoveSet, setPokemonMoveSet] = useState<MoveSet>(MoveSetInitiailState);
    const [move1, setMove1] = useState<string>('');
    const [move2, setMove2] = useState<string>('');
    const [move3, setMove3] = useState<string>('');
    const [move4, setMove4] = useState<string>('');
    const [pokemonStats, setPokemonStats] = useState<StatImplementation[]>([]);
    const [sprite, setSprite] = useState<string>('')

    // key signature to search local storage for specific key ending in:
    const localStorageSignature = '-pokemonTeam';
    const url : string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

    // use effect call that calls loadspe
    useEffect(() => {
        loadSpecificTrainerTeam();
    }, [previouslySavedTeam, pokemonTeamId, searchedPokemonReponseData, pkmApiId, isShiny, gender, nature,
        chosenAbility, teraType, heldItem, rosterOrder, pokemonMoveSet, move1, move2, move3, move4, pokemonStats, sprite,
    ])

    
    // Load Pokemon Team Item from local storage and sets it to a state variable that we track
    const loadSpecificTrainerTeam = () => {
        if(firstLoad) {
            let itemValue : BackEndPokemonTeamInterface = initialPreviouslySavedTeamState;
            for (let key in localStorage) {
                if (key.endsWith(localStorageSignature)) {
                  itemValue = JSON.parse(localStorage.getItem(key)!);
                  setPreviouslySavedTeam(itemValue);
                  setLocalStorageKey(key);
                }
            }
            setFirstLoad(false);
        } else {
            handlePokemonTeamIdAndName();
        }
    }

    const handlePokemonTeamIdAndName = () => {
        if(pokemonTeamId === 0 && pokemonTeamName === '') {
            setPokemonTeamId(previouslySavedTeam.id);
            setPokemonTeamName(previouslySavedTeam.name);
            setPokemonTeamMembers(previouslySavedTeam.pokemonTeamMembers);
        }
    }

    const pokemonSearch = async (pokemonName : string) => {
        try {
            const responseData = await fetchPokemonDataFromAPI(pokemonName);
            setSearchedPokmonResponseData(responseData);
            setSprite(responseData.pokemonSprite.front_default);
            setPkmApiId(responseData.id);
            clearPageData();
        } catch (error) {
            console.log("Can't find pokemon", error)
        }

    }

    const handleSearch = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Prevent default form submission or button click behavior
        pokemonSearch(searchedPokemon);   
    };

    const handleSpriteSelect = (spriteUrl :string) => {
        if(spriteUrl === searchedPokemonReponseData?.pokemonSprite.front_default) {
            setIsShiny(false);
        }
        else {
            setIsShiny(true);
        }
        setSprite(spriteUrl);
    };

    const handleGenderSelection = (gender: boolean) => {
        setGender(gender);
    };

    const deletePokemon = (rosterOrder : number) => {
        // Filter out the Pokémon with the specified ID from the team
        const updatedTeam = {
            ...previouslySavedTeam,
            pokemonTeamMembers: previouslySavedTeam!.pokemonTeamMembers.filter((pokemon) => pokemon.rosterOrder !== rosterOrder)
        };

        setPreviouslySavedTeam(updatedTeam);

        localStorage.setItem(localStorageKey, JSON.stringify(updatedTeam));
    };

    const loadPokemonOnClick = (selectedPokemon : PokemonTeamMember) => {
        setPkmApiId(selectedPokemon.pkmApiId);
        setName(selectedPokemon.name);
        setNickname(selectedPokemon.nickname);
        setLevel(selectedPokemon.level);
        setChosenAbility(selectedPokemon.chosenAbility);
        setGender(selectedPokemon.gender);
        setIsShiny(selectedPokemon.isShiny);
        setTeraType(selectedPokemon.teraType);
        setHeldItem(selectedPokemon.heldItem);
        setRosterOrder(selectedPokemon.rosterOrder);
        setNature(selectedPokemon.nature);
        setPokemonMoveSet(selectedPokemon.pokemonMoveSet);
        setPokemonStats(selectedPokemon.pokemonStats);
        setEditMode(true);
    };

    const clearPageData = () => {
        setDisplayPokemon(false);
        setPkmApiId(0);
        setName('');
        setNickname('');
        setLevel(50);
        setChosenAbility('');
        setGender(false);
        setIsShiny(false);
        setTeraType('');
        setHeldItem('');
        setRosterOrder(0);
        setNature('');
        setPokemonMoveSet(MoveSetInitiailState);
        setMove1('')
        setMove2('')
        setMove2('')
        setMove2('')
        setPokemonStats([]);
        
    };
    console.log(pkmApiId, isShiny, level, chosenAbility, nature, teraType, gender, move1, move2, move3, move4)
    
    return (
        <div className="page-container">
        <Link to="/">
            <button>home</button>
        </Link>
        <Link to="signin">
            <button>Logout</button>
        </Link>
        <form onSubmit={handleSearch} className="custom-form">
            <input type="text" placeholder='Enter Pokemon Name' onChange={(e) => setSearchedPokemon(e.target.value)}className="custom-input" />
            <button type='submit' className="search-button">Search</button>
            <button type='submit' id = "save-button" className="save-button" >Save</button> {/*onClick={(handleSavePokemon)}*/}
        </form>
        {previouslySavedTeam &&  previouslySavedTeam.pokemonTeamMembers.length > 0 && (
            <form className="pokemon-team-form">
            <h3>Pokemon Team</h3>
            <ul>
                {previouslySavedTeam.pokemonTeamMembers.map((pokemon) => (
                    <li key={pokemon.rosterOrder} onClick={() => loadPokemonOnClick(pokemon)}>
                        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} : {pokemon.teraType}
                        <img src={pokemon.isShiny ? url+'shiny/'+`${pokemon.pkmApiId}`+".png" : url+`${pokemon.pkmApiId}`+".png"} alt={pokemon.name} />
                        <button className="delete-button" onClick={() => deletePokemon(pokemon.rosterOrder)}></button>
                    </li>
                ))}
            </ul>
                {/* Check if the team has exactly 6 Pokemon before allowing to add more */}
                {previouslySavedTeam.pokemonTeamMembers.length === 6 && (
                    <p>This team already has 6 Pokémon. You cannot add more.</p>
                )}
            </form>
        )}
        {searchedPokemonReponseData && (
                <div>
                    <form className='pokemon-form'>
                    <h2>{searchedPokemonReponseData.name.charAt(0).toUpperCase() + searchedPokemonReponseData.name.slice(1)}</h2>
                    <p>Type(s): {searchedPokemonReponseData.types.map((type) => type.name.charAt(0).toUpperCase() + type.name.slice(1)).join(', ')}</p>
                    <div>
                        {/* <h3>Select Sprite:</h3> */}
                        <img src={sprite || ''} alt="Pokemon Sprite" />
                        <button type='button' className="default-button"onClick={() => handleSpriteSelect(searchedPokemonReponseData.pokemonSprite.front_default)}>Default</button>
                        <button type ='button'className="shiny-button"onClick={() => handleSpriteSelect(searchedPokemonReponseData.pokemonSprite.front_shiny)}>Shiny</button>
                    </div>
                    <div>
                        {/* Render the GenderSelector component */}
                        <GenderSelector onSelect={handleGenderSelection} />
                    </div>
                    <TeraTypeSelector setSelectedTeraType={setTeraType} selectedTeraType={teraType}></TeraTypeSelector>
                    <PokemonNatureSelector setCurrentNature={setNature} currentNature={nature}></PokemonNatureSelector>
                    <AbilitiesSelector abilityUrls={searchedPokemonReponseData.abilities.map(ability => ability.url)} selectedAbility={chosenAbility} setSelectedAbility={setChosenAbility}></AbilitiesSelector>
                    <LevelSelector currentLevel={level} setCurrentLevel={setLevel}></LevelSelector>
                    {/* <PokemonIVEVRenderer 
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
                    </PokemonIVEVRenderer> */}
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <MoveSlotSelector moveNames={searchedPokemonReponseData.moves.map((move) => move.name)} selectedMove={move1} setSelectedMove={setMove1}></MoveSlotSelector>
                    <MoveSlotSelector moveNames={searchedPokemonReponseData.moves.map((move) => move.name)} selectedMove={move2} setSelectedMove={setMove2}></MoveSlotSelector>
                    <MoveSlotSelector moveNames={searchedPokemonReponseData.moves.map((move) => move.name)} selectedMove={move3} setSelectedMove={setMove3}></MoveSlotSelector>
                    <MoveSlotSelector moveNames={searchedPokemonReponseData.moves.map((move) => move.name)} selectedMove={move4} setSelectedMove={setMove4}></MoveSlotSelector>
                    </div>
                    </form>
                </div>
            )}

        </div>
    )
}

export default TeamCreator;