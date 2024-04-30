import { Pokemon } from "./Pokemon";

export interface PokemonTeam {  
    id: string,
    name: string,
    pokemons: {
        id: string;
        pokemon: Pokemon;
        selectedSprite: string;
        // selectedNature?: string;
        // selectedTeraType?: string;
        // selectedIVs?: { [key: string]: number | null };
        // selectedEVs?: { [key: string]: number | null };
        // level?: number | null;
        // moveSet?: string[] | null;
    } [];
}