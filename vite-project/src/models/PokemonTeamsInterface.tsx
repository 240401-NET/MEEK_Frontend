import { Pokemon } from "./Pokemon";

export interface PokemonTeam {  
    pokemons: {
        id: string;
        data: Pokemon;
        sprite: string;
        teraType: string;
        ability: string;
        move_1: string;
        move_2: string;
        move_3: string;
        move_4: string;
        // selectedNature?: string;

        // selectedIVs?: { [key: string]: number | null };
        // selectedEVs?: { [key: string]: number | null };
        // level?: number | null;
        // moveSet?: string[] | null;
    } [];
}