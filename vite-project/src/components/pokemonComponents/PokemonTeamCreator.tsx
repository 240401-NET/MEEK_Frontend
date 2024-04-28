import './PokemonTeamCreator.css';
import React, {useState, useEffect} from 'react';
import AbilitiesSelector from './AbilitiesSelector';
import SpriteSelector from './SpriteSelector';

interface Pokemon {
    name: string
    types: {type : {name: string} } []
    abilities : {ability : {name: string , url: string} } []
    moves: {move: {name: string} } []
    stats: {base_stat: number, effort : number, stat: {name: string}} []
    sprites: {front_default : string, front_shiny : string }
}

interface ability{
    name: string
    flavor_Text: string
}

const PokemonTeamCreator : React.FC = () => {

    const [searchedPokemon, setSearchedPokemon] = useState('');
    const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
    // const [selectedSprite, setSelectedSprite] = useState<"front_default" | "front_shiny">("front_default")
    const [abilities, setAbilities] = useState<Array<ability>>([])
    // const [selectedAbility, setSelectedAbility] = useState(abilities.length > 0 ? abilities[0].name : "");

    // useEffect(() => {
    //     setSelectedSprite("front_default")
    // }, [pokemonData])

    useEffect(() => {
        if(pokemonData) {
            const fetchAbilityData = async () => {
                try{
                    const abilitiesdata = await Promise.all(pokemonData.abilities.map(async (ability) => {
                        const abilityResponse = await fetch(ability.ability.url);
                        const abilityData = await abilityResponse.json();
                        const flavorTextEntries = abilityData.flavor_text_entries.filter(
                            (entry : {language: {name: string} }) => entry.language.name === "en"
                        );
                        const flavorText = flavorTextEntries.length > 0 ? flavorTextEntries[0].flavor_text : "Flavor text not available"
                        return {
                            name: ability.ability.name,
                            flavor_Text: flavorText
                        };
                    })
                );
                setAbilities(abilitiesdata);
                } catch (error) {
                console.error("Error fetching ability information...", error);
            }
        };
        fetchAbilityData();
        }
    },[pokemonData])

    const fetchPokemonData = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchedPokemon.toLowerCase()}`)
            const returnData = await response.json();
            setPokemonData(returnData);
        }
        catch (error) {
            console.error("Invalid search! No Pokèmon exists with that name!", error)
        }
    }


    const handlePokemonSearchInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchedPokemon(e.target.value);
    }
    const handlePokemonSearchSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchPokemonData();
    }
    // const handlePokemonSpriteSelection = (e : React.ChangeEvent<HTMLInputElement>) => {
    //     setSelectedSprite(e.target.value as "front_default" || "front_shiny");
    // }
    // const handlePokemonAbilitySelection = (abilityName : string) => {
    //     setSelectedAbility(abilityName);
    // }

    return (
        <div>
            <h2>Search for a pokemon</h2>
            <form onSubmit={handlePokemonSearchSubmit}>
                <input type="text" placeholder='Search...' value={searchedPokemon} onChange={handlePokemonSearchInput}/>
                <button type='submit'>Search</button>
            </form>

            {pokemonData && (
                <div>
                    {/* display searched pokemon's name */}
                    <h2>{searchedPokemon}</h2>
                <SpriteSelector sprites={pokemonData.sprites}></SpriteSelector>
                    {/* displays options for selecting sprites */}
                    {/* {pokemonData.sprites[selectedSprite] ? (
                        <img src={pokemonData.sprites[selectedSprite]} alt="" />
                    ) : (
                        <p>no sprite available</p>
                    )} */}
                    {/* <div>
                        <label>
                            <input 
                                type="radio"
                                value="front_default"
                                checked={selectedSprite === "front_default"}
                                onChange={handlePokemonSpriteSelection} 
                                />
                                Front
                        </label>
                        <label>
                            <input 
                                type="radio"
                                value="front_shiny"
                                checked={selectedSprite === "front_shiny"}
                                onChange={handlePokemonSpriteSelection} 
                                />
                                Front Shiny
                        </label>
                    </div> */}

                    {/* display selection options for pokemon abilities + description  by importing component in charge of this function*/}
                    <AbilitiesSelector abilities={abilities}></AbilitiesSelector>
                </div>
            )}
        </div>
    )
}

export default PokemonTeamCreator;