import React from "react";
import '../../pages/PokemonTeamBuilder.css';

interface LevelProps {
    currentLevel: number
    setCurrentLevel: (level : number) => void
}

const LevelSelector : React.FC<LevelProps> = ({currentLevel, setCurrentLevel}) =>{

    const handlePokemonLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentLevel(parseInt(e.target.value));
    }
    return (
        <div className="pokemon-level">
          <label htmlFor="level" className="level-label">Set Pokemon Level: {currentLevel}</label>
          <input 
            type="range" 
            id="level"
            className="level-input"
            min="1"
            max="100"
            value={currentLevel}
            onChange={handlePokemonLevelChange}
          />
        </div>
      );
}

export default LevelSelector