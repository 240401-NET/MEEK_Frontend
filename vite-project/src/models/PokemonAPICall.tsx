export const fetchPokemonDataFromAPI  = (pokemonName: string) => {
    const url :string = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    return fetch(url)
        .then( response => {
            // console.log(url)
            if (!response) {
                throw new Error ('Failed to retrieve pokemon data');
            }
            console.log(response)
            return response.json()

        })
        .catch(error => {
                console.error(error);
                throw error;
            });
}

