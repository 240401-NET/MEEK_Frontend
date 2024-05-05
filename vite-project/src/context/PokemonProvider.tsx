import React from "react";
import {PokemonDataProvider}  from "./PokemonDataContext";
import { SpritesProvider } from "./Spritecontext";
import { AbilityProvider } from "./AbilitiesContext";
import { TeraTypeProvider } from "./TeraTypeContext";
import { NatureProvider } from "./NatureContext";
import { LevelProvider } from "./LevelContext";
import { StatProvider } from "./StatContext";

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
        <StatProvider>
        {children}
        </StatProvider>
        </LevelProvider>
        </NatureProvider>
        </TeraTypeProvider>
        </AbilityProvider>
        </SpritesProvider>
    </PokemonDataProvider>
    )
}