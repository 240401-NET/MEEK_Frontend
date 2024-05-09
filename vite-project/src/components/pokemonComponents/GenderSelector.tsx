import React, { useState, useEffect } from 'react';

interface Props {
    onSelect: (gender: boolean) => void;
}

const GenderSelector: React.FC<Props> = ({ onSelect }) => {
    const [selectedGender, setSelectedGender] = useState<boolean>(false);

    const handleGenderSelection = (gender: boolean) => {
        setSelectedGender(gender);
        onSelect(gender);
    }

    useEffect(() => {
        setSelectedGender(false);
    }, []);
return (
  <div className="gender-selection">
    <span className="gender-label">Gender: </span>
    <label className="gender-option">
      <input
        type="radio"
        value="Male"
        checked={selectedGender === false}
        onChange={() => handleGenderSelection(false)}
      />
      Male
    </label>
    <label className="gender-option">
      <input
        type="radio"
        value="Female"
        checked={selectedGender === true}
        onChange={() => handleGenderSelection(true)}
      />
      Female
    </label>
  </div>
);
}

export default GenderSelector;