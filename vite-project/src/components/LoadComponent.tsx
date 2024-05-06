import React from 'react';
import { useSavePokemon } from '../context/SavePokemonContext';
import { usePokemonData } from '../context/PokemonDataContext';
import {  MoveSet, Pokemon, PokemonTeamMember, Stattest } from '../models/Pokemon';
import { useNickname } from '../context/NicknameContext';
import { useLevel } from '../context/LevelContext';
import { useAbility } from '../context/AbilitiesContext';
import { useGender } from '../context/GenderContext';
import { useSprite } from '../context/Spritecontext';
import { useTeraType } from '../context/TeraTypeContext';
import { useNature } from '../context/NatureContext';
import { useMove } from '../context/MoveContext';
import { useStat } from '../context/StatContext';

const LoadComponent : React.FC = () => {
    const {handleSetPokemonData, pokemonData} = usePokemonData();
    const {setEditMode, setRosterOrder, savedPokemonTeam, editMode} = useSavePokemon()
    const {handleNickname} = useNickname();
    const {handleLevelSelect} = useLevel();
    const {handleSelectedAbility} = useAbility();
    const {handleGender} = useGender();
    const {handleShiny, handleSprite} = useSprite();
    const {handleTeraTypeSelection} = useTeraType();
    const {handleSelectedNature} = useNature();
    const {setPokemonMoveSet} = useMove();
    const {setStatsArray} = useStat();

    
    const loadPokemonOnClick = (selectedPokemon: { pokemonData: Pokemon, pkmApiId: number, nickname: string, custom_id: string, sprite: string, gender: boolean
        teraType: string, chosenAbilityId: string, nature: string, level: number, rosterOrder: number, moves: MoveSet, stats: Stattest[]
    }) => {
        handleSetPokemonData(selectedPokemon.pokemonData);
        console.log(pokemonData);
        handleNickname(selectedPokemon.nickname);
        handleSprite(selectedPokemon.sprite);
        handleShiny();
        handleGender(selectedPokemon.gender);
        handleTeraTypeSelection(selectedPokemon.teraType);
        handleSelectedAbility(selectedPokemon.chosenAbilityId);
        handleSelectedNature(selectedPokemon.nature);
        handleLevelSelect(selectedPokemon.level);
        setRosterOrder(selectedPokemon.rosterOrder);
        setPokemonMoveSet(selectedPokemon.moves);
        setStatsArray(selectedPokemon.stats)

        
        // setCurrentIVs(selectedPokemon.ivs)
        setEditMode(true);
        console.log(editMode)
    }

    return (
        <>
        {(savedPokemonTeam && savedPokemonTeam.pokemonTeamMembers.length > 0) && (
            <div>
                <h3>Saved Pokemon</h3>
                <ul>
                    {savedPokemonTeam.pokemonTeamMembers.map((pokemon) =>(
                        <li key={pokemon.custom_id} onClick={() => loadPokemonOnClick(pokemon)}>
                            {pokemon.pokemonData?.name}: {pokemon.teraType}    
                        </li>

                    ))}
                </ul>
            </div>
        )}
        </>
    )
}

export default LoadComponent