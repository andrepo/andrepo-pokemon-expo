export type PokemonData = {
    id: string;
    name: string;
    maxHealth: number;
    energy: number;
    spriteUri: string;
    inventoryImageUri: string;
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
        spriteUri:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/25.gif',
        inventoryImageUri: 'https://db.pokemongohub.net/images/official/full/025.webp',
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
        spriteUri:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/150.gif',
        inventoryImageUri: 'https://db.pokemongohub.net/images/official/full/150.webp',
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
        spriteUri:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/4.gif',
        inventoryImageUri: 'https://db.pokemongohub.net/images/official/full/004.webp',
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
        spriteUri:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/1.gif',
        inventoryImageUri: 'https://db.pokemongohub.net/images/official/full/001.webp',
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
        spriteUri:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/133.gif',
        inventoryImageUri: 'https://db.pokemongohub.net/images/official/full/133.webp',
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
        spriteUri:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/54.gif',
        inventoryImageUri: 'https://db.pokemongohub.net/images/official/full/054.webp',
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
        spriteUri:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/52.gif',
        inventoryImageUri: 'https://db.pokemongohub.net/images/official/full/052.webp',
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
        spriteUri:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/47.gif',
        inventoryImageUri: 'https://db.pokemongohub.net/images/official/full/047.webp',
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
        spriteUri:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/39.gif',
        inventoryImageUri: 'https://db.pokemongohub.net/images/official/full/039.webp',
        type: 'Normal / Fada',
        shortBio:
            'Quando este Pokémon canta, ele nunca faz pausas para respirar. Se estiver em uma batalha contra um oponente que não adormece facilmente, Jigglypuff pode ficar sem ar, colocando sua vida em perigo.',
        actions: [
            { label: 'Tapa', damage: 10, hitChance: 1.0, energyCost: -15 },
            { label: 'Brilho Mágico', damage: 25, hitChance: 0.8, energyCost: 30 },
        ],
    },
};

// Returns the pool of Pokémon you can unlock by winning, excluding those already owned!
export const getLootPool = (ownedPokemonIds: string[]): string[] => {
    const excludedIds = ['pikachu', 'mewtwo'];
    return Object.keys(POKEMON_DB).filter((id) => !excludedIds.includes(id) && !ownedPokemonIds.includes(id));
};
