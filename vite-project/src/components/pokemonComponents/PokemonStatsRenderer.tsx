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
    // const [currentNature, setCurrentNature] = useState<string>('Adamamant')

    const calulateBaseStatsWithNatures = (baseStats : Stat[], level :number, nature: Nature | null) => {
        return baseStats.map(stat => {
            let baseStat: number = stat.base_stat;
            if (stat.stat.name === 'hp') {
                baseStat = Math.floor((stat.base_stat * 2 + 31 + (100 / 4)) * level / 100 + 10 + level);
            } else {
                let multiplier : number = 1.0;
                if (nature) {
                    if (stat.stat.name === nature.increasedStat) {
                        multiplier = 1.1;
                    }
                    else if (stat.stat.name === nature.decreasedStat){
                        multiplier = 0.9;
                    }
                }
                baseStat = Math.floor(((stat.base_stat * 2 + 31 +(100 / 4)) * level / 100 +5) * multiplier)
            }
            return {...stat, base_stat: baseStat};
        });
    };

    const adjustedStats = calulateBaseStatsWithNatures(stats, pokemonLevel, natureData[0]);
    const handlePokemonLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPokemonLevel(parseInt(e.target.value));
    }
    return (
        <div>
            <h3>Base Stats</h3>
            <ul>
                {adjustedStats.map((stat) => (
                    <li key={stat.stat.name}>
                        {stat.stat.name} : {stat.base_stat}
                    </li>
                ))}
            </ul>
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
        </div>
    )
}

export default PokemonStatsRenderer