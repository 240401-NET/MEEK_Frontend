import React from 'react';
import '../pages/PokemonTeamBuilder.css';
import { useTeraType } from '../context/TeraTypeContext';

const TeraTypeComponent: React.FC = () => {
    const {teraType, teratypes, handleTeraTypeSelection} = useTeraType();

    return(
        <div>
            <label htmlFor="teraType">
                <p>Teratype</p>
                <select id="teraType" onChange={(e) => handleTeraTypeSelection(e.target.value)} value={teraType}>
                    <option value=""></option>
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

export default TeraTypeComponent;