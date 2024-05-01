import { Pokemon } from "./Pokemon";

export interface PokemonTeam {  
    pokemons: {
        id: string;
        data: Pokemon;
        sprite: string;
        teraType: string;
        ability: string;
        move_1: string | "";
        move_2: string | "";
        move_3: string | "";
        move_4: string | "";
        nature: string;
        level: number;

        ivs: {
            hp: number ;
            attack: number;
            defense: number;
            special_attack: number;
            special_defense: number;
            speed: number;
        }

        // selectedIVs?: { [key: string]: number | null };
        // selectedEVs?: { [key: string]: number | null };
    } [];
}