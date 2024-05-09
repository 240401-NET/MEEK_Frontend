import React from "react";
import '../../pages/PokemonTeamBuilder.css';


interface StatProp {
    hp: number | 31;
    attack: number | 31;
    defense: number | 31;
    special_attack: number | 31;
    special_defense: number | 31;
    speed: number | 31;
    onChangeHP : (value: number) => void;
    onChangeAttack : (value: number) => void;
    onChangeDefense : (value: number) => void;
    onChangeSpecialAttack : (value: number) => void;
    onChangeSpecialDefense : (value: number) => void;
    onChangeSpeed : (value: number) => void;
}

const PokemonIVEVRenderer : React.FC<StatProp> = ({
    hp, attack, defense, special_attack, special_defense, speed, 
    onChangeHP, onChangeAttack, onChangeDefense, onChangeSpecialAttack, onChangeSpecialDefense, onChangeSpeed
}) => {

      const handleHPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        onChangeHP(value);
      };
      const handleAttackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        onChangeAttack(value);
      };
      const handleDefenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        onChangeDefense(value);
      };
      const handleSpecialAttackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        onChangeSpecialAttack(value);
      };
      const handleSpecialDefenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        onChangeSpecialDefense(value);
      };
      const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        onChangeSpeed(value);
      };

      return (
        <div className="stat-input-container">
          <label>
            HP:
            <input type="number" value={hp} onChange={handleHPChange} defaultValue={31} min={0} max={31} />
            
          </label>
          <label>
            Atk:
            <input type="number" value={attack} onChange={handleAttackChange} defaultValue={31} min={0} max={31} />
          </label>
          <label>
            Def:
            <input type="number" value={defense} onChange={handleDefenseChange} defaultValue={31} min={0} max={31} />
          </label>
          <label>
            SpA:
            <input type="number" value={special_attack} onChange={handleSpecialAttackChange} defaultValue={31} min={0} max={31} />
          </label>
          <label>
            SpD:
            <input type="number" value={special_defense} onChange={handleSpecialDefenseChange} defaultValue={31} min={0} max={31} />
          </label>
          <label>
            Spe:
            <input type="number" value={speed} onChange={handleSpeedChange} defaultValue={31} min={0} max={31} />
          </label>
        </div>
      );
      
}

export default PokemonIVEVRenderer
