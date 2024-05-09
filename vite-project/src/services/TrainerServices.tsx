import { BackEndPokemonTeamInterface, PokemonTeamMember } from "../models/Pokemon";

export const getAllTrainerTeams =  () => {
    return fetch ('http://localhost:5177/Team', {
        mode: 'cors',
        credentials: "include",
        headers: {
            "Content-type": "application/json"
            }
        })
        .then (response => {
           return response.json();
        })
        .catch (error => {
            // window.alert("Signin unsuccessful. Please try again!")
            console.log(error);
            throw error;
        })
}

export const createATeam = async (teamName: string) => {
    return await fetch ('http://localhost:5177/Team', {
        method: 'POST',
        mode: 'cors',
        credentials: "include",
        body: JSON.stringify({
            name : teamName,
            pokemonTeamMembers: [],

        }),
        headers: {
            "Content-type": "application/json"
            }
        })

        .then (response => {
           return response.json();
        })
        .catch (error => {
            // window.alert("Signin unsuccessful. Please try again!")
            console.log(error);
            throw error;
        })
}

export const UpdateATeam = async (id: number, name: string, pokemonTeamMembers : PokemonTeamMember[]) => {
    return await fetch ('http://localhost:5177/Team', {
        method: 'Put',
        mode: 'cors',
        credentials: "include",
        body: JSON.stringify({
            id: id,
            name: name,
            pokemonTeamMembers: pokemonTeamMembers,
        }),
        headers: {
            "Content-type": "application/json"
            }
        })

        .then (response => {
           return response.json();
        })
        .catch (error => {
            // window.alert("Signin unsuccessful. Please try again!")
            console.log(error);
            throw error;
        })
}

export const DeleteATeam = async (id_number : number) => {
    return await fetch ('http://localhost:5177/Team', {
        method: 'DELETE',
        mode: 'cors',
        credentials: "include",
        body: JSON.stringify({
            id: id_number,
        }),
        headers: {
            "Content-type": "application/json"
            }
        })

        .then (response => {
           return response.json();
        })
        .catch (error => {
            // window.alert("Signin unsuccessful. Please try again!")
            console.log(error);
            throw error;
        })
}