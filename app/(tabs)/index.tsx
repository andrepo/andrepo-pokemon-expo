import { Image } from 'expo-image';
import { Tabs, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { POKEMON_DB } from '../../constants/pokemonDb';
import { useGame } from '../../context/GameContext';

export default function HomeScreen() {
    const router = useRouter();
    const { ownedPokemonIds } = useGame();
    const [view, setView] = useState<'menu' | 'browser' | 'select'>('menu');

    const renderMenu = () => (
        <View style={styles.center}>
            <Text style={styles.title}>POKÉMON HUB</Text>
            <TouchableOpacity style={styles.btn} onPress={() => setView('select')}>
                <Text style={styles.btnText}>BATALHA</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => setView('browser')}>
                <Text style={styles.btnText}>MEUS POKÉMONS</Text>
            </TouchableOpacity>
        </View>
    );

    const renderBrowser = () => (
        <View style={styles.center}>
            <Text style={styles.title}>INVENTÁRIO</Text>
            <FlatList
                data={ownedPokemonIds}
                keyExtractor={(id) => id}
                contentContainerStyle={{ alignItems: 'center' }}
                renderItem={({ item }) => {
                    const pkmn = POKEMON_DB[item];
                    return (
                        <View style={styles.row}>
                            <Image source={{ uri: pkmn.spriteUri }} style={styles.sprite} contentFit='contain' />
                            <Text style={styles.pkmnName}>{pkmn.name}</Text>
                        </View>
                    );
                }}
            />
            <TouchableOpacity style={styles.btn} onPress={() => setView('menu')}>
                <Text style={styles.btnText}>VOLTAR</Text>
            </TouchableOpacity>
        </View>
    );

    const renderSelect = () => (
        <View style={styles.center}>
            <Text style={styles.title}>ESCOLHA SEU LUTADOR</Text>
            <FlatList
                data={ownedPokemonIds}
                keyExtractor={(id) => id}
                contentContainerStyle={{ alignItems: 'center' }}
                renderItem={({ item }) => {
                    const pkmn = POKEMON_DB[item];
                    return (
                        <TouchableOpacity
                            style={styles.row}
                            onPress={() => {
                                router.push({ pathname: '/battle', params: { playerId: item } });
                            }}
                        >
                            <Image source={{ uri: pkmn.spriteUri }} style={styles.sprite} contentFit='contain' />
                            <Text style={styles.pkmnName}>{pkmn.name}</Text>
                        </TouchableOpacity>
                    );
                }}
            />
            <TouchableOpacity style={styles.btn} onPress={() => setView('menu')}>
                <Text style={styles.btnText}>VOLTAR</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Tabs.Screen options={{ tabBarStyle: { display: 'none' } }} />
            {view === 'menu' && renderMenu()}
            {view === 'browser' && renderBrowser()}
            {view === 'select' && renderSelect()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1f2937' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40 },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fbbf24',
        marginBottom: 40,
        textShadowColor: '#000',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
    btn: {
        backgroundColor: '#ef4444',
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#991b1b',
        marginBottom: 20,
        width: 250,
        alignItems: 'center',
    },
    btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#374151',
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
        width: 250,
        borderWidth: 2,
        borderColor: '#4b5563',
    },
    sprite: { width: 60, height: 60, marginRight: 16 },
    pkmnName: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
});
