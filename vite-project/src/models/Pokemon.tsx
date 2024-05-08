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

export interface Stat {
    id: number,
    baseStat: number,
    name: string,
    url: string,
    pkmApiId: number,
}

export interface StatImplementation {
    id: number,
    effort: number,
    individual: number,
    name: string,
    url: string,
    base_stat: number
}

export interface IVStats{
    'hp': number,
    'attack': number,
    'defense': number,
    'special-attack': number,
    'special-defense': number,
    'speed': number,
}

export interface EVStats{
    'hp': number,
    'attack': number,
    'defense': number, 
    'special-attack': number,
    'special-defense': number,
    'speed': number,
}

export interface AdjustedStatTotals {
    'hp': number,
    'attack': number,
    'defense': number, 
    'special-attack': number,
    'special-defense': number,
    'speed': number,
}

export const initialIVState: IVStats = {
    'hp': 31,
    'attack': 31,
    'defense': 31, 
    'special-attack': 31,
    'special-defense': 31,
    'speed': 31,

};

export const initialEVState: EVStats = {
    'hp': 0,
    'attack': 0,
    'defense': 0, 
    'special-attack': 0,
    'special-defense': 0,
    'speed': 0,

};

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

export const MoveSetInitiailState: MoveSet = {
    move1: "",
    move2: "",
    move3: "",
    move4: "",
}

export interface PokemonBackEndApiCall {
    id: number,
    name: string,
    pokemonBaseStats: 
        {
            id: number,
            name: string,
            baseStat: number,
            url: string,
            pkmApiId: number
        } [],
    pokemonSprite:
        {
            front_default: string,
            front_shiny: string,
            front_female: string,
            front_shiny_female: string,
            pkmApiId: number
        },
    abilities:
        {
            id: number,
            isHidden: boolean,
            slot: number,
            name: string,
            url: string
        } [],
    moves: 
        {
            id: number,
            name: string,
            url: string
        } [],
    types: 
        {
            id: number,
            slot: number,
            url: string,
            name: string
        } [],
}