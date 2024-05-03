import {PokemonTeamMember} from "../models/Pokemon";
import { UpdatePokemonInterface } from "../models/UpdatePokemonInterface";

export const updatePokemonTeam = (options : UpdatePokemonInterface) =>{
    const {
    savedPokemonTeam,
    editMode,
    setEditMode,
    setPokemonTeam,
    teamId,
    teamName,
    trainerId,
    pokemonResponseData,
    custom_id,
    pkmApiId,
    nickname,
    level,
    chosenAbilityId,
    gender,
    isShiny,
    teraType,
    heldItemId,
    pokemonTeamId,
    rosterOrder,
    nature,
    moves,
    stats } = options

    if (pokemonResponseData) {
        const editedPokemon : PokemonTeamMember = {
            pokemonData: pokemonResponseData,
            pkmApiId: pkmApiId,
            nickname: nickname,
            custom_id: custom_id,
            level: level,
            chosenAbilityId : chosenAbilityId,
            gender: gender,
            isShiny: isShiny,
            teraType: teraType,
            heldItemId: heldItemId,
            pokemonTeamId: pokemonTeamId,
            rosterOrder: rosterOrder,
            nature: nature,
            moves: moves,
            stats: stats
        }
        if (editMode && savedPokemonTeam) {
            const updatedPokemon = savedPokemonTeam?.pokemonTeamMembers.map((pokemon) =>
                pokemon.custom_id === editedPokemon.custom_id ?
                {...pokemon, pokemon: editedPokemon, 
                    custom_id:`pokemon-${pokemonResponseData.name}-${savedPokemonTeam ? savedPokemonTeam.pokemonTeamMembers.length + 1 : 1}`
                } : pokemon)
                const updatedTeam = {
                    ...savedPokemonTeam,
                    pokemonTeamMembers: updatedPokemon,
                }
                setPokemonTeam(updatedTeam);
                localStorage.setItem(`${savedPokemonTeam.name}`, JSON.stringify(updatedTeam))
            }
        } else {
            const newPokemon = {
                pokemonData: pokemonResponseData,
                pkmApiId: pkmApiId,
                nickname: nickname,
                custom_id: custom_id,
                level: level,
                chosenAbilityId : chosenAbilityId,
                gender: gender,
                isShiny: isShiny,
                teraType: teraType,
                heldItemId: heldItemId,
                pokemonTeamId: pokemonTeamId,
                rosterOrder: rosterOrder,
                nature: nature,
                moves: moves,
                stats: stats
            }
            const updatedTeam = savedPokemonTeam
            ? {
                ...savedPokemonTeam,
                pokemonTeamMembers: [...(savedPokemonTeam.pokemonTeamMembers || []), newPokemon]
            } : {
                id: teamId,
                name: teamName,
                trainerId: trainerId,
                pokemonTeamMembers: [newPokemon]
            } 
            setPokemonTeam(updatedTeam);
            localStorage.setItem('savedPokemonTeam', JSON.stringify(updatedTeam));
            setEditMode(false);
    }
}