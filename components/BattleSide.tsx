import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface ActionProps {
    label: string;
    disabled?: boolean;
    onPress?: () => void;
}

interface BattleSideProps {
    name: string;
    health: number; // Percentage 0-100
    energy: number; // Percentage 0-100
    pokemonSpriteUri: string;
    trainerSpriteUri: string;
    trainerPosition: 'left' | 'right';
    actions: ActionProps[];
    damageTaken?: number | null;
}

export default function BattleSide({
    name,
    health,
    energy,
    pokemonSpriteUri,
    trainerSpriteUri,
    trainerPosition,
    actions,
    damageTaken,
}: BattleSideProps) {
    return (
        <View style={styles.side}>
            <View style={styles.statsContainer}>
                <Text style={styles.name}>{name}</Text>
                {/* Health Bar */}
                <View style={styles.barBackground}>
                    <View style={[styles.healthBar, { width: `${health}%` }]} />
                </View>
            </View>

            <View style={styles.spritesContainer}>
                <Image source={{ uri: pokemonSpriteUri }} style={styles.pokemonSprite} contentFit='contain' />
                <Image
                    source={{ uri: trainerSpriteUri }}
                    style={trainerPosition === 'left' ? styles.trainerSpriteLeft : styles.trainerSpriteRight}
                    contentFit='contain'
                />
                {damageTaken !== null && damageTaken !== undefined && (
                    <Text style={styles.floatingDamage}>-{damageTaken}</Text>
                )}
            </View>

            {/* Action Buttons */}
            <View style={styles.actionsContainer}>
                {actions.map((action, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.roundButton, action.disabled && styles.disabledButton]}
                        disabled={action.disabled}
                        onPress={action.onPress}
                    >
                        <Text style={styles.buttonText}>{action.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.statsContainer}>
                {/* Energy Bar */}
                <View style={styles.barBackground}>
                    <View style={[styles.energyBar, { width: `${energy}%` }]} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    side: {
        flex: 1,
        padding: 8,
        justifyContent: 'space-between',
    },
    statsContainer: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        padding: 8,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#333',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 5,
        textAlign: 'center',
    },
    barBackground: {
        height: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
        marginBottom: 4,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#666',
    },
    healthBar: {
        height: '100%',
        backgroundColor: '#4ade80', // Green
    },
    energyBar: {
        height: '100%',
        backgroundColor: '#60a5fa', // Blue
    },
    spritesContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pokemonSprite: {
        width: 100,
        height: 100,
        zIndex: 2,
        transform: [{ translateY: 100 }], // Pushes the pokemon down to align with the stage floor
    },
    floatingDamage: {
        position: 'absolute',
        zIndex: 10,
        color: '#ef4444',
        fontSize: 36,
        fontWeight: '900',
        textShadowColor: '#fff',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
        transform: [{ translateY: 30 }], // Hovers slightly above the pokemon
    },
    trainerSpriteLeft: {
        width: 140,
        height: 140,
        position: 'absolute',
        zIndex: 1, // Forces the trainer to render behind the pokemon (which has zIndex: 2)
        transform: [{ translateY: 60 }, { translateX: -150 }], // Nudges it up and to the left
    },
    trainerSpriteRight: {
        width: 140,
        height: 140,
        position: 'absolute',
        zIndex: 1, // Forces the trainer to render behind the pokemon
        transform: [{ translateY: 60 }, { translateX: 150 }], // Nudges it up and to the right
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingBottom: 10,
    },
    roundButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#ef4444',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#991b1b',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    disabledButton: {
        backgroundColor: '#7f1d1d', // Darker gray-red to show it's disabled
        borderColor: '#450a0a',
        opacity: 0.6,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 11,
    },
});
