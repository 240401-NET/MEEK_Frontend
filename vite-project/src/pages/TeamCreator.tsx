import "./PokemonTeamBuilder.css"
import React, { useEffect, useState} from 'react'
import { NavLink as Link, Navigate, useNavigate } from 'react-router-dom'
import { BackEndPokemonTeamInterface, EVStats, IVStats, MoveSet, MoveSetInitiailState, PokemonBackEndApiCall, PokemonTeamMember, Stat, StatImplementation, initialEVState, initialIVState } from '../models/Pokemon'
import { fetchPokemonDataFromAPI } from '../models/PokemonAPICall'
import GenderSelector from '../components/pokemonComponents/GenderSelector'
import TeraTypeSelector from '../components/pokemonComponents/TeraTypeSelector'
import { PokemonNatureSelector } from '../components/pokemonComponents/PokemonNature'
import AbilitiesSelector from '../components/pokemonComponents/AbilitiesSelector'
import LevelSelector from '../components/pokemonComponents/PokemonLevel'
// import PokemonIVEVRenderer from '../components/pokemonComponents/PokemonIVEVS'
import MoveSlotSelector from '../components/pokemonComponents/MoveSlotSelector'
import StatComponent from "../components/pokemonComponents/StatComponent"
import HeldItemList from "../components/pokemonComponents/HeldItemList"
// import { updatePokemonTeam } from "../utils/PokemonTeamBuilderUtils"
import { UpdateATeam } from "../services/TrainerServices"

const initialPreviouslySavedTeamState : BackEndPokemonTeamInterface = {
    name: "",
    pokemonTeamMembers: []
}

