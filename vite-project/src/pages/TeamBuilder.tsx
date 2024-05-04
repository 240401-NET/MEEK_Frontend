import React, { useState, } from "react";
import { usePokemonData } from "../context/PokemonDataContext";
import { NavLink as Link } from "react-router-dom";
import { useSprite } from "../context/Spritecontext";


export const TeamBuilder : React.FC = () => {
    const {fetchPokemonApiData, pokemonData} = usePokemonData();
    const [searchedPokemon, setSearchedPokemon] = useState("")
    const {sprite, handleSprite, handleShiny} = useSprite();


    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetchPokemonApiData(searchedPokemon);
    }
    
    const handleSpriteSelection = (name: string) => {
        handleSprite(name);
        handleShiny();
    }

    return (
        <>
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
            {pokemonData && (
                <div>
                    <p>{pokemonData.name}</p>
                    <p>{pokemonData.id}</p>
                    <h3>Select a Sprite:</h3>
                        <img 
                            src={sprite || ''}
                            alt="Pokemon Sprite" 
                        />
                    <button onClick={() => handleSpriteSelection(pokemonData!.sprites.front_default!)}>Default</button>
                    <button onClick={() => handleSpriteSelection(pokemonData!.sprites.front_shiny)}>Shiny</button>
                </div>

            )}
        </>
    )
}