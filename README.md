# EZ-Games

> A place for quick, fun games — all in one site.

EZ-Games is a browser-based game hub: one launcher, one consistent look, and a
small collection of quick games. There are no ads and no accounts, and game
stats are saved locally in the browser.

- **Play:** <https://hanover-cs461.github.io/senior-project-2026-2027-Evan-Zohrlaut/app/>
- **Docs:** <https://hanover-cs461.github.io/senior-project-2026-2027-Evan-Zohrlaut/>

## Games

| Game | Modes | Notes |
| --- | --- | --- |
| Tic Tac Toe | Two players, or vs. bot (Beginner / Pro / Expert) | Expert plays a near-perfect minimax game |
| Connect 4 | Two players, or vs. bot (Beginner / Pro / Expert) | Column previews, drop animation |

Both games keep a scoreboard per mode (friend, bot-beginner, bot-pro,
bot-expert), persisted between visits.

## Features

- A launcher / hub that lists the games and routes between them
- Two playable games, each with a local two-player mode and three bot
  difficulties
- Six preset color themes, selectable from the header and remembered
- Per-mode scoreboards stored in `localStorage`
- Hash-based routing, so games are linkable (`#/tic-tac-toe`, `#/connect-4`)
- Automated tests for game logic, bots, score handling, and components

## Tech stack

| Concern | Choice |
| --- | --- |
| Language | JavaScript (JSX) |
| UI | React 19 |
| Build tool | Vite 6 |
| Tests | Vitest + Testing Library (jsdom) |
| Theming | CSS custom properties |
| Persistence | Web Storage API (`localStorage`) |

There are no third-party runtime libraries beyond React. State is small enough
for React's built-in hooks, the bots are hand-written, and theming uses native
CSS variables.

## How it's built

### Architecture

The app is entirely client-side. `src/App.jsx` is the launcher: it reads the
route from `window.location.hash`, renders the matching game component, and
otherwise renders a grid of game slots. Games are registered in a single map
(`GAME_COMPONENTS`), so adding a game means adding a component and an entry,
not rewiring the app.

```
src/
  main.jsx                 entry point, mounts <App />
  App.jsx                  launcher, hash routing, theme state
  themes.js                theme definitions, apply/load/save
  index.css, App.css       global and launcher styles
  components/              Header, ThemeMenu, GameSlot, GameIcon (+ CSS)
  games/
    tic-tac-toe/
      TicTacToe.jsx        game UI and state
      logic.js             pure board rules (create, win/draw detection)
      bot.js               move selection per difficulty
      scores.js            scoreboard shape, load/save, normalization
      *.test.*             logic, bot, scores, component tests
    connect-4/
      Connect4.jsx         game UI and state
      logic.js             pure board rules (drop, win detection)
      bot.js               move selection per difficulty
      scores.js            scoreboard shape, load/save, normalization
      *.test.*             logic, bot, scores, component tests
  test/setup.js            Testing Library setup for Vitest
```

Each game separates pure rules (`logic.js`) from AI (`bot.js`) from persistence
(`scores.js`) from presentation (`*.jsx`). That split is what makes the tests
fast and the game components readable.

### The bots

`chooseMove(board, symbol, difficulty, random = Math.random)` is the entry
point in each game's `bot.js`.

- **Tic Tac Toe:** Expert runs a full minimax search. Pro and Beginner use a
  heuristic (take a win, block a loss) with a configurable blunder chance —
  20% for Pro, 75% for Beginner — falling back to a random move. The `random`
  parameter is injectable so the tests are deterministic.
- **Connect 4:** its own bot module with the same three difficulty tiers.

### Data model

All state is per-browser. There is no server and no account.

| Key | Contents |
| --- | --- |
| `ez-games-tic-tac-toe-scores` | `{ friend, bot-beginner, bot-pro, bot-expert }`, each `{ X, O, draws }` |
| `ez-games-connect-4-scores` | `{ friend, bot-beginner, bot-pro, bot-expert }`, each `{ red, yellow, draws }` |
| `ez-games-theme` | The selected theme id (`blue`, `red`, `green`, `purple`, `orange`, `pink`) |

Stored JSON is treated as untrusted: `normalizeScores` on read coerces values to
non-negative integers and fills in missing modes, so a corrupted or older entry
cannot crash the app. Tic Tac Toe also migrates the pre-mode single-scoreboard
format into the `friend` slot.

## Getting started

Requires Node.js and npm. CI uses Node 24; a current LTS release should also
work.

```bash
npm ci          # install dependencies
npm run dev     # start the dev server
npm test        # run the test suite once
npm run test:watch
npm run build   # production build into dist/
npm run preview # serve the production build locally
```

Note: `vite.config.js` sets `base` to the GitHub Pages subpath
(`/senior-project-2026-2027-Evan-Zohrlaut/app/`). That is correct for the
deployed site, so `npm run preview` serves the build under that path rather
than at the server root.

## CI and deployment

`.github/workflows/deploy.yml` runs on every push and pull request:

1. **test** — checks out the repo, installs with `npm ci`, and runs `npm test`.
2. **build-and-deploy** — runs only for `main` or a manual dispatch. It builds
   the React app, builds the Jekyll docs site, renders the Marp slide deck,
   merges the app into the docs output under `/app`, and deploys the combined
   site to GitHub Pages.

So the deployed site is one Pages artifact containing the docs homepage, the
proposal, the slides, and the playable app.

## Project docs

The `docs/` folder is a Jekyll site:

- [Proposal](docs/proposal/proposal.md)
- [Annotated bibliography](docs/proposal/bibliography.md)
- [Presentation slides](docs/proposal/slides/)
- [Tutorial: building the game launcher](docs/tutorial/)

## Design decisions

- **Hash routing instead of a router library.** The app has two routes; a
  dependency and a routing abstraction would cost more than the few lines of
  `hashchange` handling they replace.
- **`localStorage` instead of a backend.** The no-accounts, no-server promise
  is a feature, not a limitation, and per-browser stats are enough for a casual
  game hub.
- **A component registry instead of conditionals.** `GAME_COMPONENTS` in
  `App.jsx` keeps the launcher from growing a branch per game.
- **Per-mode scoreboards replaced the proposed win-streak counter.** Tracking
  wins, losses, and draws per difficulty is more informative than a streak, and
  it reuses the per-mode data the scoreboard already needed.
