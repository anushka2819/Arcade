# Lumina Zen Arcade (lumina-zen-arcade)

> **Agent Context Summary**: Lumina Zen Arcade is a multi-game mindfulness, emotional wellness, and psychoeducational web platform built with **React 18**, **Vite 5**, **Tailwind CSS**, and **Supabase Auth**. It features a central Hub with a warm aesthetic that embeds 7 distinct interactive games via an iframe-based multi-page architecture.

---

## 1. Quick Technical Overview

| Property | Value |
|---|---|
| **Framework & Build** | React 18 (`react`, `react-dom`), Vite 5 (`vite`), Rollup Multi-page Bundle |
| **Styling** | Tailwind CSS v3/v4 (`tailwindcss`, `@tailwindcss/postcss`, `postcss`), CSS Variables |
| **Authentication** | Supabase JS v2 (`@supabase/supabase-js`) with PKCE flow, Session Persistence, & Guest fallback |
| **Audio Engine** | Custom Web Audio API synthesizer + ambient music (`src/SoundEffects.js`) |
| **Animation & 3D** | `framer-motion`, `canvas-confetti`, `three`, `@react-three/fiber`, `@react-three/drei` |
| **Icons** | Lucide Icons (`lucide-react`) |
| **Port & Dev Server** | `http://localhost:5173` (Vite) |

---

## 2. System Architecture

```text
                               +-----------------------------+
                               |     Lumina Zen Arcade       |
                               |        (src/App.jsx)        |
                               +--------------+--------------+
                                              |
                   +--------------------------+--------------------------+
                   |                                                     |
       +-----------v-----------+                             +-----------v-----------+
       |     Auth State        |                             |     Arcade Hub        |
       |  (Screen1_Login.jsx)  |                             | (Screen2_ArcadeCollection)
       | Supabase / Guest Mode |                             +-----------+-----------+
       +-----------------------+                                         |
                                                                         | Select Game (ID)
                                                             +-----------v-----------+
                                                             |  EmbeddedGame.jsx     |
                                                             | (Full-screen <iframe>)|
                                                             +-----------+-----------+
                                                                         |
         +-------------------+-------------------+-----------------------+-------------------+-------------------+
         |                   |                   |                       |                   |                   |
+--------v-------+  +--------v-------+  +--------v-------+      +--------v-------+  +--------v-------+  +--------v-------+  +--------v-------+
|Words of Wisdom |  | Stick Man      |  |Little Big      |      |Mindscape       |  |Feeling Fusion  |  |Myth vs Fact    |  |Signal Scout    |
| (Mindful Words)|  | to the Rescue  |  | Feelings (Blob)|      |Defense (3D)    |  |(Emotion Wheel) |  | (Card Quiz)    |  |(Distress Aware)|
+----------------+  +----------------+  +----------------+      +----------------+  +----------------+  +----------------+  +----------------+
```

### Architecture Key Points
1. **Main Hub vs. Embedded Games**: The root React app (`src/App.jsx`) manages authentication, dark/light themes, global sounds, and view state. When a game is selected, `src/components/EmbeddedGame.jsx` loads the specific game's HTML entrypoint inside a responsive, full-screen iframe.
2. **Vite Multi-Page Build**: `vite.config.js` defines Rollup inputs for `index.html` plus each game's `index.html`. This ensures every game can run standalone in dev or be cleanly built into `dist/`.
3. **Asset Isolation**: Shared static assets reside in `/public/assets` and `/public/stickman_assets`. Game-specific assets are transformed via a custom Vite plugin (`normalizeLittleBigFeelingsAssets`).

---

## 3. Directory Structure

```text
Arcade/
├── .env / .env.example             # Supabase URL & Anon Key config
├── index.html                      # Root HTML entry point for the Arcade Hub
├── package.json                    # Dependencies & build scripts
├── postcss.config.js               # PostCSS plugins config
├── tailwind.config.js              # Theme colors, fonts, shadows, keyframes
├── vite.config.js                  # Multi-page build inputs & asset transform plugin
├── public/                         # Static assets (SVGs, BG music, images)
│   ├── assets/                     # Emotion blobs, feeling fusion cards, trigger icons
│   ├── images/onboarding/          # Onboarding slide graphics
│   └── stickman_assets/            # Stickman avatars, icons, scenarios
└── src/
    ├── App.jsx                     # Root router: Login -> Arcade -> Embedded Games
    ├── main.jsx                    # React 18 DOM mount point
    ├── index.css                   # Global Tailwind utilities & custom styles
    ├── SoundEffects.js             # Web Audio API sound synthesis & ambient audio
    ├── lib/
    │   └── supabase.js             # Supabase Client configuration
    ├── components/
    │   ├── Navbar.jsx              # Header with sound toggle, theme switch, profile, exit
    │   ├── Screen1_Login.jsx       # Login, Registration, and Guest Access screen
    │   ├── Screen2_ArcadeCollection.jsx # Arcade catalog grid & search bar
    │   ├── EmbeddedGame.jsx        # Iframe container mapping game IDs to game paths
    │   ├── MiniGameModal.jsx       # Quick mini-game modal previewer
    │   └── Screen3_WordsOfWisdom.jsx # Standalone screen wrappers
    └── games/                      # The 7 Standalone Game Modules
        ├── Feeling-Fusion/         # Vanilla JS emotion mixing game
        ├── Little-Big-Feelings/    # Vanilla JS emotion blob interactive story
        ├── mindscape-defence/      # React Three Fiber / Three.js 3D strategy game
        ├── Myth-vs-Fact/           # React card swipe & knowledge sorting quiz
        ├── Signal-Scout/           # React empathy & distress signal detection game
        ├── stickman/               # React physics, dialogue tree & scenario game
        └── Words-of-Wisdom/        # React word scramble & positive affirmation builder
```

