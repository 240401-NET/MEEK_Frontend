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
    
    pokemonData : Pokemon | null,
    pkmApiId: number,
    nickname: string | null,
    custom_id: string,
    level: number,
    chosenAbilityId: number,
    gender: boolean,
    isShiny: boolean | null;
    teraType: string | null;
    heldItemId: number,
    pokemonTeamId: number,
    rosterOrder: number,
    nature: string | null,
    moves: Move[],
    stats: Stat[],
}

export interface PokemonTeam {
    id: number,
    name: string,
    trainerId: number,
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

export interface Move {
    id: number,
    name: string | null,
    url: string | null,
}

export interface Sprite {
    front_shiny: string,
    front_default: string, 
}

export interface Ability {
    name: string,
    url: string
}

export interface AbilityText {
    name: string,
    flavor_Text: string,
}

export interface AbilityAndId {
    name: string,
    id: number,
    flavor_Text: string,
}