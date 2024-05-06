import React , {createContext, useState, useContext, useEffect} from 'react'
import { usePokemonData } from './PokemonDataContext'

interface GenderContextType {
    gender : boolean
    handleGender: (gender: boolean) => void
}

interface Props{
    children: React.ReactNode
}

export const GenderContext = createContext<GenderContextType>({
    gender: false,
    handleGender: () => {}
})

export const useGenderContext = () => {
    const _context = useContext(GenderContext);
    if (!_context) {
        throw new Error("useGender must be used within a pokemon provider");
    }
    return _context;
}

export const GenderProvider : React.FC<Props> = ({children}) => {
    const {pokemonData} = usePokemonData();
    const [gender, setGender] = useState(false)

    useEffect(() => {
        setGender(false);
    }, [pokemonData])

    const handleGender = (booleanValue: boolean) => {
        setGender(booleanValue)
    }

    return (
        <GenderContext.Provider value = {{gender, handleGender}}>
            {children}
        </GenderContext.Provider>
    )
}

export const useGender = () => useContext(GenderContext);