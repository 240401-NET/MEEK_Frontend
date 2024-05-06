import React, {useState} from 'react';
import Modal from 'react-modal'; // Import Modal
import '../pages/ItemsAndMovesModel.css';
import { useMove } from '../context/MoveContext';
import { MoveSet } from '../models/Pokemon';

const MoveComponent: React.FC = () => {
    const {
        pokemonMoveSet,
        handleSelectedMove,
        searchedMove,
        handleSearchedMove,
        movesList,

    } = useMove();

    const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
    const [showModal, setShowModal] = useState<boolean>(false);

    // const handleSlotChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     setSelectedSlot(Number(event.target.value));
    // };

    // const handleOpenModal = () => {
    //     setShowModal(true);
    // };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const filteredMoves = movesList.filter(move =>
        move.name.toLowerCase().includes(searchedMove.toLowerCase())
    );

    const handleMoveSelection = (moveName: string) => {
        handleSelectedMove(`move${selectedSlot}` as keyof MoveSet, moveName);
        setShowModal(false); // Close the modal after selecting a move
    };

    const getSlotMoveDisplay = (slot: keyof MoveSet) => {
        const move = pokemonMoveSet[slot];
        return move ? move : `Select a move for slot ${slot}`;
    };

    return (
        <div>
            <div>
                {[1, 2, 3, 4].map(slot => (
                    <label key={slot}>
                        <p>{getSlotMoveDisplay(`move${slot}` as keyof MoveSet)}</p>
                        <input
                            type="radio"
                            name="moveSlotChoice"
                            value={slot}
                            checked={selectedSlot === slot}
                            onChange={() => {setSelectedSlot(slot), setShowModal(true)}}
                        />
                    </label>
                ))}
            </div>

            <Modal isOpen={showModal} onRequestClose={handleCloseModal} ariaHideApp={false}>
                <h2>Select a move for slot {selectedSlot}:</h2>
                <input
                    type="text"
                    placeholder="Search moves..."
                    value={searchedMove}
                    onChange={(e) => handleSearchedMove(e.target.value)}
                />
                <ul>
                    {filteredMoves.map(move => (
                        <li key={move.name} onClick={() => handleMoveSelection(move.name)}>
                            {move.name}
                        </li>
                    ))}
                </ul>
                <button onClick={handleCloseModal}>Close Modal</button>
            </Modal>

            {/* Remove any other code related to selectedMove state or its usage */}
        </div>
    );
}

export default MoveComponent;