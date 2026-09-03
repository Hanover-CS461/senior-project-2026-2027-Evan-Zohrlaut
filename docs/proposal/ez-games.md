# EZ-Games — Senior Project Proposal

> Working name for a web game hub: a place for quick, fun games in one site, starting with a customizable Tic Tac Toe with a three-level bot opponent.

---

## 1. Utility — What problem does it solve?

Games don't solve a real-world problem — they're for **entertainment**. The problem with any single simple game is that it gets boring after a few rounds. EZ-Games fixes that by being **a place for games**: instead of one game that runs out of steam, it's a single site that holds a growing collection, so there's always something fresh to play. The variety is the replay value.

## 2. Users — Who would use it and why?

| Who                               | Why they'd use it                                    |
| --------------------------------- | ---------------------------------------------------- |
| Casual players / students         | A quick game to fill a few minutes, one site for all |
| People who like customizing games | Personalizing the look makes it "theirs"             |
| Anyone without a second player    | Bot opponents make every game playable solo          |

## 3. The idea in 10 words or less

> **"A place for quick, fun games — all in one site."**

## 4. Similar products

- **Coolmath Games / Poki / Miniclip** — big web game sites with huge libraries, but they're ad-supported, account-gated, and cluttered.
- **Google's built-in Tic Tac Toe** (search "tic tac toe" in Google) — free and instant, but it's a single throwaway game with no customization and no real bot difficulty.
- **Mobile game apps** (app stores) — mostly simple, ad-heavy, and light on theming.

## 5. How it's different

EZ-Games is a small, focused **place for games** instead of a sprawling game portal. No ads, no accounts, no paywalls — every game and every option is unlocked from the start. It launches with Tic Tac Toe done right (three genuinely different bot levels and full theming) and grows from there, with a consistent launcher, look, and local stats across every game.

- **Ad-free and account-free:** no ads, no in-app purchases, everything unlocked.
- **Honest difficulty:** its Tic Tac Toe Expert plays a near-perfect minimax game and is very rarely beatable.
- **Any device, no install:** runs in any browser — no download, no app store, nothing to set up.
- **Local stats:** progress persists in the browser with no account required.

## 6. Features

**Core:**

- A game launcher / hub — pick from the collection of games in one place
- **Tic Tac Toe (first game):**
  - Player vs. Bot and Player vs. Player (two players on one device)
  - Bot with three difficulty levels:
    - **Beginner** — forgiving, makes mostly random moves
    - **Pro** — blocks wins and plays a solid game
    - **Expert** — near-perfect play (minimax); very rarely beatable
  - Multiple color schemes for the board and background, selectable in-game
  - Win streak counter
  - Total number of wins tracked per difficulty
- React component structure that makes adding more games straightforward

**Stretch (if time allows):**

- A second game added to the site.

## 7. Scope decisions

- **Web application** — React with Vite (HTML, CSS, and JavaScript); runs in any modern browser with no install
- **One game to start (Tic Tac Toe), built inside a hub structure** that new games plug into
- **Preset color schemes only** — no custom/uploaded background images
- **Browser-stored stats** — no accounts; data stays in the player's browser

## 8. Future direction

EZ-Games is built as a hub: more games get added over time, all sharing the same launcher, visual style, and local stats. Tic Tac Toe is the first game, and the goal is a small, curated collection that keeps growing.