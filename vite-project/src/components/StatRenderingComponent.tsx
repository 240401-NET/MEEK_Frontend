import React , {useEffect} from 'react';
import { useStat } from '../context/StatContext';
import { usePokemonData } from '../context/PokemonDataContext';
import { useNature } from '../context/NatureContext';
import { Stattest } from '../models/Pokemon';
import { useLevel } from '../context/LevelContext';

// const initialStatTotalState: AdjustedStatTotals = {
//     'hp': 0,
//     'attack': 0,
//     'defense': 0, 
//     'special-attack': 0,
//     'special-defense': 0,
//     'speed': 0,

// };

const StatRenderingComponent : React.FC = () => {
    const {pokemonData} = usePokemonData();
    const {statsArray} = useStat();
    const {nature, natureData} = useNature();
    const {level} = useLevel()
    // const [adjustedStatTotals, setAdjustedStatTotals] = useState<AdjustedStatTotals>(initialStatTotalState)

    useEffect(() => {
        calculateBaseStatsWithNatures(statsArray, level, nature);
    }, [pokemonData, statsArray, nature])

    const calculateBaseStatsWithNatures = (statsArray : Stattest[], level: number, nature: string)  => {
        return statsArray.map((stat) => {
            const iv = stat.individual;
            const ev = stat.effort;

            let baseStat = stat.base_stat;

            if(stat.name === 'hp') {
                baseStat = Math.floor((stat.base_stat * 2 + iv + (ev / 4)) * level / 100 + 10 + level)
            } else {
                let multiplier : number = 1.0;
                const selectedNatureObj = natureData.find(n => n.name === nature)
                if (selectedNatureObj) {
                    if (stat.name === selectedNatureObj.increasedStat) {
                        multiplier = 1.1;
                    }
                    else if (stat.name === selectedNatureObj.decreasedStat){
                        multiplier = 0.9;
                    }
                }
                baseStat = Math.floor(((stat.base_stat * 2 + iv +(ev / 4)) * level / 100 +5) * multiplier)
            }
            return {...stat, base_stat: baseStat};
        });
    };

    const adjustedStats = calculateBaseStatsWithNatures(statsArray, level, nature)

    return(
        <>
        <h3>Total Stats</h3>
            <ul>
                {adjustedStats.map((stat) => (
                    <li key={stat.name}>
                        {stat.name} : {stat.base_stat}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default StatRenderingComponent