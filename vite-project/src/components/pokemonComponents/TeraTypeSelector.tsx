import React, {useState} from 'react'

const TeraTypeSelector : React.FC = () => {

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
        "Water"
    ]
    const [teraType, setTeraType] = useState('')

    const handleTeraTypeSelection = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setTeraType(e.target.value);
    }
    return(
        <div>
            <label htmlFor="teraType">
                <p>Teratype</p>
                <select id="teraType" value={teraType} onChange={handleTeraTypeSelection}>
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