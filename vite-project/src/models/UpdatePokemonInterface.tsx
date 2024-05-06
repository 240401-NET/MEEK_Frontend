import { Pokemon, Stat , MoveSet, PokemonTeam, Stattest} from "../models/Pokemon";

export interface UpdatePokemonInterface {
    savedPokemonTeam: PokemonTeam,
    editMode: boolean,
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
    setSavedPokemonTeam: React.Dispatch<React.SetStateAction<PokemonTeam>>,
    teamId: number,
    teamName: string, 
    trainerId: number,
    pokemonResponseData: Pokemon,
    custom_id: string,
    pkmApiId: number,
    nickname: string,
    level: number, 
    chosenAbilityId: string,
    gender: boolean,
    isShiny: boolean | null,
    teraType: string | null,
    heldItemId: number,
    pokemonTeamId: number,
    rosterOrder: number,
    nature: string | null,
    moves: MoveSet,
    stats: Stattest[]
}