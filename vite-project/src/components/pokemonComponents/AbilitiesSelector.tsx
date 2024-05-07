import React , {useState, useEffect} from 'react';
import '../../pages/PokemonTeamBuilder.css';

interface Ability {
    name: string
    flavor_Text: string
}

interface Props {
    abilityUrls : string[]
    setSelectedAbility: (ability: string) => void
    selectedAbility: string
}

const AbilitiesSelector : React.FC<Props> = ({abilityUrls, selectedAbility, setSelectedAbility}) => {

    const [abilities, setAbilities] = useState<Array<Ability>>([])

    const handlePokemonAbilitySelection = (abilityName : string) => {
        setSelectedAbility(abilityName);
    }

    useEffect(() => {
            const fetchAbilityData = async () => {
                try{
                    const abilitiesData = await Promise.all(abilityUrls.map(async (url) => {
                        const abilityResponse = await fetch(url);
                        const abilityData = await abilityResponse.json();
                        const flavorTextEntries = abilityData.flavor_text_entries.filter(
                            (entry : {language: {name: string} }) => entry.language.name === "en"
                        );
                        const flavorText = flavorTextEntries.length > 0 ? flavorTextEntries[0].flavor_text : "Flavor text not available"
                        return {
                            name: abilityData.name,
                            flavor_Text: flavorText
                        };
                    })
                );
                setAbilities(abilitiesData);
                } catch (error) {
                console.error("Error fetching ability information...", error);
            }
        };
        fetchAbilityData();
    },[abilityUrls])

    return (
        <div>
        <h3>Abilities</h3>
        {abilities.map((ability, index) => (
          <div key={index}>
            <label htmlFor={`ability-${index}`} className="ability-label">
              <input
                type="radio"
                id={`ability-${index}`}
                name="ability"
                value={ability.name}
                checked={selectedAbility === ability.name}
                onChange={() => handlePokemonAbilitySelection(ability.name)}
                className="ability-radio"
              />
              {ability.name.charAt(0).toUpperCase() + ability.name.slice(1)} : {ability.flavor_Text.charAt(0).toUpperCase() + ability.flavor_Text.slice(1)}
            </label>
          </div>
        ))}
      </div>
      );
}
export default AbilitiesSelector