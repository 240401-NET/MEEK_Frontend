import React from 'react';
import '../pages/PokemonTeamBuilder.css'
import { useNature } from '../context/NatureContext';

const NatureComponent : React.FC = () => {
    
    const {nature, natureData, handleSelectedNature} = useNature();

    return (
        <div>
            <label htmlFor="nature">
                    <p>Nature:</p>
                    <select id="nature" value={nature} onChange={(e) => handleSelectedNature(e.target.value)}>
                        <option value=""></option>
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

export default NatureComponent