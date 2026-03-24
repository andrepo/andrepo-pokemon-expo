import BattleScreen from '@/components/BattleScreen';
import { Tabs } from 'expo-router';

export default function HomeScreen() {
    return (
        <>
            <Tabs.Screen options={{ tabBarStyle: { display: 'none' } }} />
            <BattleScreen />
        </>
    );
}
