import React from "react";
import { useGender } from "../context/GenderContext";

const GenderComponent : React.FC = () => {

    const {gender, handleGender} = useGender()

    return (
        <>
            <label>
                <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === true}
                    onChange={() => handleGender(true)}
                />
                Female
            </label>
            <label>
                <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === false}
                    onChange={() => handleGender(false)}
                />
                Male
            </label>
        </>
    )
}

export default GenderComponent