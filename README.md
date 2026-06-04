# Project Documentation: Pokémon Battle App

This document describes the architecture, directory structure, and business logic behind the Pokémon Battle app built with React Native and Expo.

## 📂 Architecture and Directory Structure

The project uses **Expo Router** for navigation and adopts an architecture based on separation of concerns (UI vs. Logic), utilizing _Custom Hooks_ and the _Context API_.

- **`/app`**: Contains the application routes.
    - `(tabs)/index.tsx`: Home screen (Hub). Manages the Main Menu, Pokémon Inventory, and Fighter Selection Screen through the `useHomeScreen` hook.
    - `battle.tsx`: Battle route that receives the `playerId` as a parameter and renders the `BattleScreen` component.
- **`/components`**: Visual components (Presentation).
    - `BattleScreen.tsx`: Main combat screen. Brings together the player UI, enemy UI, timer, and Game Over screen. Contains no direct business logic.
    - `BattleSide.tsx`: Isolated component that renders a combatant (Pokémon Sprite, Trainer, Health Bar, Energy Bar, and Action Buttons).
- **`/hooks`**: Business rules and isolated state.
    - `useBattleLogic.ts`: The main "engine" of the game. Manages turns, health, energy, and cooldowns.
    - `useBattleLoot.ts`: Manages the reward system upon winning a battle.
- **`/constants`**:
    - `pokemonDb.ts`: The static database containing attributes, attacks, images (sprites), and the reward pool function (`getLootPool`).
- **`/context`**:
    - `GameContext.tsx`: Manages the player's global state (e.g., unlocked Pokémon/inventory).
- **`/scripts`**: Automation tools.
    - `localize-assets.js`: A Node.js script that parses the database, downloads all remote images to `assets/images/game`, and automatically updates `pokemonDb.ts` to use local `require()` imports.

### Commands

```bash
node scripts/localize-assets.js
```

---

## 🖼️ How to Add a New Pokémon & Localize Sprites

When adding a new Pokémon, you must provide its front sprite, back sprite, and inventory image as remote HTTP/HTTPS URLs. The localization script will automatically download them and configure the local `require()` imports.

### 1. Configure the URLs in `pokemonDb.ts`
Under the Pokémon's database entry in [pokemonDb.ts](file:///Users/andrepaterlinioliveiravieira/andrepo-pokemon-expo/constants/pokemonDb.ts), define the following fields with temporary string URLs:
*   `spriteUri`: The front-facing sprite (used on the CPU/Right side).
*   `backSpriteUri` *(Optional)*: The back-facing sprite (used on the Player/Left side). If omitted, it will automatically fall back to the front sprite.
*   `inventoryImageUri`: The high-resolution official artwork image used for menus and inventory.

### 2. Sprite URL Sources

#### A. PokéAPI (Generations 1 to 5)
For Gen 1-5 Pokémon, use the official Gen 5 animated GIF sprites:
*   **Front (Animated)**: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/<dex_number>.gif`
*   **Back (Animated)**: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/<dex_number>.gif`
*   **Inventory (Artwork)**: `https://db.pokemongohub.net/images/official/full/<three_digit_dex_number_with_leading_zeros>.webp`

#### B. Pokémon Showdown (Generations 6 to 9)
For newer generations, use the Pokémon Showdown sprite mirrors:
*   **Front (Animated)**: `https://play.pokemonshowdown.com/sprites/gen5ani/<lowercase_pokemon_name>.gif`
*   **Back (Static fallback)**: `https://play.pokemonshowdown.com/sprites/gen5-back/<lowercase_pokemon_name>.png` (or `ani-back/` if an animated GIF is available).
*   **Inventory (Artwork)**: `https://db.pokemongohub.net/images/official/full/<dex_number>.webp`

### 3. Localize the Assets
Once the URLs are configured, run the localization script:
```bash
node scripts/localize-assets.js
```
The script will:
1. Scan `pokemonDb.ts` for HTTP/HTTPS strings.
2. Download them to `assets/images/game/`.
3. Avoid collisions: If a URL contains `/back/` or `-back/`, it automatically renames the local file to have a `_back` suffix (e.g. `23_back.gif`).
4. Replace the remote URL strings in `pokemonDb.ts` with local `require()` imports.

### 4. Clear Metro Cache
After running the script, Metro Bundler must be restarted with cache clearing so that it discovers the new require files:
```bash
npx expo start -c --ios
```

---

## ⚔️ Battle Logic (`useBattleLogic`)

The battle takes place in alternating turns between the **Player** and the **CPU** (Artificial Intelligence). Combat is supported by three main pillars: **Health (HP)**, **Energy**, and **Time**.

### 1. Turn and Time System

- Each combatant has **15 seconds** to perform an action.
- If the timer reaches zero (`timeLeft <= 0`), the turn is automatically passed to the opponent.
- Upon executing an action, the turn ends and the clock resets to 15 seconds.

### 2. Health and Healing

- Attacks reduce the opponent's `Health` (HP). The game ends when either side's HP reaches `0`.
- **Healing Abilities**: Identified in the database with negative `damage` (e.g., `damage: -25`).
    - The negative value is converted into an HP gain for the user, capped at the Pokémon's `maxHealth`.
    - Using a healing ability applies a **3-Turn Cooldown** (`setPlayerHealCooldown(3)`), preventing the attack from being 'spammed'. The cooldown is reduced at the start of the user's turn.

### 3. Energy System

- **Consumption (Charged Attacks)**: Powerful abilities have a positive energy cost (`energyCost: 20`). The attack can only be executed if the Pokémon has energy equal to or greater than the cost.
- **Generation (Fast Attacks)**: Basic attacks have a negative energy cost (`energyCost: -15`). By subtracting a negative value, math adds the value to the Pokémon's energy bar (capped at the Pokémon's native max energy).

### 4. CPU Artificial Intelligence

During the CPU's turn:

1. The engine waits 1.5 seconds so the player notices the turn change.
2. The AI filters its Pokémon's attack list to remove:
    - Healing attacks that are on _Cooldown_.
    - Attacks whose energy cost is greater than the current energy.
3. From the remaining attacks, it selects one randomly. If no attacks are available (out of energy), it "passes" the turn to the player.

---

## 🎁 Reward System (`useBattleLoot`)

When a battle reaches the game over condition (`isGameOver`):

1. The system checks if the Player was the winner (`cpuHealth <= 0`).
2. `getLootPool` filters the `POKEMON_DB`, removing:
    - Fixed/starter Pokémon (Pikachu and Mewtwo).
    - Pokémon that already exist in the player's inventory (`ownedPokemonIds`).
3. If there are still locked Pokémon, the system chooses one randomly.
4. The new Pokémon is saved in the global state (`addPokemon`) and displayed on the victory screen.

---

## 🔄 Implemented Best Practices

- **UI Extraction**: The visual formatting logic for buttons (e.g., visually indicating energy gain/loss on labels and showing cooldown time) is processed in the `useBattleLogic` hook and delivered ready-to-use as the `playerActions` and `cpuActions` arrays to the visual layer (`BattleScreen`).
- **DRY (Don't Repeat Yourself)**: The home screen extracted repeating elements across the menu, inventory, and fighter selection views into base components (`MenuButton` and `PokemonRow`).
- **Separation of Concerns**: UI components handle rendering while Custom Hooks handle state, lifecycle loops, and calculations.
