import React from "react";
import {PokemonDataProvider}  from "./PokemonDataContext";
import { SpritesProvider } from "./Spritecontext";

interface Props {
    children: React.ReactNode,
}

export const PokemonProvider : React.FC<Props> = ({children}) => {

    return (
    <PokemonDataProvider>
        <SpritesProvider>{children}</SpritesProvider>
    </PokemonDataProvider>
    )
}