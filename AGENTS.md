# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v54.0.0/ before writing any code.

# Autonomous development

For implementation tasks, proceed without asking for confirmation:
- edit in-repo code;
- install necessary development dependencies;
- run tests, linting, builds, local servers, and Playwright checks;
- fix failures found during verification.

# Coding Standards & Guidelines

## 1. Constants-Driven Data & Single Source of Truth
- **Rule:** Do not hardcode Pokemon statistics, moves, hit chances, energy costs, or asset paths inside JSX or component files.
- **Standard:** Centralize all game data, Pokemon species definitions, action damage formulas, and sprite references in [pokemonDb.ts](file:///Users/andrepaterlinioliveiravieira/andrepo-pokemon-expo/constants/pokemonDb.ts) (`POKEMON_DB`). UI screens, hooks, and battle mechanisms must query this database dynamically.

## 2. Separation of Business Logic & UI Components
- **Rule:** Avoid mixing complex state machines, turn timers, damage calculation RNG, or inventory filters directly inside UI render trees.
- **Standard:** Encapsulate game logic and state transitions in custom hooks (e.g., [useBattleLogic.ts](file:///Users/andrepaterlinioliveiravieira/andrepo-pokemon-expo/hooks/useBattleLogic.ts), `useHomeScreen`, `useBattleLoot`). Components such as `BattleScreen.tsx` and `BattleSide.tsx` should only consume hook outputs and render UI.

## 3. Code Language: English Code Tokens & Localized Content
- **Rule:** Do not use Portuguese (or other non-English languages) for code tokens, variable names, hook names, or comments.
- **Standard:** All code elements—including variable names, TypeScript interfaces, functions, state keys, and internal comments—must be strictly in English. User-facing content (such as Pokemon move names, bios, and UI titles) defined in database constants or UI constants may retain their intended display language.

## 4. Zero Client Secrets & Secure Auth
- **Rule:** Never ship secret API keys, master database credentials, or administrative tokens inside Expo client configurations (`app.json`, `app.config.js`), source code, or static assets.
- **Standard:** Route all privileged external API calls and remote services through a secure backend API gateway / BFF (Backend-For-Frontend). Authenticate client requests using short-lived per-user tokens (e.g., JWT/OAuth) with strict server-side authorization and rate limiting.

## 5. WebView & Remote Asset Sandboxing
- **Rule:** Do not execute unpinned dynamic JavaScript from remote public CDNs in WebViews or web components, and avoid wildcard origin allowlists (`originWhitelist={["*"]}`).
- **Standard:** Bundle static HTML, game assets, and scripts locally within the app bundle whenever possible. Use explicit origin allowlists, restrict web navigations using `onShouldStartLoadWithRequest`, and validate all cross-bridge `postMessage` payloads against strict constants before execution.

## 6. Async Resilience, Polling Guards & Side-Effect Cleanup
- **Rule:** Avoid un-guarded infinite polling loops, un-cancelled async requests, or state updates prone to memory leaks when screens unmount or turn timers expire.
- **Standard:** Manage network polling and asynchronous workflows using `AbortController` or request generation IDs to cancel stale or unmounted requests immediately. Clean up timer intervals (`clearInterval`) and timeouts (`clearTimeout`) in `useEffect` cleanup callbacks. Enforce exponential backoff and request debouncing where applicable.

## 7. Runtime Boundary Validation & Strict Type Safety
- **Rule:** Never trust raw remote API responses or index dynamic objects directly using unvalidated remote strings. Avoid `any` or loose `Record<string, any>` types at serialization boundaries.
- **Standard:** Define explicit TypeScript types (e.g., `PokemonData` in [pokemonDb.ts](file:///Users/andrepaterlinioliveiravieira/andrepo-pokemon-expo/constants/pokemonDb.ts), `GameContextType` in [GameContext.tsx](file:///Users/andrepaterlinioliveiravieira/andrepo-pokemon-expo/context/GameContext.tsx)). Validate all incoming external network payloads using a runtime schema parser (e.g., Zod) before committing values to state, providing safe fallback defaults for unexpected enum values.

## 8. Sanitized Error Handling & Telemetry Logging
- **Rule:** Never expose raw server errors, internal stack trace details, or sensitive identifiers in user-facing UI components or raw production `console.log` statements.
- **Standard:** Intercept failures at the API adapter layer, sanitize error messages using localized user-friendly templates, and send scrubbed diagnostic telemetry only to approved monitoring services in production.

## 9. Global State Management via Context
- **Rule:** Do not pass global inventory or player progress through deep prop drilling across routes.
- **Standard:** Manage shared player state (e.g., `ownedPokemonIds`, `addPokemon`) through React Context ([GameContext.tsx](file:///Users/andrepaterlinioliveiravieira/andrepo-pokemon-expo/context/GameContext.tsx)). Encapsulate local screen/battle state within dedicated hooks or component state.

## 10. Optimized Asset Handling with Expo Image
- **Rule:** Do not use legacy image loaders or unoptimized remote image URLs for animated battle sprites and inventory assets.
- **Standard:** Use `expo-image` (`Image` from `'expo-image'`) for rendering `.gif` sprites and `.webp` inventory assets. Ensure local assets are imported via `require(...)` inside constant definitions ([pokemonDb.ts](file:///Users/andrepaterlinioliveiravieira/andrepo-pokemon-expo/constants/pokemonDb.ts)).

## 11. Expo Router Navigation Conventions
- **Rule:** Do not use legacy navigation patterns or hardcoded route strings without proper param typing.
- **Standard:** Use Expo Router file-based navigation (`app/(tabs)`, `_layout.tsx`, `battle.tsx`). Pass route parameters cleanly via `useLocalSearchParams` and perform transitions with `router.push` and `router.back`.

## 12. Operational Quality Gates
- **Rule:** Code updates must not introduce TypeScript errors or linting violations.
- **Standard:** Ensure all modifications pass type checking (`npx tsc --noEmit`) and Expo linting (`npm run lint`). Validate that the application builds and runs cleanly.

## 13. Comment & Documentation Integrity
- **Rule:** Never remove, strip, or truncate code comments, JSDoc annotations, or inline explanations during refactoring, formatting, or code edits.
- **Standard:** Code comments provide vital architectural context and developer intent. All code modifications must preserve existing comments intact unless the user explicitly requests their removal.
