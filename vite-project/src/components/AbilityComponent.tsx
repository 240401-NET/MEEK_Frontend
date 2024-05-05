import React from 'react';
import '../pages/PokemonTeamBuilder.css'
import { useAbility } from '../context/AbilitiesContext';

const AbilitiesComponent : React.FC = () => {

    const {abilitiesAndIdArray, selectedAbility, handleSelectedAbility, handleSelectedAbilityId} = useAbility();

    
    return (
        <div>
            <h3>Abilities</h3>
            {abilitiesAndIdArray.map((ability, index) =>(
                        <div key = {index}>
                            <input 
                            type="radio" 
                            id={`ability-${index}`}
                            name="ability"
                            value={ability.name}
                            checked={selectedAbility === ability.name}
                            onChange={() => {handleSelectedAbility(ability.name), handleSelectedAbilityId(ability.id)}}
                            />
                            <label htmlFor={`ability-${index}`}>{ability.name}</label>
                            <p>{ability.flavor_Text}</p>
                        </div>
            ))}
        </div>
    )
}
export default AbilitiesComponent