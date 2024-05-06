import {MoveSet, Pokemon, PokemonTeam, PokemonTeamMember, Stattest} from "../models/Pokemon";
// import { UpdatePokemonInterface } from "../models/UpdatePokemonInterface";

export const updatePokemonTeam =  
(
    savedPokemonTeam : PokemonTeam,
    editMode : boolean,
    setEditMode : React.Dispatch<React.SetStateAction<boolean>>,
    setSavedPokemonTeam : React.Dispatch<React.SetStateAction<PokemonTeam>>,
    teamName: string,
    pokemonResponseData: Pokemon,
    pkmApiId: number,
    nickname: string,
    level: number,
    chosenAbilityId: string,
    gender: boolean,
    isShiny: boolean,
    teraType: string,
    heldItemId: number,
    pokemonTeamId: number,
    rosterOrder: number,
    nature: string,
    moves: MoveSet,
    stats: Stattest[] 
) => {

    if (pokemonResponseData) {
        const editedPokemon : PokemonTeamMember = {
            pokemonData: pokemonResponseData,
            pkmApiId: pkmApiId,
            nickname: nickname,
            custom_id: '',
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
                    custom_id:`pokemon-${nickname}-${savedPokemonTeam ? savedPokemonTeam.pokemonTeamMembers.length + 1 : 1}`
                } : pokemon)
                const updatedTeam = {
                    ...savedPokemonTeam,
                    pokemonTeamMembers: updatedPokemon,
                }
                setSavedPokemonTeam(updatedTeam);
                localStorage.setItem(`${savedPokemonTeam.name}`, JSON.stringify(updatedTeam))
            }
        } else {
            const newPokemon = {
                pokemonData: pokemonResponseData,
                pkmApiId: pkmApiId,
                nickname: nickname,
                custom_id: `pokemon-${nickname}-${savedPokemonTeam ? savedPokemonTeam.pokemonTeamMembers.length + 1 : 1}`,
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
                id: undefined,
                name: teamName,
                trainerId: undefined,
                pokemonTeamMembers: [newPokemon]
            } 
            setSavedPokemonTeam(updatedTeam);
            localStorage.setItem('savedPokemonTeam', JSON.stringify(updatedTeam));
            setEditMode(false);
    }
}