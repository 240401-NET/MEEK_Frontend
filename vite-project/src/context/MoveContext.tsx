import React, {useState, useContext, useEffect, createContext} from 'react';
import { usePokemonData } from "./PokemonDataContext";
import { MoveSet, Moves, Move } from '../models/Pokemon';


interface MoveContextType {
    moves : Moves[],
    movesList: Move[],
    pokemonMoveSet: MoveSet,
    searchedMove: string,
    selectedSlot: number;
    handleSelectedMove: (slot: keyof MoveSet, value: string) => void
    handleSearchedMove: (moveName: string) => void
    setSelectedSlot: (slot: number) => void;
}

interface Props {
    children: React.ReactNode
}

const MoveSetInitialState : MoveSet = {
    move1: '',
    move2: '',
    move3: '',
    move4: '' 
}

const MoveContext = createContext<MoveContextType>({
    moves: [],
    movesList: [],
    pokemonMoveSet: MoveSetInitialState,
    searchedMove: '',
    selectedSlot: 1,
    handleSelectedMove: () => {},
    handleSearchedMove: () => {},
    setSelectedSlot: () => {}
})

export const useMoveContext = () => {
    const _context = useContext(MoveContext);
    if (_context) {
        throw new Error("useStat must be used within a pokemon provider");
    }
    return _context;
}

export const MoveProvider : React.FC<Props> = ({children}) => {

    const {pokemonData} = usePokemonData();
    const [moves, setMoves] = useState<Moves[]>([]);
    const [movesList , setMovesList] = useState<Move[]>([]);
    const [pokemonMoveSet, setPokemonMoveSet] = useState<MoveSet>(MoveSetInitialState);
    const [searchedMove, setSearchedMove] = useState<string>('');
    const [selectedSlot, setSelectedSlot] = useState<number>(1); // Initialize selectedSlot
    

    // loads a new move list everytime a new pokemon is searched up
    useEffect(() => {
        LoadMoves();
    }, [pokemonData, moves, movesList])

    useEffect(() => {
        setMoves([]);
        setMovesList([]);
        setPokemonMoveSet(MoveSetInitialState);
        setSearchedMove('');
        setSelectedSlot(1);
    }, [pokemonData])

    // creates an array of all possible moves a pokemon can learn along with the move id, name and url to the move
    const LoadMoves = () => {
        if(pokemonData) {
            const passedInMoveList = pokemonData?.moves.map((moves) => {
                const urlParts = moves.move.url.split('/');
                const idString = urlParts[urlParts.length - 2];
                return {
                    id: parseInt(idString),
                    name: moves.move.name,
                    url: moves.move.url  
                }
            });
            if (JSON.stringify(passedInMoveList) !== JSON.stringify(moves)) {
                setMoves(passedInMoveList!)
            }
            // JSON.stringify(passedInMoveList) !== JSON.stringify(moves)
            const filteredMovesList = moves.map((move) => {
                return {
                    name: move.name!
                }
            })
            if (JSON.stringify(filteredMovesList) !== JSON.stringify(movesList)) {
                setMovesList(filteredMovesList)
            }
        }
        
    }
    
    const handleSearchedMove = (moveName: string) => {
        setSearchedMove(moveName);
    }

    const handleSelectedMove = (slot: keyof MoveSet , move: string) => {
        setPokemonMoveSet(prevMoves => ({ ...prevMoves, [slot]: move }));
        setSearchedMove('');
        setSelectedSlot(slot.replace('move', '') as unknown as number);
    }

    return (
        <MoveContext.Provider value = {{moves, pokemonMoveSet, handleSelectedMove, searchedMove, handleSearchedMove, movesList, selectedSlot, setSelectedSlot}}>
            {children}
        </MoveContext.Provider>
    )
}

export const useMove = () => useContext(MoveContext);