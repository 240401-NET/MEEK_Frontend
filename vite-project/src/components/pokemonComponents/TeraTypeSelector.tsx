import React from 'react';
import '../../pages/PokemonTeamBuilder.css';

interface TeraTypeProp {
    setSelectedTeraType: (teratype :string) => void;
    selectedTeraType: string
}

const TeraTypeSelector : React.FC<TeraTypeProp> = ({setSelectedTeraType, selectedTeraType}) => {

    const teratypes: string[] = [
        "Stellar",
        "Bug",
        "Dark",
        "Dragon",
        "Electric",
        "Fairy",
        "Fighting",
        "Fire",
        "Flying",
        "Ghost",
        "Grass",
        "Ground",
        "Ice",
        "Normal",
        "Poison",
        "Psychic",
        "Rock",
        "Steel",
        "Water",
        "Unknown"
    ]

    const handleTeraTypeSelection = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTeraType(e.target.value);
    }
    return(
        <div>
            <label htmlFor="teraType">
                <p>Teratype</p>
                <select id="teraType" onChange={handleTeraTypeSelection} value ={selectedTeraType}>
                    <option value="">None</option>
                        {teratypes.map(tera => (
                            <option value={tera} key={tera}>
                                {tera}
                            </option>
                        ))}
                </select>
            </label>
        </div>
    )
}

export default TeraTypeSelector;