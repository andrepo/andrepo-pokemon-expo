import { Image } from 'expo-image';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BATTLE_BACKGROUNDS, BOSS_POOL, POKEMON_DB } from '../constants/pokemonDb';
import { useBattleLogic } from '../hooks/useBattleLogic';
import { useBattleLoot } from '../hooks/useBattleLoot';
import BattleSide from './BattleSide';

interface BattleScreenProps {
    playerId?: string;
    onExit?: () => void;
}

export default function BattleScreen({ playerId = 'pikachu', onExit }: BattleScreenProps) {
    const playerPokemon = POKEMON_DB[playerId] || POKEMON_DB['pikachu'];
    const [cpuPokemonId] = useState(() => BOSS_POOL[Math.floor(Math.random() * BOSS_POOL.length)]);
    const cpuPokemon = POKEMON_DB[cpuPokemonId];
    const [backgroundSource] = useState(
        () => BATTLE_BACKGROUNDS[Math.floor(Math.random() * BATTLE_BACKGROUNDS.length)],
    );

    const {
        playerHealth,
        cpuHealth,
        playerEnergy,
        cpuEnergy,
        currentTurn,
        timeLeft,
        resetGame,
        playerDamageTaken,
        cpuDamageTaken,
        playerActions,
        cpuActions,
    } = useBattleLogic(playerPokemon, cpuPokemon);

    const isGameOver = playerHealth <= 0 || cpuHealth <= 0;
    const isPlayerWinner = cpuHealth <= 0;

    const { loot, setLoot } = useBattleLoot(isGameOver, isPlayerWinner);

    return (
        <View style={styles.background}>
            {/* Background Image */}
            <Image source={backgroundSource} style={StyleSheet.absoluteFillObject} contentFit='cover' />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    {/* Timer */}
                    <View style={styles.timerWrapper}>
                        <View style={styles.timerContainer}>
                            <Text style={styles.timerText}>{timeLeft}</Text>
                        </View>
                        <View style={styles.turnIndicator}>
                            <Text style={styles.turnText}>
                                {currentTurn === 'player' ? 'SEU TURNO' : 'TURNO INIMIGO'}
                            </Text>
                        </View>
                    </View>

                    {/* PLAYER SIDE (Left) */}
                    <BattleSide
                        name={playerPokemon.name}
                        health={(playerHealth / playerPokemon.maxHealth) * 100}
                        energy={(playerEnergy / playerPokemon.energy) * 100}
                        pokemonSpriteUri={playerPokemon.spriteUri}
                        trainerSpriteUri={require('../assets/images/game/trainer_ash.png')}
                        trainerPosition='left'
                        actions={playerActions}
                        damageTaken={playerDamageTaken}
                    />

                    {/* CPU SIDE (Right) */}
                    <BattleSide
                        name={cpuPokemon.name}
                        health={(cpuHealth / cpuPokemon.maxHealth) * 100}
                        energy={(cpuEnergy / cpuPokemon.energy) * 100}
                        pokemonSpriteUri={cpuPokemon.spriteUri}
                        trainerSpriteUri={require('../assets/images/game/trainer_ash.png')}
                        trainerPosition='right'
                        actions={cpuActions}
                        damageTaken={cpuDamageTaken}
                    />
                </View>
            </SafeAreaView>

            {/* Game Over Overlay */}
            {isGameOver && (
                <View style={styles.gameOverOverlay}>
                    <Text style={styles.gameOverText}>VOCÊ {playerHealth <= 0 ? 'PERDEU!' : 'VENCEU!'}</Text>

                    {loot && (
                        <View style={styles.lootContainer}>
                            <Text style={styles.lootText}>NOVO POKÉMON: {POKEMON_DB[loot].name}!</Text>
                            <Image
                                source={POKEMON_DB[loot].inventoryImageUri}
                                style={{ width: 100, height: 100 }}
                                contentFit='contain'
                            />
                        </View>
                    )}

                    <TouchableOpacity
                        style={styles.restartButton}
                        onPress={() => {
                            setLoot(null);
                            resetGame();
                        }}
                    >
                        <Text style={styles.restartButtonText}>JOGAR NOVAMENTE</Text>
                    </TouchableOpacity>

                    {onExit && (
                        <TouchableOpacity style={[styles.restartButton, styles.exitButton]} onPress={onExit}>
                            <Text style={styles.restartButtonText}>VOLTAR AO MENU</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.15)', // Slight overlay to pop foreground elements
    },
    divider: {
        width: 4,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    timerWrapper: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 10,
    },
    timerContainer: {
        backgroundColor: '#fbbf24', // Street Fighter-style gold/yellow
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderWidth: 3,
        borderColor: '#b45309',
        borderRadius: 8,
    },
    timerText: {
        fontSize: 28,
        fontWeight: '900',
        color: '#fff',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    turnIndicator: {
        marginTop: 8,
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    turnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    gameOverOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
    gameOverText: {
        fontSize: 56,
        fontWeight: '900',
        color: '#fbbf24', // Match the timer's yellow
        textShadowColor: '#000',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    lootContainer: {
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 16,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#fbbf24',
    },
    lootText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    restartButton: {
        marginTop: 24,
        backgroundColor: '#ef4444',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#991b1b',
    },
    exitButton: {
        backgroundColor: '#3b82f6',
        borderColor: '#1d4ed8',
    },
    restartButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
