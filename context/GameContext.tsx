import React, { createContext, useContext, useState } from 'react';
// 1. Import the new constant at the top of the file
import { ALL_POKEMON_IDS } from '../constants/pokemonDb';

type GameContextType = {
    ownedPokemonIds: string[];
    addPokemon: (id: string) => void;
};

const GameContext = createContext<GameContextType>({
    ownedPokemonIds: ['pikachu'],
    addPokemon: () => {},
});

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
    //const [ownedPokemonIds, setOwnedPokemonIds] = useState<string[]>(['pikachu']);
    // Change this temporarily from ['pikachu'] to ALL_POKEMON_IDS
    const [ownedPokemonIds, setOwnedPokemonIds] = useState<string[]>(ALL_POKEMON_IDS);

    const addPokemon = (id: string) => {
        if (!ownedPokemonIds.includes(id)) {
            setOwnedPokemonIds((prev) => [...prev, id]);
        }
    };

    return <GameContext.Provider value={{ ownedPokemonIds, addPokemon }}>{children}</GameContext.Provider>;
};;

export const useGame = () => useContext(GameContext);
