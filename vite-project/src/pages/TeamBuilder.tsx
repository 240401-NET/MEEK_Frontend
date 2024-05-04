import React, { useState, } from "react";
import { usePokemonData } from "../context/PokemonDataContext";
import { NavLink as Link } from "react-router-dom";
import { useSprite } from "../context/Spritecontext";


export const TeamBuilder : React.FC = () => {
    const {fetchPokemonApiData, pokemonData} = usePokemonData();
    const [searchedPokemon, setSearchedPokemon] = useState("")
    const {sprites, shiny, sprite, handleSprite, handleShiny} = useSprite();


    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetchPokemonApiData(searchedPokemon);
    }
    
    const handleSprite = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setSprite(e.target.value)
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
                </div>

            )}
        </>
    )
}