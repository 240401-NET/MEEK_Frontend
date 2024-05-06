import React, {useState, useContext, useEffect, createContext} from 'react';
import { usePokemonData } from "./PokemonDataContext";
import { Ability , AbilityText, AbilityAndId} from '../models/Pokemon';
import { useSaveContext } from './SavePokemonContext';

interface AbilityContextType {
    abilitiesAndIdArray: AbilityAndId [],
    selectedAbilityId: number,
    selectedAbility: string,
    handleSelectedAbility: (selectedAbility: string) => void,
    handleSelectedAbilityId: (selectedAbilityId: number) => void,

}

interface Props {
    children: React.ReactNode
}

export const AbilityContext = createContext<AbilityContextType>({
    abilitiesAndIdArray: [], // Initial empty array or any default values
    selectedAbilityId: 0,
    selectedAbility: "",
    handleSelectedAbility: () => {},
    handleSelectedAbilityId: () => {},

});

export const useAbilityContext = () => {
    const _context = useContext(AbilityContext);
    if (!_context) {
        throw new Error("usePokemonDataContext must be used within a pokemon provider");
    }
    return _context;
}

export const AbilityProvider : React.FC<Props> = ( {children} ) => {
    const {editMode} = useSaveContext()
    const {pokemonData} = usePokemonData();
    const [abilitiesArray, setAbilitiesArray] = useState<Ability[]>([]);
    const [abilitiesURLArray, setAbilitiesURLArray] = useState<string[]>([]);
    const [abilitiesIdArray, setAbilitiesIdArray] = useState<number[]>([]);
    const [abilities, setAbilities] = useState<AbilityText[]>([]);
    const [abilitiesAndIdArray, setAbilitiesAndIdArray] = useState<AbilityAndId[]>([])
    const [selectedAbilityId, setSelectedAbilityId] = useState<number>(0)
    const [selectedAbility, setSelectedAbility] = useState<string>("");

    
    useEffect(() => {
      if(!editMode){
        fetchData();
      }
      }, [pokemonData, abilitiesArray, abilitiesURLArray, abilities, abilitiesIdArray, abilitiesAndIdArray]);

      useEffect(() => {
        setAbilitiesArray([]);
        setAbilitiesURLArray([]);
        setAbilitiesIdArray([]);
        setAbilities([]);
        setAbilitiesAndIdArray([]);
        setSelectedAbilityId(0);
        setSelectedAbility('')
      }, [pokemonData])

      const fetchData = async () => {
        try {
          if (pokemonData?.abilities) {
            const passedInAbilitiesArray = pokemonData.abilities.map((abilityObj) => ({
              name: abilityObj.ability.name,
              url: abilityObj.ability.url,
            }));
            if (JSON.stringify(passedInAbilitiesArray) !== JSON.stringify(abilitiesArray)) {
                setAbilitiesArray(passedInAbilitiesArray)
            }

            const passedInAbilitiesURLArray = abilitiesArray.map((ability) => ability.url);
            if (JSON.stringify(passedInAbilitiesURLArray) !== JSON.stringify(abilitiesURLArray)) {
                setAbilitiesURLArray(passedInAbilitiesURLArray)
            }
    
            const abilitiesData = await Promise.all(abilitiesURLArray.map(async (url) => {
              const abilityResponse = await fetch(url);
              const abilityData = await abilityResponse.json();
              const flavorTextEntries =  abilityData.flavor_text_entries.filter(
                (entry: { language: { name: string } }) => entry.language.name === "en"
              );
              const flavorText = flavorTextEntries.length > 0 ? flavorTextEntries[0].flavor_text : "Flavor text not available"
              return {
                name: abilityData.name,
                flavor_Text: flavorText
              };
            }));
            if (JSON.stringify(abilitiesData) !== JSON.stringify(abilities)) {
                setAbilities(abilitiesData);
            }
    
            const abilityIdArray: number[] = abilitiesArray.map((ability) => {
              const urlParts = ability.url.split('/');
              const idString = urlParts[urlParts.length - 2];
              return parseInt(idString);
            });
            if (JSON.stringify(abilityIdArray) !== JSON.stringify(abilitiesIdArray)) {
                setAbilitiesIdArray(abilityIdArray);
            }

            const combinedArray = abilities.map((ability, index) => ({
              name: ability.name,
              flavor_Text: ability.flavor_Text,
              id: abilityIdArray[index]
            }));
            if (JSON.stringify(combinedArray) !== JSON.stringify(abilitiesAndIdArray)) {
                setAbilitiesAndIdArray(combinedArray);
            }
            
          }
        } catch (error) {
          console.error("Error fetching ability information:", error);
        }
      };

    const handleSelectedAbility = (ability : string) => {
        setSelectedAbility(ability)
    }

    const handleSelectedAbilityId = (ability_id: number) => {
        setSelectedAbilityId(ability_id)
    }

    return (
        <AbilityContext.Provider value = {{ abilitiesAndIdArray, selectedAbilityId, selectedAbility, handleSelectedAbility, handleSelectedAbilityId}}>
            {children}
        </AbilityContext.Provider>
    )
}

export const useAbility = () => useContext(AbilityContext)
