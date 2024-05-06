import React, { useState, useEffect} from "react";
import { usePokemonData } from "../context/PokemonDataContext";
import { NavLink as Link } from "react-router-dom";
// import { useSprite } from "../context/Spritecontext";
import AbilitiesComponent from "../components/AbilityComponent";
import TeraTypeComponent from "../components/TeraTypeComponent";
import SpriteComponent from "../components/SpriteComponent";
import NatureComponent from "../components/NatureComponent";
import LevelComponent from "../components/LevelComponent";
import StatComponent from "../components/StatComponent";
import StatRenderingComponent from "../components/StatRenderingComponent";
import MoveComponent from "../components/MoveComponent";
import GenderComponent from "../components/GenderComponent";
import NicknameComponent from "../components/NicknameComponent";
// import { Stattest } from "../models/Pokemon";
// import { useAbility } from "../context/AbilitiesContext";
// import AbilitiesSelector from "../components/pokemonComponents/AbilitiesSelector";


export const TeamBuilder : React.FC = () => {
    const {fetchPokemonApiData, pokemonData, handleSetPokemonData} = usePokemonData();
    const [searchedPokemon, setSearchedPokemon] = useState("");

    useEffect(() => {
        if(true)
            handleSetPokemonData(pokemonData)
    }, [])

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetchPokemonApiData(searchedPokemon);
    }

    const clearPageData = () => {
        handleSetPokemonData(null);
        setSearchedPokemon('');
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
                    value={searchedPokemon}
                    onChange={(e) => setSearchedPokemon(e.target.value)}
                />
                <button type='submit'>Search</button>
            </form>
            <button type="submit" onClick={() => clearPageData()}>Clear</button>
            {pokemonData && (
                <div>
                    <p>{pokemonData.name}</p>
                    <p>{pokemonData.id}</p>
                    <NicknameComponent></NicknameComponent>
                    <GenderComponent></GenderComponent>
                    <SpriteComponent></SpriteComponent>
                    <AbilitiesComponent></AbilitiesComponent>
                    <TeraTypeComponent></TeraTypeComponent>
                    <NatureComponent></NatureComponent>
                    <LevelComponent></LevelComponent>
                    <StatComponent></StatComponent>
                    <StatRenderingComponent></StatRenderingComponent>
                    <MoveComponent></MoveComponent>
                </div>

            )}
        </>
    )

    
}