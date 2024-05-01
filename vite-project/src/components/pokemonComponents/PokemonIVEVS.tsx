import React from "react";


interface IVProp {
    hp: number | 0;
    attack: number | 0;
    defense: number | 0;
    special_attack: number | 0;
    special_defense: number | 0;
    speed: number | 0;
    onChangeHP : (value: number) => void;
    onChangeAttack : (value: number) => void;
    onChangeDefense : (value: number) => void;
    onChangeSpecialAttack : (value: number) => void;
    onChangeSpecialDefense : (value: number) => void;
    onChangeSpeed : (value: number) => void;
}

const PokemonIVEVRenderer : React.FC<IVProp> = ({
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
        <div>
            <label>
                HP:
                <input type="number" value={hp} onChange={handleHPChange} />
            </label>
            <label>
                Attack:
                <input type="number" value={attack} onChange={handleAttackChange} />
            </label>
            <label>
                Defense:
                <input type="number" value={defense} onChange={handleDefenseChange} />
            </label>
            <label>
                Special Attack:
                <input type="number" value={special_attack} onChange={handleSpecialAttackChange} />
            </label>
            <label>
                Special Defense:
                <input type="number" value={special_defense} onChange={handleSpecialDefenseChange} />
            </label>
            <label>
                Speed:
                <input type="number" value={speed} onChange={handleSpeedChange} />
            </label>
        </div>
    )
}

export default PokemonIVEVRenderer
