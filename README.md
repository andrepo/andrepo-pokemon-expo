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
