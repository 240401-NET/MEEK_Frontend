import { useState } from "react";
import { EVStats, IVStats} from "../../models/Pokemon";

interface StatProp {
    handleIVStatsArrary: (stat : string, value : number) => void,
    handleEVStatsArrary: (stat : string, value : number) => void,
    currentIVs: IVStats,
    currentEVs: EVStats,
}


const StatComponent : React.FC<StatProp> = ({ currentEVs, currentIVs, handleEVStatsArrary, handleIVStatsArrary}) => {
    const [hpIVValue, setHpIVValue] = useState<number>(31)

    return (
        <div className="stat-input-container">
            <label>
                HP:
                <div className="hp-input">
                <input type="number" value={hpIVValue} onChange={(e) => {handleIVStatsArrary("hp", parseInt(e.target.value)), setHpIVValue(parseInt((e.target.value)))}} defaultValue={31} min={0} max={31}/>
                <input type="number" value={isNaN(currentEVs.hp) ? '' : currentEVs.hp} onChange={(e) => handleEVStatsArrary("hp", parseInt(e.target.value))} defaultValue={0} min={0} max={252}/>
                </div>
            </label>
            <label>
                Attack:
                <div>
                    <input type="number" value={isNaN(currentIVs.attack) ? '' : currentIVs.attack} onChange={(e) => handleIVStatsArrary("attack", parseInt(e.target.value))} defaultValue={31} min={0} max={31}/>
                    <input type="number" value={isNaN(currentEVs.attack) ? '' : currentEVs.attack} onChange={(e) => handleEVStatsArrary("attack", parseInt(e.target.value))} defaultValue={0} min={0} max={252}/>
                </div>
            </label>
            <label>
                Defense:
                <div>
                    <input type="number" value={isNaN(currentIVs.defense) ? '' : currentIVs.defense} onChange={(e) => handleIVStatsArrary("defense", parseInt(e.target.value))} defaultValue={31} min={0} max={31}/>
                    <input type="number" value={isNaN(currentEVs.defense) ? '' : currentEVs.defense} onChange={(e) => handleEVStatsArrary("defense", parseInt(e.target.value))} defaultValue={0} min={0} max={252}/>
                </div>
            </label>
            <label>
                Special Attack:
                <div>
                    <input type="number" value={isNaN(currentIVs["special-attack"]) ? '' : currentIVs["special-attack"]} onChange={(e) => handleIVStatsArrary("special-attack", parseInt(e.target.value))} defaultValue={31} min={0} max={31}/>
                    <input type="number" value={isNaN(currentEVs["special-attack"]) ? '' : currentEVs["special-attack"]} onChange={(e) => handleEVStatsArrary("special-attack", parseInt(e.target.value))} defaultValue={0} min={0} max={252}/>
                </div>
            </label>
            <label>
                Special Defense:
                <div>
                    <input type="number" value={isNaN(currentIVs["special-defense"]) ? '' : currentIVs["special-defense"]} onChange={(e) => handleIVStatsArrary("special-defense", parseInt(e.target.value))} defaultValue={31} min={0} max={31}/>
                    <input type="number" value={isNaN(currentEVs["special-defense"]) ? '' : currentEVs["special-defense"]} onChange={(e) => handleEVStatsArrary("special-defense", parseInt(e.target.value))} defaultValue={0} min={0} max={252}/>
                </div>
                
            </label>
            <label>
                Speed:
                <div>
                    <input type="number" value={isNaN(currentIVs.speed) ? '' : currentIVs.speed} onChange={(e) => handleIVStatsArrary("speed", parseInt(e.target.value))} defaultValue={31} min={0} max={31}/>
                    <input type="number" value={isNaN(currentEVs.speed) ? '' : currentEVs.speed} onChange={(e) => handleEVStatsArrary("speed", parseInt(e.target.value))} defaultValue={0} min={0} max={252}/>
                </div>
               
            </label>
        </div>
    )
}

export default StatComponent

