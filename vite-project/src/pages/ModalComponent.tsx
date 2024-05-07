import "./modal.css"
import React, { useState } from 'react';

interface Props {
    isOpen: boolean,
    onClose: () => void,
    onSave: (teamName: string) => void
}

const TeamNameModal : React.FC<Props>= ({ isOpen, onClose, onSave }) => {
  const [teamName, setTeamName] = useState('');

  const handleSave = () => {
    onSave(teamName);
    setTeamName('');
    onClose();
  };

  console.log(isOpen);

  return (
    <div className={`modal ${isOpen ? 'is-active' : 'not-active'}`}>
      <div className="modal-background" ></div>
      <div className="modal-content">
        <div className="box">
          <h3 className="title is-3">Enter Team Name</h3>
          <input
            type="text"
            className="input"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <button className="button is-primary" onClick={handleSave}>
            Save
          </button>
          <button className="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
      <button className="modal-close is-large" onClick={onClose}></button>
    </div>
  );
};

export default TeamNameModal;