---
title: EZ-Games — Senior Project Proposal
layout: default
---
# EZ-Games: A Growing Collection of Casual Games

**Senior Project 2026–2027 · Proposal Draft** ·

* * *

## 1. Project Description

**The idea in ten words or less:** _"A place for quick, fun games — all in one site."_

EZ-Games is a web game hub: one site that holds a growing collection of quick, fun games in a single, consistent launcher. It launches with a fully customizable Tic Tac Toe — a three-level bot opponent, selectable color schemes, and win stats that save in the browser — and is structured so more games can plug in over time.

**The problem it solves.** Games are for entertainment, and the problem with any single simple game is that it gets boring after a few rounds. EZ-Games fixes that with variety: instead of one game that runs out of steam, it is a place for games, so there is always something fresh to play. The variety is the replay value.

**Who it is for.**

| Who | Why they'd use it |
| --- | --- |
| Casual players / students | A quick game to fill a few minutes — one site for all |
| People who like customizing games | Personalizing the look makes it "theirs" |
| Anyone without a second player | Bot opponents make every game playable solo |

**Positioning.** Unlike the big web game portals — [Coolmath Games](https://www.coolmathgames.com/) [1], [Poki](https://poki.com/) [2], and [Miniclip](https://www.miniclip.com/) [3] — EZ-Games has no ads, no accounts, and one consistent visual style across every game. Unlike single-game options such as [Google's built-in Tic Tac Toe](https://www.google.com/fbx?fbx=tic_tac_toe) [4] and popular mobile apps like Optime Software's Tic Tac Toe [5], it is a hub that can grow.

## 2. Main Features

**Core:**

* A game launcher / hub — pick from the collection of games in one place
* **Tic Tac Toe (first game):**
  * Player vs. Bot and Player vs. Player (two players on one device)
  * Bot with three honest difficulty levels:
    * **Beginner** — forgiving, makes mostly random moves
    * **Pro** — blocks wins and plays a solid game
    * **Expert** — near-perfect play via the [minimax algorithm](https://en.wikipedia.org/wiki/Minimax) [6]; very rarely beatable
  * Multiple color schemes for the board and background, selectable in-game
  * Win streak counter and total wins tracked per difficulty, saved locally in the browser
* [React](https://react.dev/) component structure [7] that makes adding more games straightforward

**Stretch (if time allows):** a second game added to the site.

**Scope decisions.** A web application written in [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [8], built with [React](https://react.dev/) [7] and the [Vite](https://vitejs.dev/) build tool [9], using the browser's [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) [10] for stats and [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) [11] for theming. Preset color schemes only (no custom background images); browser-stored stats only (no accounts, no server).

## 3. Visual Overview

EZ-Games is entirely client-side, so its "parts" are logical pieces inside the browser rather than separate servers. The launcher is a hub of game components; each game separates its UI from its logic; and two browser features (CSS variables and localStorage) provide theming and persistence.

    flowchart TD
        Hub[Launcher / Hub] --> TTT[Tic Tac Toe Component]
        Hub --> More[Future Game Components]
        TTT --> Logic[Game Logic + Minimax Bot]
        TTT --> Theme[Theming - CSS Custom Properties]
        TTT --> Stats[Win Stats - localStorage]
        Logic --> Board[Board UI]
        Theme --> Board

Each box is one logical piece with a clear role: the **launcher** owns navigation, each **game component** owns its rules and UI, the **minimax bot** is pure game logic reused by the difficulty tiers, **CSS custom properties** drive theme switching, and **localStorage** persists stats with no server or account.

## 4. Similar Existing Solutions

The market splits into two groups, and nobody sits in the middle.

**The big portals.** [Coolmath Games](https://www.coolmathgames.com/) [1], [Poki](https://poki.com/) [2], and [Miniclip](https://www.miniclip.com/) [3] are large web game hubs with hundreds of games, and their popularity proves that people really do want a place to pick something and play. But they are ad-supported, nudge you into accounts to save progress, and — since every game comes from a different developer — nothing on the page looks like it belongs together.

**The single-game options.** Google's Tic Tac Toe [4] is free and instant in the browser, with three difficulty levels and a two-player local mode, but it is a single throwaway game with no customization and no persistent stats. Optime Software's Tic Tac Toe [5] is one of the best-selling mobile versions (10M+ downloads) and confirms that multi-level AI plus score tracking is what players expect — but it is Android-only, ad-supported, and there is only one game.

**How they compare.**

|     | Coolmath | Poki | Miniclip | Google TTT | Optime TTT | **EZ-Games** |
| --- | --- | --- | --- | --- | --- | --- |
| Platform | Web | Web | Web + mobile | In-browser | Android app | **Web** |
| Hub of many games | Yes | Yes | Yes | No  | No  | **Yes (grows)** |
| Ads | Yes | Yes | Yes | No  | Yes | **No** |
| Accounts | Progress-based | Membership | Accounts | No  | No  | **No** |
| Customization / themes | No  | No  | No  | No  | No  | **Yes** |
| Bot difficulty | Varies | Varies | Varies | 3 levels | 3 levels | **3 honest levels** |
| Persistent stats | Account-based | Account | Account | No  | Score | **Local, per level** |
| Consistent visual style | No  | No  | Mixed | N/A | N/A | **Yes** |
| No-install play | Yes | Yes | Yes | Yes | No  | **Yes** |

**The gap.** The portals have variety but are cluttered, ad-supported, and account-gated; the single games are clean but run out of steam once played a few times. What's missing is a hub that stays simple: several games, one consistent look, no ads or accounts, and stats that just save in the browser. That is the gap EZ-Games is aiming at.

## 5. How EZ-Games Is Different

* **Ad-free and account-free** — no ads, no in-app purchases, everything unlocked from the start
* **Honest difficulty** — its Expert bot plays a near-perfect minimax game and is very rarely beatable
* **Any device, no install** — runs in any browser; no download, no app store, nothing to set up
* **Local stats** — progress persists in the browser with no account required
* **Consistent visual style** — one shared look across every game, unlike mismatched third-party portals

## 6. Technologies

The stack is deliberately small: JavaScript, React, and Vite, plus two browser features and one algorithm. Nothing beyond this is needed to meet every requirement.

* **Language — JavaScript [8].** The only language that runs natively in the browser, so it keeps the "no install, any device" promise without any backend.
* **Framework — React [7].** The component model _is_ the hub: each game is a component that plugs into the launcher, so adding a game means adding a component rather than redesigning the app.
* **Build tool — Vite [9].** Provides instant hot-reload during development and a one-command build that produces static files ready to host.
* **Theming — CSS custom properties [11].** Each color scheme is a set of variable values; switching themes changes one root attribute and recolors the whole app.
* **Stats — Web Storage API (localStorage) [10].** Saves win data as JSON on the device — the no-accounts persistence story.
* **Expert bot — minimax algorithm [6].** A small recursive search over game states; the same function is deliberately weakened to create the Beginner and Pro tiers.

**Libraries decision.** No third-party libraries beyond React. The app's state is small enough for React's built-in state, the minimax bot is simple enough to hand-roll for a 3×3 board, and theming uses native CSS variables. Fewer dependencies means less to learn and less that can break on a fixed timeline — nothing in this project needs a library to avoid hand-rolling.

## 7. Alternatives Considered

Each major choice had an alternative that was weighed and rejected.

| Choice | Alternative | Why this one wins |
| --- | --- | --- |
| JavaScript [8] | [TypeScript](https://www.typescriptlang.org/) [12] | TypeScript adds types and catches bugs, but it is a second syntax layer to learn; plain JavaScript is enough for this scope |
| React [7] | [Vue.js](https://vuejs.org/) [13] | Both fit a component model, but React is the ecosystem I am more likely to build on and has the larger community and documentation |
| Vite [9] | [webpack](https://webpack.js.org/) / Create React App [14] | Vite is simpler to configure and noticeably faster to develop with than the older webpack-based tooling |

## 8. What I Need to Learn

Given my current background (comfortable with JavaScript, new to this workflow), the genuinely new material is:

* **The minimax algorithm** — writing the recursive search and turning it into three honest difficulty tiers.
* **Web Storage and JSON** — saving and reading local stats.
* **CSS custom properties** — building the theming system.
* **GitHub Pages deployment** — publishing the built site, including the base-path setting for subpath hosting.

Most of this is front-end work with abundant documentation, and the no-backend, no-database, no-account design keeps the total learning load moderate.

## References

[1] Coolmath Games, "Coolmath Games." Accessed: Sep. 7, 2026. [Online]. Available: https://www.coolmathgames.com/

[2] Poki, "Poki." Accessed: Sep. 7, 2026. [Online]. Available: https://poki.com/

[3] Miniclip, "Miniclip." Accessed: Sep. 7, 2026. [Online]. Available: https://www.miniclip.com/

[4] Google, "Tic Tac Toe." Accessed: Sep. 7, 2026. [Online]. Available: https://www.google.com/fbx?fbx=tic_tac_toe

[5] Optime Software, "Tic Tac Toe: Classic 3x3," Google Play. Accessed: Sep. 7, 2026. [Online]. Available: https://play.google.com/store/apps/details?id=com.optimesoftware.tictactoe.free

[6] "Minimax," Wikipedia, The Free Encyclopedia. Accessed: Sep. 7, 2026. [Online]. Available: https://en.wikipedia.org/wiki/Minimax

[7] Meta Platforms, Inc., "React." Accessed: Sep. 7, 2026. [Online]. Available: https://react.dev/

[8] MDN Web Docs, "JavaScript." Accessed: Sep. 7, 2026. [Online]. Available: https://developer.mozilla.org/en-US/docs/Web/JavaScript

[9] Vite, "Vite." Accessed: Sep. 7, 2026. [Online]. Available: https://vitejs.dev/

[10] MDN Web Docs, "Web Storage API." Accessed: Sep. 7, 2026. [Online]. Available: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API

[11] MDN Web Docs, "Using CSS custom properties." Accessed: Sep. 7, 2026. [Online]. Available: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties

[12] Microsoft, "TypeScript." Accessed: Sep. 7, 2026. [Online]. Available: https://www.typescriptlang.org/

[13] Vue.js, "Vue.js." Accessed: Sep. 7, 2026. [Online]. Available: https://vuejs.org/

[14] webpack, "webpack." Accessed: Sep. 7, 2026. [Online]. Available: https://webpack.js.org/