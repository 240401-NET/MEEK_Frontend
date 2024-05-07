export interface Pokemon {
        // From PokeAPI
        name: string;
        id: number;
        types: {
            type : {
                name: string
            }; 
        } [];
        abilities: {
            ability: {
                name: string, 
                url: string
            }; 
        } [];
        moves: {
            move: {
                name: string
            }; 
        } [];
        stats: {
            base_stat: number;
            effort: number;
            stat: { name: string; url: string };
        }[];
         
        sprites: {
            front_default : string, 
            front_shiny : string 
        }

        // user defined based off interaction with user
}

export interface PokemonTeamMember {
    
    pkmApiId: number,
    name: string, 
    nickname: string,
    level: number,
    chosenAbility: string,
    gender: boolean,
    isShiny: boolean,
    teraType: string,
    heldItem: string,
    rosterOrder: number,
    nature: string
    pokemonMoveSet: MoveSet,
    pokemonStats: StatImplementation[],
}

export interface PokemonTeam {
    name: string,
    pokemonTeamMembers: PokemonTeamMember[]
}

export interface BackEndPokemonTeamInterface {
    id: number,
    name: string,
    pokemonTeamMembers: PokemonTeamMember[]
}

export interface Stat{
    id: number,
    effort: number,
    individual: number,
    name: string | null,
    url: string | null,
    PkmTmId: number,
    Total: number,
}

export interface StatImplementation {
    effort: number,
    individual: number,
    name: string
}

export interface Move {
    id: number,
    name: string | null,
    url: string | null,
}

export interface MoveSet {
    move1: string,
    move2: string,
    move3: string,
    move4: string,
}