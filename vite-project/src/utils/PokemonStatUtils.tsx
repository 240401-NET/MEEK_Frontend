// import {useState} from 'react'
import { Stat, Pokemon } from '../models/Pokemon'

export const generateInitialStatState = (numStats: number, pokemonData: Pokemon) : Stat[] => {
    const initialStats : Stat[] = [];
    for (let i = 0; i <= numStats; i++) {
        const url = new URL (pokemonData.stats[i].stat.url);
        const idParameter = url.searchParams.get('id')
        initialStats.push({
            id: parseInt(idParameter!),
            effort: 0,
            individual: 31,
            name: pokemonData.stats[i].stat.name,
            url: pokemonData.stats[i].stat.url,
            PkmTmId: 0,
            Total: 0
        })
    }
    return initialStats
}