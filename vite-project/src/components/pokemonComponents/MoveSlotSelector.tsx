import React, {useEffect, useState} from 'react'
import '../testComponents/HeldItemList.css'


interface MoveSlotProps {
    moveNames: string[]
}


const MoveSlotSelector : React.FC<MoveSlotProps> = ({moveNames}) => {
    const [selectedMove, setSelectedMove] = useState('');
    const [showAllMoves, setShowAllMoves] = useState<boolean>(false);


    const handlePokemonMoveSelection = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMove(e.target.value);
    }

    const filterMoves = moveNames.filter(move => 
        move.toLowerCase().includes(selectedMove.toLowerCase())
    )
    const handleShowAllMoves = () => {
        setShowAllMoves(true);
    }
    const handleCloseModal = () => {
        setShowAllMoves(false);
    }

    return (
        
        <div>
            <input 
                type="text"
                placeholder="Search for a valid move..." 
                value={selectedMove}
                onChange={handlePokemonMoveSelection}
            />
            {selectedMove && (
                <ul>
                    {filterMoves.map(move => (
                        <li key={move}>{move}</li>
                    ))}
                </ul>
            )}
            {!selectedMove && (
                <div>
                    <button onClick={handleShowAllMoves}>Show All Moves</button>
                </div>  
            )}
            {showAllMoves && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>All Items</h2>
                        <ul>
                            {moveNames.map((moveName, index) =>
                                <li key={index}>{moveName}</li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MoveSlotSelector