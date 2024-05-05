import React from "react";
import {PokemonDataProvider}  from "./PokemonDataContext";
import { SpritesProvider } from "./Spritecontext";
import { AbilityProvider } from "./AbilitiesContext";
import { TeraTypeProvider } from "./TeraTypeContext";
import { NatureProvider } from "./NatureContext";
import { LevelProvider } from "./LevelContext";

interface Props {
    children: React.ReactNode,
}

export const PokemonProvider : React.FC<Props> = ({children}) => {

    return (
    <PokemonDataProvider>
        <SpritesProvider>
        <AbilityProvider>
        <TeraTypeProvider>
        <NatureProvider>
        <LevelProvider>
        {children}
        </LevelProvider>
        </NatureProvider>
        </TeraTypeProvider>
        </AbilityProvider>
        </SpritesProvider>
    </PokemonDataProvider>
    )
}