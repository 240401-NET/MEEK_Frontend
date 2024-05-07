import { PokemonTeamMember } from "./Pokemon";

export interface CreateTeamInterface {
    name: string,
    pokemonTeamMember: PokemonTeamMember[]
}

export interface UpdatePokemonTeamInterface {
    id: number,
    name: string,
    pokemonTeamMember: PokemonTeamMember[]
}