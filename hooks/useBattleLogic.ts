import { useCallback, useEffect, useState } from 'react';

export function useBattleLogic() {
    const [playerHealth, setPlayerHealth] = useState(100);
    const [cpuHealth, setCpuHealth] = useState(100);
    const [currentTurn, setCurrentTurn] = useState<'player' | 'cpu'>('player');
    const [timeLeft, setTimeLeft] = useState(15);
    const [playerDamageTaken, setPlayerDamageTaken] = useState<number | null>(null);
    const [cpuDamageTaken, setCpuDamageTaken] = useState<number | null>(null);

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

    // Core attack processor
    const performAttack = useCallback((attacker: 'player' | 'cpu', damage: number, hitChance: number) => {
        const isHit = Math.random() <= hitChance; // RNG logic

        if (isHit) {
            if (attacker === 'player') {
                setCpuHealth((prev) => Math.max(0, prev - damage));
                setCpuDamageTaken(damage);
                setTimeout(() => setCpuDamageTaken(null), 1000);
            } else {
                setPlayerHealth((prev) => Math.max(0, prev - damage));
                setPlayerDamageTaken(damage);
                setTimeout(() => setPlayerDamageTaken(null), 1000);
            }
        } else {
            console.log(`${attacker} missed the attack!`);
        }

        // Switch turns and reset timer after an attack
        setCurrentTurn(attacker === 'player' ? 'cpu' : 'player');
        setTimeLeft(15);
    }, []);

    // Helper exposed for the UI buttons
    const handlePlayerAttack = (damage: number, hitChance: number) => {
        if (currentTurn !== 'player') return;
        performAttack('player', damage, hitChance);
    };

    // Basic CPU Artificial Intelligence
    useEffect(() => {
        if (currentTurn === 'cpu' && cpuHealth > 0 && playerHealth > 0) {
            // Wait 1.5 seconds so the player can see it's the CPU's turn, then attack randomly
            const timeout = setTimeout(() => {
                const isStrongAttack = Math.random() > 0.5;
                performAttack('cpu', isStrongAttack ? 25 : 15, isStrongAttack ? 0.7 : 1.0);
            }, 1500);
            return () => clearTimeout(timeout);
        }
    }, [currentTurn, cpuHealth, playerHealth, performAttack]);

    const resetGame = useCallback(() => {
        setPlayerHealth(100);
        setCpuHealth(100);
        setCurrentTurn('player');
        setTimeLeft(15);
        setPlayerDamageTaken(null);
        setCpuDamageTaken(null);
    }, []);

    return {
        playerHealth,
        cpuHealth,
        currentTurn,
        timeLeft,
        handlePlayerAttack,
        resetGame,
        playerDamageTaken,
        cpuDamageTaken,
    };
}
