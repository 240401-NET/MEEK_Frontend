export const fetchPokemonDataFromAPI  = (pokemonName: string) => {

    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
        .then( response => {
            if (!response) {
                throw new Error ('Failed to retrieve pokemon data');
            }
            return response.json()

        })
        .catch(error => {
                console.error(error);
                throw error;
            });
}

