export type PokemonData = {
    id: string;
    name: string;
    maxHealth: number;
    energy: number;
    spriteUri: any;
    inventoryImageUri: any;
    type?: string;
    shortBio?: string;
    actions: { label: string; damage: number; hitChance: number; energyCost?: number }[];
};

export const POKEMON_DB: Record<string, PokemonData> = {
    pikachu: {
        id: 'pikachu',
        name: 'Pikachu',
        maxHealth: 100,
        energy: 100,
        spriteUri: require('../assets/images/game/25.gif'),
        inventoryImageUri: require('../assets/images/game/025.webp'),
        type: 'Elétrico',
        shortBio:
            'Pikachus que podem gerar eletricidade poderosa têm bolsas nas bochechas que são extra macias e super elásticas.',
        actions: [
            { label: 'Bola Elétrica', damage: 22, hitChance: 0.9, energyCost: 20 },
            { label: 'Ataque Rápido', damage: 10, hitChance: 1.0, energyCost: -15 },
        ],
    },
    mewtwo: {
        id: 'mewtwo',
        name: 'Mewtwo',
        maxHealth: 120,
        energy: 80,
        spriteUri: require('../assets/images/game/150.gif'),
        inventoryImageUri: require('../assets/images/game/150.webp'),
        type: 'Psíquico',
        shortBio:
            'Foi criado por um cientista após anos de terríveis experimentos de engenharia de DNA e manipulação genética.',
        actions: [
            { label: 'Confusão', damage: 10, hitChance: 1.0, energyCost: -15 },
            { label: 'Psíquico', damage: 22, hitChance: 0.85, energyCost: 25 },
            { label: 'Recuperar', damage: -25, hitChance: 1.0, energyCost: 30 },
        ],
    },
    charmander: {
        id: 'charmander',
        name: 'Charmander',
        maxHealth: 90,
        energy: 100,
        spriteUri: require('../assets/images/game/4.gif'),
        inventoryImageUri: require('../assets/images/game/004.webp'),
        type: 'Fogo',
        shortBio: 'A chama que queima na ponta de sua cauda é uma indicação de suas emoções.',
        actions: [
            { label: 'Lança-Chamas', damage: 22, hitChance: 0.85, energyCost: 20 },
            { label: 'Arranhão', damage: 10, hitChance: 1.0, energyCost: -15 },
        ],
    },
    bulbasaur: {
        id: 'bulbasaur',
        name: 'Bulbasaur',
        maxHealth: 110,
        energy: 100,
        spriteUri: require('../assets/images/game/1.gif'),
        inventoryImageUri: require('../assets/images/game/001.webp'),
        type: 'Planta / Venenoso',
        shortBio: 'Há uma semente de planta em suas costas desde o dia em que este Pokémon nasce.',
        actions: [
            { label: 'Chicote Vinha', damage: 11, hitChance: 0.95, energyCost: 15 },
            { label: 'Investida', damage: 10, hitChance: 1.0, energyCost: -15 },
        ],
    },
    eevee: {
        id: 'eevee',
        name: 'Eevee',
        maxHealth: 100,
        energy: 100,
        spriteUri: require('../assets/images/game/133.gif'),
        inventoryImageUri: require('../assets/images/game/133.webp'),
        type: 'Normal',
        shortBio:
            'Seu código genético é irregular. Pode sofrer mutações se for exposto à radiação de pedras elementares.',
        actions: [
            { label: 'Ataque Rápido', damage: 10, hitChance: 1.0, energyCost: -15 },
            { label: 'Cavar', damage: 22, hitChance: 0.85, energyCost: 20 },
        ],
    },
    psyduck: {
        id: 'psyduck',
        name: 'Psyduck',
        maxHealth: 110,
        energy: 100,
        spriteUri: require('../assets/images/game/54.gif'),
        inventoryImageUri: require('../assets/images/game/054.webp'),
        type: 'Água',
        shortBio:
            'Enquanto distrai seus inimigos com seu olhar vago, este Pokémon astuto usará poderes psicocinéticos.',
        actions: [
            { label: 'Arma de Água', damage: 12, hitChance: 0.95, energyCost: -15 },
            { label: 'Confusão', damage: 20, hitChance: 0.85, energyCost: 25 },
        ],
    },
    meowth: {
        id: 'meowth',
        name: 'Meowth',
        maxHealth: 90,
        energy: 100,
        spriteUri: require('../assets/images/game/52.gif'),
        inventoryImageUri: require('../assets/images/game/052.webp'),
        type: 'Normal',
        shortBio: 'Adora objetos circulares. Vaga pelas ruas todas as noites à procura de moedas perdidas.',
        actions: [
            { label: 'Arranhão', damage: 10, hitChance: 1.0, energyCost: -15 },
            { label: 'Talho Noturno', damage: 20, hitChance: 0.9, energyCost: 20 },
        ],
    },
    paras: {
        id: 'paras',
        name: 'Paras',
        maxHealth: 85,
        energy: 100,
        spriteUri: require('../assets/images/game/47.gif'),
        inventoryImageUri: require('../assets/images/game/047.webp'),
        type: 'Inseto / Planta',
        shortBio:
            'Cava debaixo da terra para roer raízes de árvores. Os cogumelos em suas costas absorvem a maior parte de sua nutrição.',
        actions: [
            { label: 'Picada', damage: 12, hitChance: 0.95, energyCost: -15 },
            { label: 'Bomba Semente', damage: 25, hitChance: 0.8, energyCost: 25 },
        ],
    },
    jigglypuff: {
        id: 'jigglypuff',
        name: 'Jigglypuff',
        maxHealth: 130,
        energy: 100,
        spriteUri: require('../assets/images/game/39.gif'),
        inventoryImageUri: require('../assets/images/game/039.webp'),
        type: 'Normal / Fada',
        shortBio:
            'Quando este Pokémon canta, ele nunca faz pausas para respirar. Se estiver em uma batalha contra um oponente que não adormece facilmente, Jigglypuff pode ficar sem ar, colocando sua vida em perigo.',
        actions: [
            { label: 'Tapa', damage: 10, hitChance: 1.0, energyCost: -15 },
            { label: 'Brilho Mágico', damage: 25, hitChance: 0.8, energyCost: 30 },
        ],
    },
    gengar: {
        id: 'gengar',
        name: 'Gengar',
        maxHealth: 110,
        energy: 100,
        spriteUri: require('../assets/images/game/94.gif'),
        inventoryImageUri: require('../assets/images/game/094.webp'),
        type: 'Fantasma / Venenoso',
        shortBio: 'Para roubar a vida de seu alvo, ele se esconde na sombra da vítima e espera em silêncio.',
        actions: [
            { label: 'Lamber', damage: 10, hitChance: 1.0, energyCost: -15 },
            { label: 'Bola Sombria', damage: 25, hitChance: 0.85, energyCost: 25 },
        ],
    },
    snorlax: {
        id: 'snorlax',
        name: 'Snorlax',
        maxHealth: 160,
        energy: 100,
        spriteUri: require('../assets/images/game/143.gif'),
        inventoryImageUri: require('../assets/images/game/143.webp'),
        type: 'Normal',
        shortBio:
            'Não se satisfaz a não ser que coma mais de 400 quilos de comida por dia. Quando termina de comer, ele dorme.',
        actions: [
            { label: 'Cabeçada', damage: 12, hitChance: 0.95, energyCost: -15 },
            { label: 'Hiper-Raio', damage: 30, hitChance: 0.75, energyCost: 35 },
            { label: 'Descansar', damage: -30, hitChance: 1.0, energyCost: 30 },
        ],
    },
    dragonite: {
        id: 'dragonite',
        name: 'Dragonite',
        maxHealth: 140,
        energy: 100,
        spriteUri: require('../assets/images/game/149.gif'),
        inventoryImageUri: require('../assets/images/game/149.webp'),
        type: 'Dragão / Voador',
        shortBio: 'Um Pokémon bondoso que guia navios perdidos em tempestades para a segurança.',
        actions: [
            { label: 'Sopro do Dragão', damage: 12, hitChance: 0.95, energyCost: -15 },
            { label: 'Garra do Dragão', damage: 25, hitChance: 0.85, energyCost: 20 },
        ],
    },
};

// The pool of strong Pokémon that the CPU can use
export const BOSS_POOL = ['mewtwo', 'gengar', 'snorlax', 'dragonite'];

// Random battle backgrounds
export const BATTLE_BACKGROUNDS: any[] = [
    require('../assets/images/game/wp14791617.webp'),
    require('../assets/images/game/wp14791610.webp'),
    require('../assets/images/game/wp14791602.webp'),
];

// Returns the pool of Pokémon you can unlock by winning, excluding those already owned!
export const getLootPool = (ownedPokemonIds: string[]): string[] => {
    const excludedIds = ['pikachu', ...BOSS_POOL];
    return Object.keys(POKEMON_DB).filter((id) => !excludedIds.includes(id) && !ownedPokemonIds.includes(id));
};
