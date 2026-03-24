import { Image } from 'expo-image';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useBattleLogic } from '../hooks/useBattleLogic';
import BattleSide from './BattleSide';

export default function BattleScreen() {
    const {
        playerHealth,
        cpuHealth,
        currentTurn,
        timeLeft,
        handlePlayerAttack,
        resetGame,
        playerDamageTaken,
        cpuDamageTaken,
    } = useBattleLogic();

    const isGameOver = playerHealth <= 0 || cpuHealth <= 0;

    return (
        <View style={styles.background}>
            {/* Background Image */}
            <Image
                source={{
                    uri: 'https://wallpapercave.com/wp/wp10311649.png',
                }}
                style={StyleSheet.absoluteFillObject}
                contentFit='cover'
            />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    {/* Timer */}
                    <View style={styles.timerWrapper}>
                        <View style={styles.timerContainer}>
                            <Text style={styles.timerText}>{timeLeft}</Text>
                        </View>
                        <View style={styles.turnIndicator}>
                            <Text style={styles.turnText}>{currentTurn === 'player' ? 'YOUR TURN' : 'ENEMY TURN'}</Text>
                        </View>
                    </View>

                    {/* PLAYER SIDE (Left) */}
                    <BattleSide
                        name='Pikachu'
                        health={playerHealth}
                        energy={100}
                        pokemonSpriteUri='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/25.gif'
                        trainerSpriteUri='https://play.pokemonshowdown.com/sprites/trainers/ash.png'
                        trainerPosition='left'
                        actions={[
                            {
                                label: 'Bola Elétrica',
                                disabled: currentTurn !== 'player' || playerHealth <= 0,
                                onPress: () => handlePlayerAttack(25, 0.8), // 25 Dmg, 80% Accuracy
                            },
                            {
                                label: 'Raio da Fúria',
                                disabled: currentTurn !== 'player' || playerHealth <= 0,
                                onPress: () => handlePlayerAttack(15, 1.0), // 15 Dmg, 100% Accuracy
                            },
                        ]}
                        damageTaken={playerDamageTaken}
                    />

                    {/* CPU SIDE (Right) */}
                    <BattleSide
                        name='Mewtwo'
                        health={cpuHealth}
                        energy={80}
                        pokemonSpriteUri='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/150.gif'
                        trainerSpriteUri='https://play.pokemonshowdown.com/sprites/trainers/ash.png'
                        trainerPosition='right'
                        actions={[
                            { label: 'Psíquico', disabled: true },
                            { label: 'Recuperar', disabled: true },
                        ]}
                        damageTaken={cpuDamageTaken}
                    />
                </View>
            </SafeAreaView>

            {/* Game Over Overlay */}
            {isGameOver && (
                <View style={styles.gameOverOverlay}>
                    <Text style={styles.gameOverText}>VOCÊ {playerHealth <= 0 ? 'PERDEU!' : 'VENCEU!'}</Text>
                    <TouchableOpacity style={styles.restartButton} onPress={resetGame}>
                        <Text style={styles.restartButtonText}>JOGAR NOVAMENTE</Text>
                    </TouchableOpacity>
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
    restartButton: {
        marginTop: 24,
        backgroundColor: '#ef4444',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#991b1b',
    },
    restartButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
