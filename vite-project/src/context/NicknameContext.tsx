import React , {createContext, useState, useContext, useEffect} from 'react'
import { usePokemonData } from './PokemonDataContext'

interface NicknameContextType {
    nickname : string
    handleNickname: (nickname: string) => void
}

interface Props{
    children: React.ReactNode
}

export const NicknameContext = createContext<NicknameContextType>({
    nickname: 'false',
    handleNickname: () => {}
})

export const useNicknameContext = () => {
    const _context = useContext(NicknameContext);
    if (!_context) {
        throw new Error("useNickname must be used within a pokemon provider");
    }
    return _context;
}

export const NicknameProvider : React.FC<Props> = ({children}) => {
    const {pokemonData} = usePokemonData();
    const [nickname, setNickname] = useState('')

    useEffect(() => {
        setNickname('');
    }, [pokemonData])

    const handleNickname = (nickName: string) => {
        setNickname(nickName)
    }

    return (
        <NicknameContext.Provider value = {{nickname, handleNickname}}>
            {children}
        </NicknameContext.Provider>
    )
}

export const useNickname = () => useContext(NicknameContext);