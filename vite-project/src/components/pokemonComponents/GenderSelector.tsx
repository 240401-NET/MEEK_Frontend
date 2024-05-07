import React, { useState, useEffect } from 'react';

interface Props {
    onSelect: (gender: string) => void;
}

const GenderSelector: React.FC<Props> = ({ onSelect }) => {
    const [selectedGender, setSelectedGender] = useState<string>("Random");

    const handleGenderSelection = (gender: string) => {
        setSelectedGender(gender);
        onSelect(gender);
    }

    useEffect(() => {
        setSelectedGender("Random");
    }, []);
return (
  <div className="gender-selection">
    <span className="gender-label">Gender: </span>
    <label className="gender-option">
      <input
        type="radio"
        value="Male"
        checked={selectedGender === "Male"}
        onChange={() => handleGenderSelection("Male")}
      />
      Male
    </label>
    <label className="gender-option">
      <input
        type="radio"
        value="Female"
        checked={selectedGender === "Female"}
        onChange={() => handleGenderSelection("Female")}
      />
      Female
    </label>
    <label className="gender-option">
      <input
        type="radio"
        value="Random"
        checked={selectedGender === "Random"}
        onChange={() => handleGenderSelection("Random")}
      />
      Random
    </label>
  </div>
);
}

export default GenderSelector;