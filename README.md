# Geezo Music Streaming App (High Fidelity Audio & Radio)

> 👨‍💻 Developed by **[Suresh Kumar Meesala](https://github.com/SureshKumarMeesala)** · 🎨 UI design by **Orange** (credits below)

A mobile application built for **Geezo Music** — with screens for music streaming, curated playlists, artist profiles, music videos, equalizer presets, and live radio (UI demo with sample data).

Based on the 52 Sketch artboards in `Geezo Music Streaming App/design`.

## Tech Stack & Architecture
- **Framework**: React Native 0.88+, Expo SDK 58+
- **Navigation**: Expo Router (File-based navigation with `src/app/`)
- **Language**: Pure JavaScript & JSX (`.js`, `.jsx` only — 0% TypeScript)
- **Styling**: StyleSheet with semantic design tokens (Electric Lime `#CBFB5E`, Midnight `#0E0B1F`, Card `#20232E`, Vivid Pink `#FF2E63`)
- **Theme**: Dark (Default) & Light mode support via context (`src/theme.js`)
- **Icons**: `@expo/vector-icons` (Ionicons)

## Screens & Artboards Covered
1. **Onboarding / Walkthrough (`src/app/index.jsx`)**:
   - Artboard "Throughwalk 1, 2, 3": "WELCOME TO GEEZ APP" - "Make your design workflow easier and save your time", high-res artwork, interactive slide indicators.
2. **Authentication**:
   - `src/app/login.jsx`: Artboard "Sign in" (Email & password inputs, social connect with Google, Apple, Facebook)
   - `src/app/signup.jsx`: Artboard "Sign up" (Account creation with validation)
   - `src/app/forgot-password.jsx`: Artboards "Forgot password 1.1 & 2" (Reset password link dispatch & update)
3. **Core Tabs Navigation (`src/app/(tabs)/`)**:
   - `index.jsx`: Home 1 & Home 2 (New Albums carousel, Geez Weekly featured playlist banner, Recently Music tracklist, floating MiniPlayer)
   - `explore.jsx`: Explore & Topic (Genre pills Hip-Hop, Pop, R&B, Geez Chart banner, Topics grid: Rap Soul, Beats & Rhymes, Top Trending)
   - `search.jsx`: Search/Default & Search/active (Filter tabs All/Song/Album/Artist/MV, Top searching tags: Fall out boy, Good girl, Girl generation)
   - `radio.jsx`: Radio & Radio 0 (Boney Radio GeezFM 98Hz live broadcast, live peep show, listeners count, tune-in trigger)
   - `library.jsx`: My Collection (My Playlist, Song, Artist, Album tabs, Add New Playlist modal)
4. **Full Now Playing Screen (`src/app/player.jsx`)**:
   - Artboards "Song 01, 02, 03", "Song / Share", "Song / Download 01 & 02":
   - Vinyl record rotating disc with spindle
   - Progress bar with interactive scrubber (2:46 / 3:05)
   - Player controls: Shuffle, Previous, Play/Pause, Next, Repeat
   - Multi-mode tabs: Track View, Full Synchronized Lyrics, Equalizer Presets
   - Share sheet to Facebook, Instagram, Copy Link
   - Quality Download selector (128 Kbps Free vs 320 Kbps HD Master)
5. **Playlist & Album Detail (`src/app/playlist/[id].jsx`)**:
   - Artboards "Explore Details" & "ALBUM": Full playlist header art, play all, shuffle, numbered tracklist.
6. **Artist Profile (`src/app/artist/[id].jsx`)**:
   - Artboard "Singer": Verified badge, monthly listener stats, follow toggle, popular tracks.
7. **Music Video Detail (`src/app/mv/[id].jsx`)**:
   - Artboards "MV" & "MV / Detail": Video viewport, play overlay, views counter, Up Next video suggestions.
8. **Settings & Equalizer (`src/app/settings.jsx`)**:
   - Artboards "Setting" & "Setting ": Profile summary (John Huston, Muffiluma@gmail.com), Equalizer preset selector (SKA, SOFT, SOFTROCK, TECHNO, VOCAL, BASS BOOST), dark mode toggle, sign out.

## Verification
- Babel AST parse: **100% passed (27 files, 0 errors)**
- TypeScript: **0 files (Pure JavaScript & JSX)**

<!-- run-locally:start -->

## ▶️ Run locally

```bash
npm install
npx expo start
```

Then press `i` for the iOS simulator, `a` for Android, or `w` for the web, or scan the QR code with Expo Go.

<!-- run-locally:end -->

<!-- developer:start -->

## 👨‍💻 Developer

This React Native app was developed by **Suresh Kumar Meesala**.

| | |
|---|---|
| Developer | [Suresh Kumar Meesala](https://github.com/SureshKumarMeesala) |
| GitHub | [@SureshKumarMeesala](https://github.com/SureshKumarMeesala) |
| Organization | [FreeAppSource](https://github.com/FreeAppSource) |
| Repository | <https://github.com/FreeAppSource/geezo-music-streaming-app> |

<!-- developer:end -->

---

<!-- design-credits:start -->

## 🎨 Design Credits

This app is based on the free **Music Streaming App UI Kit** design by **Orange**, downloaded from Sketch App Sources. All visual design credit goes to the designer. It follows the design's screens, user flows and content; visual details (exact spacing, fonts, some colours and illustrations) are approximated and may differ from the original.

| | |
|---|---|
| Designer | [Orange](https://www.sketchappsources.com/contributor/orange) |
| Original design | Music Streaming App UI Kit |
| Downloaded from | [Sketch App Sources](https://www.sketchappsources.com/free-source/4800-geezo-music-streaming-app-ui-kit-sketch-freebie-resource.html) |
| Original file | `geezo-music-streaming-app-ui-kit.sketch` |
| License / usage | Not stated on the source page. Free download; credit the designer (Sketch App Sources Terms) and confirm with them before commercial use. |

**Attribution:**

> UI design: "Music Streaming App UI Kit" by Orange (https://www.sketchappsources.com/contributor/orange), downloaded from Sketch App Sources (https://www.sketchappsources.com/free-source/4800-geezo-music-streaming-app-ui-kit-sketch-freebie-resource.html).

The original design source files are not included in this repository; get them from the links above. This app's **code** is released under the [MIT License](./LICENSE); the visual design remains the designer's (see [NOTICE](./NOTICE)).

Photos, brand logos and avatars inside the design may belong to third parties and are not covered by the designer's permission.

<!-- design-credits:end -->
