export interface Pokemon {
        // From PokeAPI
        name: string
        types: {type : {name: string} } []
        abilities : {ability : {name: string , url: string} } []
        moves: {move: {name: string} } []
        stats: {base_stat: number, effort : number, stat: {name: string} } []
        sprites: {front_default : string, front_shiny : string }
        sprite :string | null
        teraType: string | null
        move_1: string;
        move_2: string;
        move_3: string;
        move_4: string;
        // user defined based off interaction with user
        nature: string | null;

        ivs: {
            hp: number | null;
            attack: number | null;
            // defense: number | null
            // special_attack: number | null
            // special_defense: number | null
            // speed: number | null
        } | null;
        evs: {
            hp: number | null
            attack: number | null
            defense: number | null
            special_attack: number | null
            special_defense: number| null
            speed: number | null
        } | null
        level: number | null
        moveSet: string[] | null
}