import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PokemonData } from '../constants/pokemonDb';

export function useBattleLogic(playerPokemon: PokemonData, cpuPokemon: PokemonData) {
    const [playerHealth, setPlayerHealth] = useState(playerPokemon.maxHealth);
    const [cpuHealth, setCpuHealth] = useState(cpuPokemon.maxHealth);
    const [playerEnergy, setPlayerEnergy] = useState(playerPokemon.energy);
    const [cpuEnergy, setCpuEnergy] = useState(cpuPokemon.energy);
    const [currentTurn, setCurrentTurn] = useState<'player' | 'cpu'>('player');
    const [timeLeft, setTimeLeft] = useState(15);
    const [playerDamageTaken, setPlayerDamageTaken] = useState<number | null>(null);
    const [cpuDamageTaken, setCpuDamageTaken] = useState<number | null>(null);
    const [playerHealCooldown, setPlayerHealCooldown] = useState(0);
    const [cpuHealCooldown, setCpuHealCooldown] = useState(0);

    const playerDamageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const cpuDamageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Clean up damage indicator timeouts on unmount
    useEffect(() => {
        return () => {
            if (playerDamageTimerRef.current) clearTimeout(playerDamageTimerRef.current);
            if (cpuDamageTimerRef.current) clearTimeout(cpuDamageTimerRef.current);
        };
    }, []);

    // Turn timer loop
    useEffect(() => {
        // Stop timer if the game is over
        if (playerHealth <= 0 || cpuHealth <= 0) return;

        if (timeLeft <= 0) {
            // Time is up! Lose the turn and reset the timer
            setCurrentTurn((prev) => (prev === 'player' ? 'cpu' : 'player'));
            setTimeLeft(15);
            return;
        }

        const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timerId);
    }, [timeLeft, playerHealth, cpuHealth]);

    // Decrease cooldowns at the start of each player's turn
    useEffect(() => {
        if (currentTurn === 'player') {
            setPlayerHealCooldown((prev) => Math.max(0, prev - 1));
        } else {
            setCpuHealCooldown((prev) => Math.max(0, prev - 1));
        }
    }, [currentTurn]);

    // Core attack processor
    const performAttack = useCallback(
        (attacker: 'player' | 'cpu', damage: number, hitChance: number, energyCost: number) => {
            // Deduct energy first, regardless of hit or miss
            if (attacker === 'player') {
                setPlayerEnergy((prev) => Math.min(playerPokemon.energy, Math.max(0, prev - energyCost)));
                if (damage < 0) setPlayerHealCooldown(3); // Apply 3-turn cooldown to healing
            } else {
                setCpuEnergy((prev) => Math.min(cpuPokemon.energy, Math.max(0, prev - energyCost)));
                if (damage < 0) setCpuHealCooldown(3);
            }

            const isHit = Math.random() <= hitChance; // RNG logic

            if (isHit) {
                if (damage < 0) {
                    // Negative damage represents a healing move, apply to self
                    const healAmount = Math.abs(damage);
                    if (attacker === 'player') {
                        setPlayerHealth((prev) => Math.min(playerPokemon.maxHealth, prev + healAmount));
                        setPlayerDamageTaken(damage);
                        if (playerDamageTimerRef.current) clearTimeout(playerDamageTimerRef.current);
                        playerDamageTimerRef.current = setTimeout(() => setPlayerDamageTaken(null), 1000);
                    } else {
                        setCpuHealth((prev) => Math.min(cpuPokemon.maxHealth, prev + healAmount));
                        setCpuDamageTaken(damage);
                        if (cpuDamageTimerRef.current) clearTimeout(cpuDamageTimerRef.current);
                        cpuDamageTimerRef.current = setTimeout(() => setCpuDamageTaken(null), 1000);
                    }
                } else {
                    // Positive damage is a regular attack, apply to opponent
                    if (attacker === 'player') {
                        setCpuHealth((prev) => Math.max(0, prev - damage));
                        setCpuDamageTaken(damage);
                        if (cpuDamageTimerRef.current) clearTimeout(cpuDamageTimerRef.current);
                        cpuDamageTimerRef.current = setTimeout(() => setCpuDamageTaken(null), 1000);
                    } else {
                        setPlayerHealth((prev) => Math.max(0, prev - damage));
                        setPlayerDamageTaken(damage);
                        if (playerDamageTimerRef.current) clearTimeout(playerDamageTimerRef.current);
                        playerDamageTimerRef.current = setTimeout(() => setPlayerDamageTaken(null), 1000);
                    }
                }
            }

            // Switch turns and reset timer after an attack
            setCurrentTurn(attacker === 'player' ? 'cpu' : 'player');
            setTimeLeft(15);
        },
        [playerPokemon.energy, playerPokemon.maxHealth, cpuPokemon.energy, cpuPokemon.maxHealth],
    );

    // Helper exposed for the UI buttons
    const handlePlayerAttack = useCallback(
        (damage: number, hitChance: number, energyCost: number) => {
            if (currentTurn !== 'player') return;
            if (playerEnergy < energyCost) return;
            performAttack('player', damage, hitChance, energyCost);
        },
        [currentTurn, playerEnergy, performAttack],
    );

    // Basic CPU Artificial Intelligence
    useEffect(() => {
        if (currentTurn === 'cpu' && cpuHealth > 0 && playerHealth > 0) {
            // Wait 1.5 seconds so the player can see it's the CPU's turn, then attack randomly
            const timeout = setTimeout(() => {
                // Filter available actions so the CPU doesn't try to use a healing move on cooldown
                // and ensure it has enough energy to use the selected move
                const availableActions = cpuPokemon.actions.filter(
                    (action) => !(action.damage < 0 && cpuHealCooldown > 0) && cpuEnergy >= (action.energyCost ?? 15),
                );

                if (availableActions.length > 0) {
                    const move = availableActions[Math.floor(Math.random() * availableActions.length)];
                    performAttack('cpu', move.damage, move.hitChance, move.energyCost ?? 15);
                } else {
                    // Skip turn if the CPU has no energy left for any action
                    setCurrentTurn('player');
                    setTimeLeft(15);
                }
            }, 1500);
            return () => clearTimeout(timeout);
        }
    }, [currentTurn, cpuHealth, playerHealth, performAttack, cpuPokemon.actions, cpuHealCooldown, cpuEnergy]);

    const resetGame = useCallback(() => {
        setPlayerHealth(playerPokemon.maxHealth);
        setCpuHealth(cpuPokemon.maxHealth);
        setPlayerEnergy(playerPokemon.energy);
        setCpuEnergy(cpuPokemon.energy);
        setCurrentTurn('player');
        setTimeLeft(15);
        setPlayerDamageTaken(null);
        setCpuDamageTaken(null);
        setPlayerHealCooldown(0);
        setCpuHealCooldown(0);
    }, [playerPokemon.maxHealth, playerPokemon.energy, cpuPokemon.maxHealth, cpuPokemon.energy]);

    // UI Formatters for Actions
    const playerActions = useMemo(() => {
        return playerPokemon.actions.map((action) => {
            const energyCost = action.energyCost ?? 15;
            const isHealOnCooldown = action.damage < 0 && playerHealCooldown > 0;
            const notEnoughEnergy = playerEnergy < energyCost;
            const energyIndicator = energyCost < 0 ? `+${Math.abs(energyCost)}⚡` : `-${energyCost}⚡`;
            const baseLabel = `${action.label}\n(${energyIndicator})`;
            return {
                label: isHealOnCooldown ? `${baseLabel} ⏳${playerHealCooldown}` : baseLabel,
                disabled: currentTurn !== 'player' || playerHealth <= 0 || isHealOnCooldown || notEnoughEnergy,
                onPress: () => handlePlayerAttack(action.damage, action.hitChance, energyCost),
            };
        });
    }, [playerPokemon.actions, playerHealCooldown, playerEnergy, currentTurn, playerHealth, handlePlayerAttack]);

    const cpuActions = useMemo(() => {
        return cpuPokemon.actions.map((action) => {
            const energyCost = action.energyCost ?? 15;
            const isHealOnCooldown = action.damage < 0 && cpuHealCooldown > 0;
            const energyIndicator = energyCost < 0 ? `+${Math.abs(energyCost)}⚡` : `-${energyCost}⚡`;
            const baseLabel = `${action.label}\n(${energyIndicator})`;
            return {
                label: isHealOnCooldown ? `${baseLabel} ⏳${cpuHealCooldown}` : baseLabel,
                disabled: true,
            };
        });
    }, [cpuPokemon.actions, cpuHealCooldown]);

    return {
        playerHealth,
        cpuHealth,
        playerEnergy,
        cpuEnergy,
        currentTurn,
        timeLeft,
        handlePlayerAttack,
        resetGame,
        playerDamageTaken,
        cpuDamageTaken,
        playerHealCooldown,
        cpuHealCooldown,
        playerActions,
        cpuActions,
    };
}
