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
                name: string,
                url: string
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
    moves: MoveSet,
    stats: Stattest[],
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

export interface Stattest{
    id: number, 
    effort: number,
    individual: number,
    name: string | null,
    url: string | null,
    base_stat: number
}

export interface Stats {
    base_stat: number;
    effort: number;
    stat: { 
        name: string, 
        url: string 
    }
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

export interface Move{
    name: string,
}

export interface Moves {
    id: number,
    name: string | null,
    url: string | null,
}

export interface MoveSet{
    'move1': string,
    'move2': string,
    move3: string,
    move4: string 
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
    flavor_Text: string
}

export interface AbilityAndId {
    name: string,
    id: number,
    flavor_Text: string,
}

export interface Nature {
    name: string;
    increasedStat: string;
    decreasedStat: string;
}