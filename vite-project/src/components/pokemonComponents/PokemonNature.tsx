import React from "react";
import '../../pages/PokemonTeamBuilder.css';

interface NatureProps {
    setCurrentNature: (nature: string) => void
    currentNature: string
}

interface Nature {
    name: string;
    increasedStat: string;
    decreasedStat: string;
  }

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
const PokemonNatureSelector : React.FC<NatureProps> = ({setCurrentNature, currentNature}) =>{


    const handleNatureSelection = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentNature(e.target.value);
    }

    return (
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
    )
}

export {PokemonNatureSelector, natureData}