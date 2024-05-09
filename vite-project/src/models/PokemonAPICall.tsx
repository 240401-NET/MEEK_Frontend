export const fetchPokemonDataFromAPI  = (pokemonName: string) => {
    const url :string = `http://localhost:5177/pokemon/name/${pokemonName.toLowerCase()}`
    if(pokemonName !== "") {
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
}

