import './DisplayPokemon.css'
import HeldItemList from './HeldItemList'
// import { useEffect, useState } from 'react'
// import { NavLink as Link } from 'react-router-dom';
import React, {useState, useEffect} from 'react'

// define what a pokemon object is
interface Pokemon {
    name: string
    types: {type : {name: string} } []
    abilities : {ability : {name: string } } []
    moves: {move: {name: string} } []
    stats: {base_stat: number, effort : number, stat: {name: string}} []
}

const TeamCreator: React.FC = () => {
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedMove, setSelectedMove] = useState('');
    const [baseStatTotal, setBaseStatTotal] = useState<number>(0);
    const [pokemonLevel, setPokemonLevel] = useState<number>(50);

    useEffect(() => {
        if(pokemonData)
            {
                const total  = pokemonData.stats.reduce((acc, curr) => acc + curr.base_stat, 0)
                setBaseStatTotal(total);
            }
    })

    const fetchPokemonData = async () => {
        try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
            if (!response.ok)
                {
                    throw new Error('Pokemon not found!')
                }
            const data: Pokemon = await response.json();
            setPokemonData(data);
            setError(null);
        }
        catch(error: any)
        {
            setError(error.message);
            setPokemonData(null);
        }
    }
    const handlePokemonSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPokemonName(e.target.value);
    }
    const handlePokemonSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault;
        fetchPokemonData();
    }
    const handlePokemonSelectedMove = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMove(e.target.value);
    }
    const handlePokemonLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPokemonLevel(parseInt(e.target.value));
    }

    return(
        <div>
            <form onSubmit={handlePokemonSearchSubmit}>
                <input type="text" value={pokemonName} onChange={handlePokemonSearchInput} />
                <button type="submit">Search</button>
            </form>

            {/* conditional rendering of error and error message */}
            {error && <p>{error}</p>}

            {/* conditional rendering of pokemon data */}
            {pokemonData && (
                <div>
                    {/* display pokemon name */}
                    <h2>{pokemonName}</h2>

                    {/* display all types */}
                    <p>Type: {pokemonData.types.map((type) => type.type.name).join(', ')}</p>

                    {/* display all abilities */}
                    <p>Abilities: {pokemonData.abilities.map((ability) => ability.ability.name).join(', ')}</p>

                    {/* display selectable list of all possible moves */}
                    <label htmlFor="moves">Select a move:</label>
                    <select id="moves" value={selectedMove} onChange={handlePokemonSelectedMove}>
                        {pokemonData.moves.map((move, index) =>
                            <option key={index} value={move.move.name}>
                                {move.move.name}
                            </option>
                        )}
                    </select>
                    {/* display base stats */}
                    <div>
                        <h3>Base Stats</h3>
                        {pokemonData.stats.map((stat, index) => (
                            <p key={index}>
                                {/* display pokemon stats in regards to the level that the user chooses-- right now IV automatically set at 31,
                                and EV for stat set at 100; need to implement code that dynamically takes in IV and EV value from user */}
                                {stat.stat.name}: {Math.floor((0.01*(stat.base_stat * 2 + 31 + Math.floor(0.25*100))* pokemonLevel)+5)}
                            </p>
                        ))}
                        {/* display base stat total */}
                        <h3>Base stat total: {baseStatTotal}</h3>
                    </div>
                    <label htmlFor="level">Set Pokemon Level</label>
                    <p>Current Level: {pokemonLevel}</p>
                    <input 
                        type="range" 
                        id="level"
                        min="1"
                        max="100"
                        value={pokemonLevel}
                        onChange={handlePokemonLevelChange}
                    />
                <HeldItemList />
                </div>
                // in terms of items, holdable items (starting from index 69 up to 173 that are battle items) does not include berries
            )}
        </div>
    );
};


export default TeamCreator;