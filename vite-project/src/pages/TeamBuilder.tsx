import React, { useState} from "react";
import { usePokemonData } from "../context/PokemonDataContext";
import { NavLink as Link } from "react-router-dom";
// import { useSprite } from "../context/Spritecontext";
import AbilitiesComponent from "../components/AbilityComponent";
import TeraTypeComponent from "../components/TeraTypeComponent";
import SpriteComponent from "../components/SpriteComponent";
import NatureComponent from "../components/NatureComponent";
import LevelComponent from "../components/LevelComponent";
import StatComponent from "../components/StatComponent";
// import { Stattest } from "../models/Pokemon";
// import { useAbility } from "../context/AbilitiesContext";
// import AbilitiesSelector from "../components/pokemonComponents/AbilitiesSelector";


export const TeamBuilder : React.FC = () => {
    const {fetchPokemonApiData, pokemonData} = usePokemonData();
    const [searchedPokemon, setSearchedPokemon] = useState("");

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetchPokemonApiData(searchedPokemon);
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
                    <SpriteComponent></SpriteComponent>
                    <AbilitiesComponent></AbilitiesComponent>
                    <TeraTypeComponent></TeraTypeComponent>
                    <NatureComponent></NatureComponent>
                    <LevelComponent></LevelComponent>
                    <StatComponent></StatComponent>
                </div>

            )}
        </>
    )

    
}