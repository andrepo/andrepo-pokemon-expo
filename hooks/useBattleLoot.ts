import { useEffect, useState } from 'react';
import { getLootPool } from '../constants/pokemonDb';
import { useGame } from '../context/GameContext';

export function useBattleLoot(isGameOver: boolean, isPlayerWinner: boolean) {
    const { addPokemon, ownedPokemonIds } = useGame();
    const [loot, setLoot] = useState<string | null>(null);

    useEffect(() => {
        // If Player won and hasn't received loot yet
        if (isGameOver && isPlayerWinner && !loot) {
            const availableLoot = getLootPool(ownedPokemonIds);
            if (availableLoot.length > 0) {
                const randomLoot = availableLoot[Math.floor(Math.random() * availableLoot.length)];
                setLoot(randomLoot);
                addPokemon(randomLoot);
            }
        }
    }, [isGameOver, isPlayerWinner, loot, addPokemon, ownedPokemonIds]);

    return { loot, setLoot };
}