---

## 4. The 7 Games & Their Entry Points

| Game ID | Name | Category | Tech Stack | Entry Point File | Description |
|---|---|---|---|---|---|
| `words_of_wisdom` | **Words of Wisdom** | Mindful Puzzles | React, Tailwind, Canvas Confetti | `src/games/Words-of-Wisdom/index.html` | Affirmation word scramble and mindful terminology puzzles with soothing audio. |
| `stick_man` | **Stick Man to the Rescue** | Physics & Play | React, Tailwind, Physics Canvas | `src/games/stickman/index.html` | 6 interactive emotional crisis dialogue scenarios guiding friends through struggles. |
| `little_big_feelings` | **Little Big Feelings** | Mood & Feelings | Vanilla JS, Canvas, CSS | `src/games/Little-Big-Feelings/index.html` | Interactive emotion blobs, triggers, Coping A-Z encyclopedia, and Mood Mixer. |
| `mindscape_defense` | **Mindscape Defense** | Relaxed Strategy | React Three Fiber, Three.js, Canvas | `src/games/mindscape-defence/index.html` | Mindful 3D strategy defending inner calm against intrusive thoughts. |
| `feeling_fusion` | **Feeling Fusion** | Mood & Feelings | Vanilla JS, Canvas | `src/games/Feeling-Fusion/index.html` | Plutchik-inspired emotion synthesis blending primary emotions into complex feelings. |
| `myth_vs_fact` | **Myth vs Fact** | Mindful Puzzles | React, Tailwind, Lucide | `src/games/Myth-vs-Fact/index.html` | Fast-paced mental health myth vs fact card categorization with educational takeaways. |
| `signal_scout` | **Signal Scout** | Pathway Flow | React, Tailwind, Lucide | `src/games/Signal-Scout/index.html` | Identify subtle verbal and non-verbal distress signals in peers to provide timely support. |

---

## 5. Authentication Flow (`src/lib/supabase.js`)

- **Supabase Client**: Configured in `src/lib/supabase.js` using `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- **Flow**:
  - `handleLogin`: Calls `supabase.auth.signInWithPassword({ email, password })`.
  - `handleRegister`: Calls `supabase.auth.signUp({ email, password, options: { data: { display_name: name } } })`.
  - `handleGuestAccess`: Bypasses Supabase to set guest state (`{ name: 'Cozy Guest', email: 'guest@luminazen.app', avatar: '✨' }`).
  - `handleLogout`: Calls `supabase.auth.signOut()` and resets view to `'login'`.
- **Session Auto-Refresh**: Uses `supabase.auth.onAuthStateChange` to listen to auth updates automatically across page life-cycles.

---

## 6. Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

*(Refer to `.env.example` for the template).*

---

## 7. Developer Commands

```bash
# 1. Install dependencies
npm install

# 2. Run local development server (Vite on http://localhost:5173)
npm run dev

# 3. Build for production (bundles all multi-page game inputs)
npm run build

# 4. Preview production build
npm run preview
```

---

## 8. How to Add a New Game (Agent Cheatsheet)

When adding an 8th game to the arcade, follow this exact 5-step checklist:

1. **Create Game Directory**: Add `src/games/<game-folder-name>/index.html` and its React/JS root component.
2. **Register in `vite.config.js`**: Add input to `build.rollupOptions.input`:
   ```javascript
   newGame: resolve(__dirname, 'src/games/<game-folder-name>/index.html'),
   ```
3. **Register Path in `src/components/EmbeddedGame.jsx`**:
   ```javascript
   const GAME_PATHS = {
     // ...,
     new_game_id: '/src/games/<game-folder-name>/index.html',
   };
   ```
4. **Add Game Card to Catalog in `src/components/Screen2_ArcadeCollection.jsx`**:
   Add `{ id: 'new_game_id', title: '...', category: '...', description: '...', ... }` to the `games` array.
5. **Add View Route in `src/App.jsx`**:
   ```jsx
   ) : currentView === 'new_game_id' ? (
     <EmbeddedGame gameId="new_game_id" title="Game Title" onBackToArcade={handleGoToArcade} />
   ) : (
   ```
   *(Also update `Navbar.jsx`'s `getPageTitle()` mapping).*

---

## 9. Design System & Theming Tokens

- **Plum / Neutral**: `#4A353B` (`zen-plum`), `#3B282D` (`zen-plumHover`), `#8C727A` (`zen-mauve`)
- **Pink Accents**: `#FDF2F4` (`zen-pinkLight`), `#FCEBEF` (`zen-pinkCard`), `#F7C5D1` (`zen-pinkAccent`), `#E8A2B3` (`zen-pinkHeader`)
- **Secondary Tones**: `#EADF9E` (`zen-yellow`), `#7A8450` (`zen-olive`), `#4A7C7D` (`zen-teal`)
- **Fonts**: `Outfit` (Headings/Display), system UI / sans-serif (Body)
