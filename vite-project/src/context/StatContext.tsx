import React, {useState, useContext, useEffect, createContext} from 'react';
import { usePokemonData } from "./PokemonDataContext";
import { Stats, IVStats, EVStats, Stattest } from '../models/Pokemon';

interface StatContextType {
    statsArray: Stattest[],
    APIStatsArray: Stats[],
    currentIVs: IVStats,
    currentEVs: EVStats,
    handleIVStatsArrary: (stat: string, value: number) => void,
    handleEVStatsArrary: (stat: string, value: number) => void,
}

const initialIVState: IVStats = {
    'hp': 31,
    'attack': 31,
    'defense': 31, 
    'special-attack': 31,
    'special-defense': 31,
    'speed': 31,

};

const initialEVState: EVStats = {
    'hp': 0,
    'attack': 0,
    'defense': 0, 
    'special-attack': 0,
    'special-defense': 0,
    'speed': 0,

};

interface Props {
    children: React.ReactNode
}

const StatContext = createContext<StatContextType>({
    statsArray: [],
    APIStatsArray: [],
    currentIVs: initialIVState,
    currentEVs: initialEVState,
    handleIVStatsArrary: () => {},
    handleEVStatsArrary: () => {}

})

export const useStatContext = () => {
    const _context = useContext(StatContext);
    if (_context) {
        throw new Error("useStat must be used within a pokemon provider");
    }
    return _context;
}

export const StatProvider : React.FC<Props> = ({children}) => {
    const {pokemonData} = usePokemonData();
    const [APIStatsArray, setAPIStatsArray] = useState<Stats[]>([]);
    const [currentIVs, setCurrentIVs] = useState<IVStats>(initialIVState);
    const [currentEVs, setCurrentEVs] = useState<EVStats>(initialEVState);
    const [statsArray, setStatsArray] = useState<Stattest[]>([])


    useEffect(() => {
        SetsArray();
        console.log(statsArray)
    }, [pokemonData, APIStatsArray, statsArray, currentIVs, currentEVs])

    const SetsArray = () => {
        if (pokemonData) {
            const APIDatastatsArray = pokemonData?.stats.map((stat) => stat);
            if (JSON.stringify(APIDatastatsArray) !== JSON.stringify(APIStatsArray)){
                setAPIStatsArray(APIDatastatsArray)
            }
            const combinedStatsArray  = APIStatsArray.map((stat) => {
                const evValue = currentEVs[stat.stat.name as keyof EVStats]
                const ivValue = currentIVs[stat.stat.name as keyof IVStats]
                const urlParts = stat.stat.url.split('/');
                const idString = urlParts[urlParts.length - 2];
                return {
                    id: parseInt(idString),
                    effort: evValue,
                    individual: ivValue,
                    name: stat.stat.name,
                    url: stat.stat.url
                    }
            })
            if (JSON.stringify(combinedStatsArray) !== JSON.stringify(statsArray)){
                setStatsArray(combinedStatsArray!)
            }
        }
    }

    const handleIVStatsArrary = (stat: string, value: number ) =>{
            setCurrentIVs((prevIVs) => ({...prevIVs, [stat] : value}))

    }
    const handleEVStatsArrary = (stat: string, value: number ) =>{
        const previousIdData = currentIVs
        if (JSON.stringify(previousIdData) !== JSON.stringify(currentEVs)){
            setCurrentEVs((prevIVs) => ({...prevIVs, [stat] : value}))
        }
    }

    return (
        <StatContext.Provider value = {{statsArray, APIStatsArray, currentIVs, currentEVs, handleEVStatsArrary, handleIVStatsArrary}}>
            {children}
        </StatContext.Provider>
    )
}

export const useStat = () => useContext(StatContext)