import React , {useState} from 'react'

interface Ability {
    name: string
    flavor_Text: string
}

interface Props {
    abilities : Ability[]
}

const AbilitiesSelector : React.FC<Props> = ({abilities}) => {

    const [selectedAbility, setSelectedAbility] = useState("");

    const handlePokemonAbilitySelection = (abilityName : string) => {
        setSelectedAbility(abilityName);
    }

    return (
        <div>
            <h3>Abilities</h3>
            {abilities.map((ability, index) =>(
                        <div key = {index}>
                            <input 
                            type="radio" 
                            id={`ability-${index}`}
                            name="ability"
                            value={ability.name}
                            checked={selectedAbility === ability.name}
                            onChange={() => handlePokemonAbilitySelection(ability.name)}
                            />
                            <label htmlFor={`ability-${index}`}>{ability.name}</label>
                            <p>{ability.flavor_Text}</p>
                        </div>
            ))}
        </div>
    )
}
export default AbilitiesSelector