const TeamCreator : React.FC = () => {
    // sets up the initial load state of the webpage:
    const navigate = useNavigate();
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [previouslySavedTeam, setPreviouslySavedTeam] = useState<BackEndPokemonTeamInterface>(initialPreviouslySavedTeamState);
    const [pokemonTeamId, setPokemonTeamId] = useState<number>(0);
    const [pokemonTeamName, setPokemonTeamName] = useState<string>('');
    const [pokemonTeamMembers, setPokemonTeamMembers] = useState<PokemonTeamMember[]>([]);
    const [searchedPokemonReponseData, setSearchedPokmonResponseData] = useState<PokemonBackEndApiCall | null>(null)
    const [searchedPokemon, setSearchedPokemon] = useState<string>("");
    const [localStorageKey, setLocalStorageKey] = useState<string>("");

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
    const [pokemonStats, setPokemonStats] = useState<StatImplementation[]>([]);

    // maintain stats identity:
    const [APIStatsArray, setAPIStatsArray] = useState<Stat[]>([]);
    const [currentIVs, setCurrentIVs] = useState<IVStats>(initialIVState);
    const [currentEVs, setCurrentEVs] = useState<EVStats>(initialEVState);


    // controls isShiny data via conditional
    const [sprite, setSprite] = useState<string>('')

    // defines a move for a moveSet interface
    const [move_1, setMove1] = useState<string>('');
    const [move_2, setMove2] = useState<string>('');
    const [move3, setMove3] = useState<string>('');
    const [move4, setMove4] = useState<string>('');
    // key signature to search local storage for specific key ending in:
    const localStorageSignature = '-pokemonTeam';
    const url : string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

    // use effect call that calls loadspe
    useEffect(() => {
        loadSpecificTrainerTeam();
    }, [localStorageKey, pokemonTeamName, pkmApiId, isShiny, gender, nature,
        chosenAbility, teraType, heldItem, rosterOrder, pokemonMoveSet, pokemonStats, sprite,
        currentIVs, currentEVs, move_1, move_2, move3, move4
    ])


    useEffect(() => {
        if(currentEVs !== initialEVState && currentIVs !== initialIVState){
            SetsArray();
            // console.log(pokemonStats);
        }
    }, [searchedPokemonReponseData, currentEVs, currentIVs, APIStatsArray, pokemonStats])

    useEffect(() => {
        if (JSON.stringify(newMoveSetState) !== JSON.stringify(pokemonMoveSet))
            {
                setPokemonMoveSet(newMoveSetState);
            }
    }, [move_1 , move_2, move3, move4])

    // useEffect(() => {
    //     console.log(previouslySavedTeam)
    // }, [previouslySavedTeam])

    
    // Load Pokemon Team Item from local storage and sets it to a state variable that we track
    const loadSpecificTrainerTeam = () => {
        if(firstLoad) {
            let itemValue: string = "";
            for (let key in localStorage) {
                if (key.endsWith(localStorageSignature)) {
                itemValue = localStorage.getItem(key)!
                //   setPreviouslySavedTeam(itemValue);
                setLocalStorageKey(itemValue);
                }
            }
            setFirstLoad(false);
        } else {
            handlePokemonTeamIdAndName();
        }
    }

    const handlePokemonTeamIdAndName = () => {
        if(pokemonTeamName === '') {
            // setPokemonTeamId(previouslySavedTeam.id);
            setPokemonTeamName(localStorageKey);
            // setPokemonTeamMembers(previouslySavedTeam.pokemonTeamMembers);
        }
    }

    const pokemonSearch = async (pokemonName : string) => {
        try {
            const responseData = await fetchPokemonDataFromAPI(pokemonName);
            setSearchedPokmonResponseData(responseData);
            setSprite(responseData.pokemonSprite.front_default);
            setPkmApiId(responseData.id);
            setName(responseData.name);
        } catch (error) {
            console.log("Can't find pokemon", error)
        }

    }

    const handleSearch = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Prevent default form submission or button click behavior
        pokemonSearch(searchedPokemon);   
    };

    const handleNickname = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNickname(e.target.value);
    }

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

    // handles stat props
    const handleIVStatsArrary = (stat: string, value: number ) =>{
        setCurrentIVs((prevIVs) => ({...prevIVs, [stat] : value}))
    
    }
    const handleEVStatsArrary = (stat: string, value: number ) =>{
        setCurrentEVs((prevIVs) => ({...prevIVs, [stat] : value}))
    }
    
    const newMoveSetState: MoveSet = {
        move1: move_1,
        move2: move_2,
        move3: move3,
        move4: move4
    }

    const handleItemSelection = (itemName: string) =>{
        setHeldItem(itemName)
    }

    const SetsArray = () => {
        if (searchedPokemonReponseData) {
            const APIDatastatsArray = searchedPokemonReponseData?.pokemonBaseStats.map((stat) => stat);
            if (JSON.stringify(APIDatastatsArray) !== JSON.stringify(APIStatsArray)){
                setAPIStatsArray(APIDatastatsArray)
            }
            const combinedStatsArray  = APIStatsArray.map((stat) => {
                const evValue = currentEVs[stat.name as keyof EVStats]
                const ivValue = currentIVs[stat.name as keyof IVStats]
                const urlParts = stat.url!.split('/');
                const idString = urlParts[urlParts.length - 2];
                return {
                    id: parseInt(idString),
                    effort: evValue,
                    individual: ivValue,
                    name: stat.name,
                    url: stat.url,
                    base_stat: stat.baseStat
                    }
            })
            if (JSON.stringify(combinedStatsArray) !== JSON.stringify(pokemonStats)){
                setPokemonStats(combinedStatsArray!)
            }
        }
    }

    const deletePokemon = (rosterOrder : number) => {
        // Filter out the Pokémon with the specified ID from the team
        const updatedTeam = {
            ...previouslySavedTeam,
            pokemonTeamMembers: previouslySavedTeam!.pokemonTeamMembers.filter((pokemon) => pokemon.rosterOrder !== rosterOrder)
        };

        setPreviouslySavedTeam(updatedTeam);

        localStorage.setItem(localStorageKey, JSON.stringify(updatedTeam));
    };
    // console.log(previouslySavedTeam);

    const loadPokemonOnClick = (selectedPokemon : PokemonTeamMember, ) => {
        setPokemonMoveSet(newMoveSetState);
        setSprite(selectedPokemon.isShiny ? selectedPokemon.data.pokemonSprite.front_shiny : selectedPokemon.data.pokemonSprite.front_default)
        setSearchedPokmonResponseData(selectedPokemon.data);
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
        setMove1(selectedPokemon.pokemonMoveSet.move1)
        setMove2(selectedPokemon.pokemonMoveSet.move2)
        setMove3(selectedPokemon.pokemonMoveSet.move3)
        setMove4(selectedPokemon.pokemonMoveSet.move4)
        setPokemonStats(selectedPokemon.pokemonStats);
        setEditMode(true);
    };
    // console.log(editMode) 
    const handleSavePokemon = () => {
        if (searchedPokemonReponseData ) {
            const editedPokemon = {
                pkmApiId: searchedPokemonReponseData.id,
                name: searchedPokemonReponseData.name, 
                nickname: nickname,
                level: level,
                chosenAbility: chosenAbility,
                gender: gender,
                isShiny: isShiny,
                teraType: teraType,
                heldItem: heldItem,
                rosterOrder: rosterOrder,
                nature: nature,
                pokemonMoveSet: pokemonMoveSet,
                pokemonStats: pokemonStats,
                data: searchedPokemonReponseData
                }
            
            if (editMode && previouslySavedTeam) {
                const updatedPokemon = previouslySavedTeam.pokemonTeamMembers.map((pokemon) =>
                    pokemon.nickname === editedPokemon.nickname ? pokemon = editedPokemon : pokemon)
                    const updatedTeam = {
                        ...previouslySavedTeam,
                        pokemonTeamMembers: updatedPokemon,
                    }
                setPreviouslySavedTeam(updatedTeam)
                localStorage.setItem(localStorageKey, JSON.stringify(updatedTeam))
            } else {
                const newPokemon = {
                    pkmApiId: searchedPokemonReponseData.id,
                    name: searchedPokemonReponseData.name, 
                    nickname: nickname,
                    level: level,
                    chosenAbility: chosenAbility,
                    gender: gender,
                    isShiny: isShiny,
                    teraType: teraType,
                    heldItem: heldItem,
                    rosterOrder: 6 - (6 - previouslySavedTeam.pokemonTeamMembers.length ) + 1,
                    nature: nature,
                    pokemonMoveSet: pokemonMoveSet,
                    pokemonStats: pokemonStats,
                    data: searchedPokemonReponseData
                }
                const updatedTeam = previouslySavedTeam 
                ? {
                    ...previouslySavedTeam,
                    pokemonTeamMembers: [...(previouslySavedTeam.pokemonTeamMembers || []), newPokemon]
                }
                : {
                    name: localStorageKey,
                    pokemonTeamMembers: [newPokemon],
                }
                setPreviouslySavedTeam(updatedTeam)
                localStorage.setItem(localStorageKey, JSON.stringify(updatedTeam))       
            }
            setEditMode(false)
            clearPageData();
        }
    }

    const clearPageData = () => {
        setSearchedPokemon('');
        setSearchedPokmonResponseData(null);
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
        setMove3('')
        setMove4('')
        setCurrentIVs(initialIVState);
        setCurrentEVs(initialEVState)
        
    };
    // console.log(newMoveSetState)
    // console.log(pokemonMoveSet);    

    const updatePokemonTeam = async (name: string, pokemonTeamMembers : PokemonTeamMember[])  => {
        if (name === "") {
            const getTeamName = window.prompt("Please enter a team name!")
            name = getTeamName!
        }
        const response = await UpdateATeam(name, pokemonTeamMembers);
        console.log(response);
        navigate("/trainer")
    }

    return (
        <div className="page-container">
        <Link to="/">
            <button>home</button>
        </Link>
        <Link to="/signin">
            <button>Logout</button>
        </Link>
        <form onSubmit={handleSearch} className="custom-form">
            <input type="text" value={searchedPokemon} placeholder='Enter Pokemon Name' onChange={(e) => setSearchedPokemon(e.target.value)}className="custom-input" />
            <button type='submit' className="search-button">Search</button>
            <button type='submit' id = "save-button" className="save-button" onClick={(handleSavePokemon)}>Save</button> 
        </form>
        {previouslySavedTeam &&  previouslySavedTeam.pokemonTeamMembers.length > 0 && (
            <form className="pokemon-team-form">
            <h3>Pokemon Team</h3>
            <ul>
                {previouslySavedTeam.pokemonTeamMembers.map((pokemon) => (
                    <li key={pokemon.rosterOrder} onClick={() =>loadPokemonOnClick(pokemon)}>
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
                    <h2>{searchedPokemonReponseData !== null ? searchedPokemonReponseData?.name.charAt(0).toUpperCase() + searchedPokemonReponseData?.name.slice(1) : ""}</h2>
                    <input type="text" placeholder='Enter a nickname for your teammember...' value={nickname} onChange={handleNickname}/>
                    <p>Type(s): {searchedPokemonReponseData.types.map((type) => type.name.charAt(0).toUpperCase() + type.name.slice(1)).join(', ')}</p>
                    <div>
                        {/* <h3>Select Sprite:</h3> */}
                        <img src={sprite || ''} alt="Pokemon Sprite" />
                        <button type='button' className="default-button"onClick={() => handleSpriteSelect(searchedPokemonReponseData.pokemonSprite.front_default)}>Default</button>
                        <button type ='button'className="shiny-button"onClick={() => handleSpriteSelect(searchedPokemonReponseData.pokemonSprite.front_shiny)}>Shiny</button>
                    </div>
                    <div>
                        {/* Render the GenderSelector component */}
                        <GenderSelector onSelect={setGender} />
                    </div>
                    <TeraTypeSelector setSelectedTeraType={setTeraType} selectedTeraType={teraType}></TeraTypeSelector>
                    <PokemonNatureSelector setCurrentNature={setNature} currentNature={nature}></PokemonNatureSelector>
                    <AbilitiesSelector abilityUrls={searchedPokemonReponseData.abilities.map(ability => ability.url)} selectedAbility={chosenAbility} setSelectedAbility={setChosenAbility}></AbilitiesSelector>
                    <LevelSelector currentLevel={level} setCurrentLevel={setLevel}></LevelSelector>
                    <StatComponent currentEVs={currentEVs} currentIVs={currentIVs} handleEVStatsArrary={handleEVStatsArrary} handleIVStatsArrary={handleIVStatsArrary}></StatComponent>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <MoveSlotSelector moveNames={searchedPokemonReponseData.moves.map((move) => move.name)} selectedMove={move_1} setSelectedMove={setMove1}></MoveSlotSelector>
                    <MoveSlotSelector moveNames={searchedPokemonReponseData.moves.map((move) => move.name)} selectedMove={move_2} setSelectedMove={setMove2}></MoveSlotSelector>
                    <MoveSlotSelector moveNames={searchedPokemonReponseData.moves.map((move) => move.name)} selectedMove={move3} setSelectedMove={setMove3}></MoveSlotSelector>
                    <MoveSlotSelector moveNames={searchedPokemonReponseData.moves.map((move) => move.name)} selectedMove={move4} setSelectedMove={setMove4}></MoveSlotSelector>
                    <HeldItemList handleItemSelection={handleItemSelection}></HeldItemList>
                    </div>
                    </form>
                </div>
            )}
            <button onClick={() => updatePokemonTeam(previouslySavedTeam.name, previouslySavedTeam.pokemonTeamMembers)}>Save Changes</button>
        </div>
    )
}

export default TeamCreator