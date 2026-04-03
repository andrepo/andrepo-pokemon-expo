import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import BattleScreen from '../components/BattleScreen';

export default function BattleRoute() {
    const { playerId } = useLocalSearchParams();
    const router = useRouter();

    return <BattleScreen playerId={playerId as string} onExit={() => router.back()} />;
}
