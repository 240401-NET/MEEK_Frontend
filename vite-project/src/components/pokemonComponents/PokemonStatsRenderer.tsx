import React , {useState} from 'react'


interface Stat {
    base_stat: number
    effort : number
    stat: {name: string}
}

interface StatsProp {
    stats : Stat[]
}

interface Nature {
    name: string;
    increasedStat: string;
    decreasedStat: string;
  }

const PokemonStatsRenderer : React.FC<StatsProp> = ({stats}) => {
    const natureData : Nature[] = [
        { name: 'Adamant', increasedStat: 'attack', decreasedStat: 'special-attack' },
        { name: 'Bashful', increasedStat: 'none', decreasedStat: 'none' },
        { name: 'Bold', increasedStat: 'defense', decreasedStat: 'attack' },
        { name: 'Brave', increasedStat: 'attack', decreasedStat: 'speed' },
        { name: 'Calm', increasedStat: 'special-defense', decreasedStat: 'attack' },
        { name: 'Careful', increasedStat: 'special-defense', decreasedStat: 'special-attack' },
        { name: 'Docile', increasedStat: 'none', decreasedStat: 'none' },
        { name: 'Gentle', increasedStat: 'special-defense', decreasedStat: 'defense' },
        { name: 'Hardy', increasedStat: 'none', decreasedStat: 'none' },
        { name: 'Hasty', increasedStat: 'speed', decreasedStat: 'defense' },
        { name: 'Impish', increasedStat: 'defense', decreasedStat: 'special-attack' },
        { name: 'Jolly', increasedStat: 'speed', decreasedStat: 'special-attack' },
        { name: 'Lax', increasedStat: 'defense', decreasedStat: 'special-defense' },
        { name: 'Lonely', increasedStat: 'attack', decreasedStat: 'defense' },
        { name: 'Mild', increasedStat: 'special-attack', decreasedStat: 'defense' },
        { name: 'Modest', increasedStat: 'special-attack', decreasedStat: 'attack' },
        { name: 'Naive', increasedStat: 'speed', decreasedStat: 'special-defense' },
        { name: 'Naughty', increasedStat: 'attack', decreasedStat: 'special-defense' },
        { name: 'Quiet', increasedStat: 'special-attack', decreasedStat: 'speed' },
        { name: 'Quirky', increasedStat: 'none', decreasedStat: 'none' },
        { name: 'Rash', increasedStat: 'special attack', decreasedStat: 'special defense' },
        { name: 'Relaxed', increasedStat: 'defense', decreasedStat: 'speed' },
        { name: 'Sassy', increasedStat: 'special defense', decreasedStat: 'speed' },
        { name: 'Serious', increasedStat: 'none', decreasedStat: 'none' },
        { name: 'Timid', increasedStat: 'speed', decreasedStat: 'attack' },
    ]
    const [pokemonLevel, setPokemonLevel] = useState<number>(50);
    const [currentNature, setCurrentNature] = useState<string>('')
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
    const handlePokemonLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPokemonLevel(parseInt(e.target.value));
    }
    const handleNatureSelection = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentNature(e.target.value);
    }
    const handleIVChange = (statName: string, ivValue: number) => {
        setIVS(preIVs => ({...preIVs, [statName]: ivValue}))
    }
    const handleEVChange = (statName: string, evValue: number) => {
        setEVS(preEVs => ({...preEVs, [statName]: evValue}))
    }
    return (
        <div>
            <div>
                <label htmlFor="nature">
                    <p>Nature:</p>
                    <select id="nature" value={currentNature} onChange={handleNatureSelection}>
                        <option value="">None</option>
                        {natureData.map(nature =>(
                            <option key={nature.name} value={nature.name}>
                                {nature.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <label htmlFor="level">Set Pokemon Level : {pokemonLevel}</label>
                    <input 
                        type="range" 
                        id="level"
                        min="1"
                        max="100"
                        value={pokemonLevel}
                        onChange={handlePokemonLevelChange}
                    />
            </div>
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