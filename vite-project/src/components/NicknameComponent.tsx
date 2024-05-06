import React from "react";
import { useNickname } from "../context/NicknameContext";

const NicknameComponent : React.FC = () => {

    const {nickname, handleNickname} = useNickname()
    
    return (
        <>
            <input
                type="text"
                placeholder="Enter a nickname for your pokemon!"
                value={nickname}
                onChange={(e) => handleNickname(e.target.value)}
            />
        </>
    )
}

export default NicknameComponent