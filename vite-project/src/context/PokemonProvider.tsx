import React from "react";
import {PokemonDataProvider}  from "./PokemonDataContext";
import { SpritesProvider } from "./Spritecontext";
import { AbilityProvider } from "./AbilitiesContext";
import { TeraTypeProvider } from "./TeraTypeContext";

interface Props {
    children: React.ReactNode,
}

export const PokemonProvider : React.FC<Props> = ({children}) => {

    return (
    <PokemonDataProvider>
        <SpritesProvider>
        <AbilityProvider>
        <TeraTypeProvider>
            {children}
        </TeraTypeProvider>
        </AbilityProvider>
        </SpritesProvider>
    </PokemonDataProvider>
    )
}