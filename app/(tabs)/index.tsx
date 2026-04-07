import { Image } from 'expo-image';
import { Tabs, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { POKEMON_DB } from '../../constants/pokemonDb';
import { useGame } from '../../context/GameContext';

// --- Custom Hook (Logic) ---
function useHomeScreen() {
    const router = useRouter();
    const { ownedPokemonIds } = useGame();
    const [view, setView] = useState<'menu' | 'browser' | 'select'>('menu');

    const navigateToBattle = (playerId: string) => {
        router.push({ pathname: '/battle', params: { playerId } });
    };

    return { view, setView, ownedPokemonIds, navigateToBattle };
}

// --- Reusable UI Components ---
function MenuButton({ onPress, title }: { onPress: () => void; title: string }) {
    return (
        <TouchableOpacity style={styles.btn} onPress={onPress}>
            <Text style={styles.btnText}>{title}</Text>
        </TouchableOpacity>
    );
}

function PokemonRow({ item, onPress, showBio = false }: { item: string; onPress?: () => void; showBio?: boolean }) {
    const pkmn = POKEMON_DB[item];
    const [expanded, setExpanded] = useState(false);

    const handlePress = onPress ? onPress : showBio ? () => setExpanded(!expanded) : undefined;
    const Container = handlePress ? TouchableOpacity : View;

    const totalAttack = pkmn.actions.reduce((sum, action) => sum + (action.damage > 0 ? action.damage : 0), 0);

    return (
        <Container style={styles.row} onPress={handlePress} activeOpacity={handlePress ? 0.7 : 1}>
            <Image source={{ uri: pkmn.inventoryImageUri }} style={styles.sprite} contentFit='contain' />
            <View style={styles.infoContainer}>
                <Text style={styles.pkmnName}>{pkmn.name}</Text>
                {pkmn.type && <Text style={styles.pkmnType}>{pkmn.type}</Text>}
                {showBio && (
                    <Text style={styles.pkmnStats}>
                        HP: {pkmn.maxHealth} | Energia: {pkmn.energy} | Ataque: {totalAttack}
                    </Text>
                )}
                {showBio && pkmn.shortBio && (
                    <Text style={styles.pkmnBio} numberOfLines={expanded ? undefined : 2}>
                        {pkmn.shortBio}
                    </Text>
                )}
            </View>
        </Container>
    );
}

// --- Screen Sections ---
function MainMenu({ setView }: { setView: (v: 'menu' | 'browser' | 'select') => void }) {
    return (
        <View style={styles.center}>
            <Text style={styles.title}>POKÉMON HUB</Text>
            <MenuButton onPress={() => setView('select')} title='BATALHA' />
            <MenuButton onPress={() => setView('browser')} title='MEUS POKÉMONS' />
        </View>
    );
}

function PokemonBrowser({ ownedPokemonIds, setView }: { ownedPokemonIds: string[]; setView: (v: 'menu') => void }) {
    return (
        <View style={styles.center}>
            <Text style={styles.title}>INVENTÁRIO</Text>
            <FlatList
                data={ownedPokemonIds}
                keyExtractor={(id) => id}
                contentContainerStyle={{ alignItems: 'center' }}
                renderItem={({ item }) => <PokemonRow item={item} showBio />}
            />
            <MenuButton onPress={() => setView('menu')} title='VOLTAR' />
        </View>
    );
}

function FighterSelect({
    ownedPokemonIds,
    setView,
    onSelect,
}: {
    ownedPokemonIds: string[];
    setView: (v: 'menu') => void;
    onSelect: (id: string) => void;
}) {
    return (
        <View style={styles.center}>
            <Text style={styles.title}>ESCOLHA SEU LUTADOR</Text>
            <FlatList
                data={ownedPokemonIds}
                keyExtractor={(id) => id}
                contentContainerStyle={{ alignItems: 'center' }}
                renderItem={({ item }) => <PokemonRow item={item} onPress={() => onSelect(item)} />}
            />
            <MenuButton onPress={() => setView('menu')} title='VOLTAR' />
        </View>
    );
}

// --- Main Screen Component ---
export default function HomeScreen() {
    const { view, setView, ownedPokemonIds, navigateToBattle } = useHomeScreen();

    return (
        <SafeAreaView style={styles.container}>
            <Tabs.Screen options={{ tabBarStyle: { display: 'none' } }} />
            {view === 'menu' && <MainMenu setView={setView} />}
            {view === 'browser' && <PokemonBrowser ownedPokemonIds={ownedPokemonIds} setView={setView} />}
            {view === 'select' && (
                <FighterSelect ownedPokemonIds={ownedPokemonIds} setView={setView} onSelect={navigateToBattle} />
            )}
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
        width: 300,
        borderWidth: 2,
        borderColor: '#4b5563',
    },
    sprite: { width: 60, height: 60, marginRight: 16 },
    infoContainer: { flex: 1 },
    pkmnName: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
    pkmnType: { color: '#9ca3af', fontSize: 12, fontWeight: '600', marginBottom: 2 },
    pkmnStats: { color: '#fbbf24', fontSize: 11, fontWeight: 'bold', marginBottom: 4 },
    pkmnBio: { color: '#d1d5db', fontSize: 11, fontStyle: 'italic' },
});
