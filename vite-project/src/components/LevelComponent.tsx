import React from 'react';
import '../pages/PokemonTeamBuilder.css'
import { useLevel } from '../context/LevelContext';

const LevelComponent : React.FC = () => {

    const {level, handleLevelSelect} = useLevel();

    return (
        <div>                
            <label htmlFor="level">Set Pokemon Level : {level}</label>
                <input 
                    type="range" 
                    id="level"
                    min="1"
                    max="100"
                    value={level}
                    onChange={(e) => handleLevelSelect(parseInt(e.target.value))}
                />
        </div>
    )
}

export default LevelComponent