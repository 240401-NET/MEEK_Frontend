import { Pokemon } from "./Pokemon";

export interface PokemonTeam {  
    pokemons: {
        id: string;
        data: Pokemon;
        sprite: string;
        teraType: string;
        // selectedNature?: string;

        // selectedIVs?: { [key: string]: number | null };
        // selectedEVs?: { [key: string]: number | null };
        // level?: number | null;
        // moveSet?: string[] | null;
    } [];
}