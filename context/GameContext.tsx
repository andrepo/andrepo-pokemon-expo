import React, { createContext, useContext, useState } from 'react';

type GameContextType = {
    ownedPokemonIds: string[];
    addPokemon: (id: string) => void;
};

const GameContext = createContext<GameContextType>({
    ownedPokemonIds: ['pikachu'],
    addPokemon: () => {},
});

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
    const [ownedPokemonIds, setOwnedPokemonIds] = useState<string[]>(['pikachu']);

    const addPokemon = (id: string) => {
        if (!ownedPokemonIds.includes(id)) {
            setOwnedPokemonIds((prev) => [...prev, id]);
        }
    };

    return <GameContext.Provider value={{ ownedPokemonIds, addPokemon }}>{children}</GameContext.Provider>;
};

export const useGame = () => useContext(GameContext);
