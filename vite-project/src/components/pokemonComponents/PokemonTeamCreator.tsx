import './PokemonTeamCreator.css';
import React, {useState} from 'react';
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

const PokemonTeamCreator : React.FC = () => {

    const [searchedPokemon, setSearchedPokemon] = useState('');
    const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);

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
                
                    {/* displays options for selecting sprites */}
                    <SpriteSelector sprites={pokemonData.sprites}></SpriteSelector>

                    {/* display selection options for pokemon abilities + description  by importing component in charge of this function*/}
                    <AbilitiesSelector abilityUrls={pokemonData?.abilities.map(ability => ability.ability.url)}></AbilitiesSelector>
                </div>
            )}
        </div>
    )
}

export default PokemonTeamCreator;