import { ALL_POKEMON_IDS, BOSS_POOL, getLootPool, POKEMON_DB } from '../constants/pokemonDb';

describe('pokemonDb Constants', () => {
    it('contains valid POKEMON_DB entries', () => {
        expect(POKEMON_DB).toBeDefined();
        const keys = Object.keys(POKEMON_DB);
        expect(keys.length).toBeGreaterThan(0);

        keys.forEach((key) => {
            const pokemon = POKEMON_DB[key];
            expect(pokemon.id).toBeDefined();
            expect(pokemon.name).toBeDefined();
            expect(pokemon.maxHealth).toBeGreaterThan(0);
            expect(pokemon.energy).toBeGreaterThan(0);
            expect(Array.isArray(pokemon.actions)).toBe(true);
            expect(pokemon.actions.length).toBeGreaterThan(0);
        });
    });

    it('contains valid species in BOSS_POOL', () => {
        expect(BOSS_POOL.length).toBeGreaterThan(0);
        BOSS_POOL.forEach((id) => {
            expect(POKEMON_DB[id]).toBeDefined();
        });
    });

    it('calculates loot pool correctly excluding owned IDs and excluded species', () => {
        const owned = ['charmander'];
        const pool = getLootPool(owned);
        expect(pool).not.toContain('pikachu');
        expect(pool).not.toContain('charmander');
        BOSS_POOL.forEach((bossId) => {
            expect(pool).not.toContain(bossId);
        });
    });

    it('defines ALL_POKEMON_IDS correctly', () => {
        expect(ALL_POKEMON_IDS).toBeDefined();
        expect(Array.isArray(ALL_POKEMON_IDS)).toBe(true);
    });
});
