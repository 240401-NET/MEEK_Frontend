export const fetchPokemonDataFromAPI  = (pokemonName: string) => {
    const url :string = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    return fetch(url)
        .then( response => {
            // console.log(url)
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


export const getAllTrainerTeams = () => {
    const url : string = 'http://localhost:5177/Team'
    return fetch(url, {
        method: "GET",
        mode: 'cors',
        credentials: "include",
        headers: {
            "Content-type": "application/json"
            }
        })
        .then (response => {
            console.log(response.json());
        })
        .then(promise => {
            console.log(promise)
        })
        .catch (error => {
            // window.alert("Signin unsuccessful. Please try again!")
            console.log(error);
            throw error;
        })
}
