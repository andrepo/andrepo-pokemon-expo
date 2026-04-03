export type PokemonData = {
    id: string;
    name: string;
    maxHealth: number;
    energy: number;
    spriteUri: string;
    actions: { label: string; damage: number; hitChance: number }[];
};

export const POKEMON_DB: Record<string, PokemonData> = {
    pikachu: {
        id: 'pikachu',
        name: 'Pikachu',
        maxHealth: 100,
        energy: 100,
        spriteUri:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/25.gif',
        actions: [
            { label: 'Bola Elétrica', damage: 22, hitChance: 0.9 }, // Based on Thunderbolt (Power 90)
            { label: 'Ataque Rápido', damage: 10, hitChance: 1.0 }, // Based on Quick Attack (Power 40)
        ],
    },
    mewtwo: {
        id: 'mewtwo',
        name: 'Mewtwo',
        maxHealth: 120,
        energy: 80,
        spriteUri:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/150.gif',
        actions: [
            { label: 'Psíquico', damage: 22, hitChance: 0.85 }, // Based on Psychic (Power 90)
            { label: 'Recuperar', damage: -25, hitChance: 1.0 }, // Heals a flat amount
        ],
    },
    charmander: {
        id: 'charmander',
        name: 'Charmander',
        maxHealth: 90,
        energy: 100,
        spriteUri:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/4.gif',
        actions: [
            { label: 'Lança-Chamas', damage: 22, hitChance: 0.85 }, // Based on Flamethrower (Power 90)
            { label: 'Arranhão', damage: 10, hitChance: 1.0 }, // Based on Scratch (Power 40)
        ],
    },
    bulbasaur: {
        id: 'bulbasaur',
        name: 'Bulbasaur',
        maxHealth: 110,
        energy: 100,
        spriteUri:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/1.gif',
        actions: [
            { label: 'Chicote Vinha', damage: 11, hitChance: 0.95 }, // Based on Vine Whip (Power 45)
            { label: 'Investida', damage: 10, hitChance: 1.0 }, // Based on Tackle (Power 40)
        ],
    },
};

// The pool of pokemon you can unlock by winning!
export const LOOT_POOL = ['charmander', 'bulbasaur'];
