import React , {createContext, useState, useContext, useEffect} from 'react'
import { usePokemonContext } from '../components/pokemonComponents/PokemonContext';

interface Props {
    children: React.ReactNode,
}

interface TeraTypeContextType {
    teraType: string,
    teratypes: string[],
    handleTeraTypeSelection: (teraType: string) => void
}

export const TeraTypeContext = createContext<TeraTypeContextType>({
    teraType: "",
    teratypes: [],
    handleTeraTypeSelection: () => {}
})

export const usePokemonDataContext = () => {
    const _context = useContext(TeraTypeContext);
    if (!_context) {
        throw new Error("useTera must be used within a pokemon provider");
    }
    return _context;
}

export const TeraTypeProvider : React.FC<Props> = ({children}) => {
    
    const {pokemonData} = usePokemonContext();
    const teratypes: string[] = [
        "Normal",
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
        "Poison",
        "Psychic",
        "Rock",
        "Steel",
        "Water",
    ]

    const [teraType, setTeraType] = useState("");

    useEffect(() => {
        if(pokemonData) {
            setTeraType(teratypes[0]);
        }
    }, [pokemonData])

    const handleTeraTypeSelection = (teratype: string ) => {
        setTeraType(teratype); 
    }

    return (
        <TeraTypeContext.Provider value = {{teraType, teratypes, handleTeraTypeSelection}}>
            {children}
        </TeraTypeContext.Provider>
    )
}

export const useTeraType = () => useContext(TeraTypeContext);