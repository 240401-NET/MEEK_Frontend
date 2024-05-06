import React from 'react';
import { useSavePokemon } from '../context/SavePokemonContext';
import { usePokemonData } from '../context/PokemonDataContext';
import {  PokemonTeamMember } from '../models/Pokemon';
import { useNickname } from '../context/NicknameContext';
import { useLevel } from '../context/LevelContext';
import { useAbility } from '../context/AbilitiesContext';
import { useGender } from '../context/GenderContext';
import { useSprite } from '../context/Spritecontext';
import { useTeraType } from '../context/TeraTypeContext';
import { useNature } from '../context/NatureContext';
import { useMove } from '../context/MoveContext';
import { useStat } from '../context/StatContext';

const SaveComponent : React.FC = () => {
    const {pokemonData, handleSetPokemonData} = usePokemonData();
    const {savedPokemonTeam, editMode, setEditMode, setSavedPokemonTeam, teamName, rosterOrder} = useSavePokemon()
    const {nickname} = useNickname();
    const {level} = useLevel();
    const {selectedAbility} = useAbility();
    const {gender} = useGender();
    const {shiny, sprite} = useSprite();
    const {teraType} = useTeraType();
    const {nature} = useNature();
    const {pokemonMoveSet} = useMove();
    const {statsArray} = useStat();

const updatePokemonTeam = () => {
    let condition = (savedPokemonTeam); // Replace with your actual condition
    console.log('Condition evaluates to:', condition);
    
    if (condition) {
      // Code to execute if the condition is true
      console.log("yay?")
    } else {
      // Code to execute if the condition is false
      console.log("uh oh")
    }
    if (pokemonData) {
        const editedPokemon : PokemonTeamMember = {
            pokemonData: pokemonData,
            pkmApiId: pokemonData.id,
            nickname: nickname,
            sprite: sprite,
            custom_id: '',
            level: level,
            chosenAbilityId : selectedAbility,
            gender: gender,
            isShiny: shiny,
            teraType: teraType,
            heldItemId: 50,
            pokemonTeamId: 1,
            rosterOrder: rosterOrder,
            nature: nature,
            moves: pokemonMoveSet,
            stats: statsArray
        }
        console.log(editedPokemon)  
        let condition2 = (editMode && savedPokemonTeam)
        console.log('Condition evaluates to:', condition);
        if (condition2) {
            // Code to execute if the condition is true
            console.log("yay?")
          } else {
            // Code to execute if the condition is false
            console.log("uh oh")
          }
        if (editMode && savedPokemonTeam) {
            const updatedPokemon = savedPokemonTeam?.pokemonTeamMembers.map((pokemon) =>
                pokemon.nickname === editedPokemon.nickname ?
                {...pokemon, pokemon: editedPokemon, 
                    custom_id:`${pokemonData.name}-${nickname}-${savedPokemonTeam ? savedPokemonTeam.pokemonTeamMembers.length + 1 : 1}`,
                } : pokemon)
                const updatedTeam = {
                    ...savedPokemonTeam,
                    pokemonTeamMembers: updatedPokemon,
                }
                setSavedPokemonTeam(updatedTeam);
                localStorage.setItem(`${savedPokemonTeam.name}`, JSON.stringify(updatedTeam))
            }
        else {
            console.log("we got here");
            const newPokemon : PokemonTeamMember = {
                pokemonData: pokemonData,
                pkmApiId: pokemonData!.id,
                nickname: nickname,
                sprite: sprite,
                custom_id: `${pokemonData.name}-${nickname}-${savedPokemonTeam ? savedPokemonTeam.pokemonTeamMembers.length + 1 : 1}`,
                level: level,
                chosenAbilityId : selectedAbility,
                gender: gender,
                isShiny: shiny,
                teraType: teraType,
                heldItemId: 50,
                pokemonTeamId: 1,
                rosterOrder: rosterOrder,
                nature: nature,
                moves: pokemonMoveSet,
                stats: statsArray
            }
            const updatedTeam = savedPokemonTeam
            ? {
                ...savedPokemonTeam,
                pokemonTeamMembers: [...(savedPokemonTeam.pokemonTeamMembers || []), newPokemon]
            } : {
                id: undefined,
                name: teamName,
                trainerId: undefined,
                pokemonTeamMembers: [newPokemon]
            } 
            console.log("new pokemon:" , newPokemon)
            setSavedPokemonTeam(updatedTeam);
            localStorage.setItem('savedPokemonTeam', JSON.stringify(updatedTeam));
            setEditMode(false);
        }
    }
}

    const clearPageData = () => {
        handleSetPokemonData(null);
    }


    return (
        <>
        <button type="submit" onClick={() => {updatePokemonTeam(), clearPageData()}}>Save</button>
        </>
    )
}

export default SaveComponent