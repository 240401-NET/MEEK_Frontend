import React from "react";
import '../pages/PokemonTeamBuilder.css'
import { useStat } from "../context/StatContext";


const StatComponent : React.FC = () => {

    const {currentIVs, currentEVs, handleIVStatsArrary, handleEVStatsArrary} = useStat();

    return (
        <div>
            <label>
                HP:
                <input type="number" value={isNaN(currentIVs.hp) ? '' : currentIVs.hp} onChange={(e) => handleIVStatsArrary("hp", parseInt(e.target.value))} />
                <input type="number" value={isNaN(currentEVs.hp) ? '' : currentEVs.hp} onChange={(e) => handleEVStatsArrary("hp", parseInt(e.target.value))} />
            </label>
            <label>
                Attack:
                <input type="number" value={isNaN(currentIVs.attack) ? '' : currentIVs.attack} onChange={(e) => handleIVStatsArrary("attack", parseInt(e.target.value))} />
                <input type="number" value={isNaN(currentEVs.attack) ? '' : currentEVs.attack} onChange={(e) => handleEVStatsArrary("attack", parseInt(e.target.value))} />
            </label>
            <label>
                Defense:
                <input type="number" value={isNaN(currentIVs.defense) ? '' : currentIVs.defense} onChange={(e) => handleIVStatsArrary("defense", parseInt(e.target.value))} />
                <input type="number" value={isNaN(currentEVs.defense) ? '' : currentEVs.defense} onChange={(e) => handleEVStatsArrary("defense", parseInt(e.target.value))} />
            </label>
            <label>
                Special Attack:
                <input type="number" value={isNaN(currentIVs["special-attack"]) ? '' : currentIVs["special-attack"]} onChange={(e) => handleIVStatsArrary("special-attack", parseInt(e.target.value))} />
                <input type="number" value={isNaN(currentEVs["special-attack"]) ? '' : currentEVs["special-attack"]} onChange={(e) => handleEVStatsArrary("special-attack", parseInt(e.target.value))} />
            </label>
            <label>
                Special Defense:
                <input type="number" value={isNaN(currentIVs["special-defense"]) ? '' : currentIVs["special-defense"]} onChange={(e) => handleIVStatsArrary("special-defense", parseInt(e.target.value))} />
                <input type="number" value={isNaN(currentEVs["special-defense"]) ? '' : currentEVs["special-defense"]} onChange={(e) => handleEVStatsArrary("special-defense", parseInt(e.target.value))} />
            </label>
            <label>
                Speed:
                <input type="number" value={isNaN(currentIVs.speed) ? '' : currentIVs.speed} onChange={(e) => handleIVStatsArrary("speed", parseInt(e.target.value))} />
                <input type="number" value={isNaN(currentEVs.speed) ? '' : currentEVs.speed} onChange={(e) => handleEVStatsArrary("speed", parseInt(e.target.value))} />
            </label>
        </div>
    )
}

export default StatComponent