import { PokemonTeamMember } from "../models/Pokemon";

export const getAllTrainerTeams = async () => {
    return await fetch ('http://localhost:5177/Team', {
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

export const UpdateATeam = async (id_number : number, teamName: string, updatedPokmonTeamMembersArray : PokemonTeamMember[]) => {
    return await fetch ('http://localhost:5177/Team', {
        method: 'Put',
        mode: 'cors',
        credentials: "include",
        body: JSON.stringify({
            id: id_number,
            name : teamName,
            pokemonTeamMembers: updatedPokmonTeamMembersArray,
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