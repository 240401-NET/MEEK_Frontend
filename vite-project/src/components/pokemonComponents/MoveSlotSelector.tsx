import React, { useState} from 'react';
import '../../pages/ItemsAndMovesModel.css';

interface MoveSlotProps {
    moveNames: string[]
    selectedMove: string
    setSelectedMove: (move: string) => void
}


const MoveSlotSelector : React.FC<MoveSlotProps> = ({moveNames, selectedMove, setSelectedMove

}) => {
    const [searchedMove, setSearchedMove] = useState('');
    const [showAllMoves, setShowAllMoves] = useState<boolean>(false);


    const handlePokemonMoveSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchedMove(e.target.value);
    }
    const handlePokemonMoveSelection = (moveName : string) => {
        setSelectedMove(moveName);
        setSearchedMove('')
    }

    const filterMoves = moveNames.filter(move => 
        move.toLowerCase().includes(searchedMove.toLowerCase())
    )
    const handleShowAllMoves = () => {
        setShowAllMoves(true);
    }
    const handleCloseModal = () => {
        setShowAllMoves(false);
    }

    return (  
<div className="move-selector">
  <input 
    type="text"
    placeholder="Search Valid Move" 
    value={searchedMove}
    onChange={handlePokemonMoveSearch}
  />
  {searchedMove && (
    <ul style={{ display: filterMoves.length > 0 ? 'block' : 'none'}}>
      {filterMoves.map(move => (
        <li key={move} onClick={() => handlePokemonMoveSelection(move)}>{move}</li>
      ))}
    </ul>
  )}
  {/* {!searchedMove && (
    <div>
      <button onClick={handleShowAllMoves}>Show All Moves</button>
    </div>  
  )} */}
  {/* {showAllMoves && (
    <div className='modal'>
      <div className='modal-content'>
        <span className="close" onClick={handleCloseModal}>&times;</span>
        <h2>All Moves</h2>
        <ul>
          {moveNames.map((moveName, index) =>
            <li key={index} onClick={()=>{handlePokemonMoveSelection(moveName), handleCloseModal()}}>{moveName}</li>
          )}
        </ul>
      </div>
    </div>
  )} */}
<p>Selected Move: {selectedMove.charAt(0).toUpperCase() + selectedMove.slice(1)}</p>
</div>
    )
}

export default MoveSlotSelector