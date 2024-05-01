import React , {useState} from 'react'
import {natureData} from './PokemonNature'


interface Stat {
    base_stat: number
    effort : number
    stat: {name: string}
}

interface StatsProp {
    stats : Stat[]

}


const PokemonStatsRenderer : React.FC<StatsProp> = ({stats}) => {
    const [ivs, setIVS] = useState<Record<string, number>>({})
    const [evs, setEVS] = useState<Record<string, number>>({})

    const calulateBaseStatsWithNatures = (baseStats : Stat[], level :number, nature: string) => {
        return baseStats.map(stat => {
            const iv = ivs[stat.stat.name]
            const ev = evs[stat.stat.name]

            let baseStat: number = stat.base_stat;
            if (stat.stat.name === 'hp') {
                baseStat = Math.floor((stat.base_stat * 2 + iv + (ev / 4)) * level / 100 + 10 + level);
            } else {
                let multiplier : number = 1.0;
                const selectedNatureObj = natureData.find(n => n.name === nature)
                if (selectedNatureObj) {
                    if (stat.stat.name === selectedNatureObj.increasedStat) {
                        multiplier = 1.1;
                    }
                    else if (stat.stat.name === selectedNatureObj.decreasedStat){
                        multiplier = 0.9;
                    }
                }
                baseStat = Math.floor(((stat.base_stat * 2 + iv +(ev / 4)) * level / 100 +5) * multiplier)
            }
            return {...stat, base_stat: baseStat};
        });
    };

    const adjustedStats = calulateBaseStatsWithNatures(stats, pokemonLevel, currentNature);
    const handleIVChange = (statName: string, ivValue: number) => {
        setIVS(preIVs => ({...preIVs, [statName]: ivValue}))
    }
    const handleEVChange = (statName: string, evValue: number) => {
        setEVS(preEVs => ({...preEVs, [statName]: evValue}))
    }
    return (
        <div>
            <div>
                <h3>IVs and EVs</h3>
                <ul>
                    {stats.map(stat => (
                        <li key={stat.stat.name}>
                            {stat.stat.name} : IV <input type="number" value={ivs[stat.stat.name] || ""} onChange={(e) => handleIVChange(stat.stat.name, parseInt(e.target.value))}/>
                            {stat.stat.name} : EV <input type="number" value={evs[stat.stat.name] || ""} onChange={(e) => handleEVChange(stat.stat.name, parseInt(e.target.value))}/>
                        </li>
                    ))}
                </ul>
            </div>
            <h3>Total Stats</h3>
            <ul>
                {adjustedStats.map((stat) => (
                    <li key={stat.stat.name}>
                        {stat.stat.name} : {stat.base_stat}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PokemonStatsRenderer