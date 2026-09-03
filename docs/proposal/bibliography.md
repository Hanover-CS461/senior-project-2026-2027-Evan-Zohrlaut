# Annotated Bibliography — EZ-Games

**Project:** EZ-Games — a web game hub (a place for quick, fun games in one site), starting with a customizable Tic Tac Toe featuring a three-level bot, in-game color schemes, and browser-stored win stats.

**Scope note:** EZ-Games is built with React (using the Vite build tool) on top of HTML, CSS, and JavaScript. React is what gives the hub its structure — each game is a component that slots into a shared launcher. The browser's Web Storage API and CSS Custom Properties handle saving stats and switching themes, and the minimax algorithm powers the Expert bot. Since the app is all client-side — no accounts, no online play — the only protocol in the picture is HTTP.

---

## Competing products

### 1. Coolmath Games

- **Link:** https://www.coolmathgames.com/
- **Type of source:** Primary — it's the product's own site, run by Coolmath Games LLC. It's not a review or write-up of the site; the site *is* the product.
- **Relation to EZ-Games:** Existing competitor — a big web game portal, and the closest existing version of "a place for games."

Coolmath Games has been around for a long time and hosts hundreds of playable browser games. It started as a math and logic site but has grown into a general collection of arcade and puzzle games. Everything plays right in the browser with no install, and the site sorts games into categories, featured sections, and popularity rankings.

This is about as close as anything gets to what EZ-Games wants to be, and it proves the basic idea works: a site where people pick from lots of games in one place. It also shows what I don't want to copy. The site runs ads, nudges you to make an account to save progress, and every game is embedded from a different developer, so each one looks and feels completely different — nothing on the page belongs together. EZ-Games does the opposite on purpose: no ads, no accounts, one consistent look, and stats saved in the browser instead of on a server.

### 2. Poki

- **Link:** https://poki.com/
- **Type of source:** Primary — Poki's own platform and website.
- **Relation to EZ-Games:** Existing competitor — another large web game portal built on the same "hub" idea.

Poki is one of the most popular browser-game sites on the web. It has a big, carefully organized library — categories, trending lists, and search — and everything plays instantly in the browser. It's paid for with ads plus an optional ad-free membership.

Poki is proof that a game hub can pull a huge audience, which is good news for the whole idea behind EZ-Games. Its best feature is discovery: it's really easy to find something new to play, and that's something I'm borrowing in miniature with a simple game menu. The downsides are the same as Coolmath's — ads, membership tiers, and games that all come from different developers so nothing looks connected. The whole point of my scope decisions is to be small, curated, and consistent where they're big, cluttered, and all over the place.

### 3. Miniclip

- **Link:** https://www.miniclip.com/
- **Type of source:** Primary — Miniclip's own website and platform.
- **Relation to EZ-Games:** Existing competitor — one of the oldest web game portals, now a full game company across platforms.

Miniclip started as a browser game portal back in 1999 and grew into a real game publisher with big franchises like 8 Ball Pool, spanning both web and mobile. These days the site has accounts, friends, leaderboards, and progress that syncs across devices — a full online game platform built on top of what was originally just a collection of games.

Miniclip is the cautionary example for me. It shows the natural path a game hub takes: what starts as a simple collection tends to turn into a platform with accounts, social features, and server-side data. That's exactly what I'm rejecting in my scope decisions — no accounts, no leaderboards, no cloud sync, just local browser storage. Seeing that path laid out makes it easier to explain why EZ-Games stays small. It also shows the hub idea has real staying power, since Miniclip has been doing this for over twenty years.

### 4. Google Tic Tac Toe

- **Link:** https://www.google.com/fbx?fbx=tic_tac_toe
- **Type of source:** Primary — it's Google's own playable game, embedded right in Google Search results.
- **Relation to EZ-Games:** Existing competitor — a free, instant single Tic Tac Toe game, and the most direct comparison to my flagship game.

Type "tic tac toe" into Google and a playable game shows up right in the search results: a clean 3x3 board against an AI with three difficulty settings, or a two-player local mode. It runs entirely in the browser, no install.

This is the most direct competition for the first game EZ-Games ships, and its three difficulty levels line up pretty much exactly with my Beginner/Pro/Expert plan. But it's a single throwaway game — no customization, no themes, no persistent stats, and no way to grow into a collection. EZ-Games keeps the instant-play convenience and adds everything Google's version is missing: color schemes you can pick, difficulty that's honestly labeled (an Expert that's genuinely hard to beat), win-streak tracking, and a hub that can hold more games later.

### 5. Tic Tac Toe (Optime Software)

- **Link:** https://play.google.com/store/apps/details?id=com.optimesoftware.tictactoe.free
- **Type of source:** Primary — the developer's own app listing, published by Optime Software and hosted on Google Play's storefront.
- **Relation to EZ-Games:** Existing competitor — a popular mobile Tic Tac Toe with almost the same feature plan as EZ-Games (multi-level AI plus score tracking).

Optime Software's Tic Tac Toe is one of the best-selling mobile versions of the game, with over 10 million downloads. It has one- and two-player modes, an AI with three difficulty levels and randomized moves, custom player names, score tracking, and an undo button — all supported by banner ads.

This app matters because it confirms my feature set is what people actually expect: multi-level AI and score tracking are the standard for a Tic Tac Toe app. But the reviews also show exactly the problem EZ-Games is built to avoid — players keep complaining about pop-up ads and prompts to install other apps ruining the experience. The app is also stuck on Android, while a web app runs on anything with a browser. Put together, it's the strongest argument for my "ad-free, account-free, any device" positioning.

### How the competitors stack up

|                         | Coolmath             | Poki             | Miniclip          | Google TTT          | Optime TTT     | **EZ-Games**              |
| ----------------------- | -------------------- | ---------------- | ----------------- | ------------------- | -------------- | ------------------------- |
| Platform                | Web                  | Web              | Web + mobile      | In-browser (search) | Android app    | **Web**                   |
| Hub of many games       | Yes                  | Yes              | Yes               | No (single)         | No (single)    | **Yes (grows)**           |
| Ads                     | Yes                  | Yes              | Yes               | No                  | Yes (pop-ups)  | **No**                    |
| Accounts                | Progress via account | Membership tiers | Accounts, friends | No                  | No             | **No**                    |
| Customization / themes  | No                   | No               | No                | No                  | No             | **Yes**                   |
| Bot difficulty          | Weak, varies by game | Varies           | Varies            | 3 levels            | 3 levels       | **3 honest levels**       |
| Persistent stats        | Account-based        | Account-based    | Account-based     | No                  | Score tracking | **Local, per difficulty** |
| Consistent visual style | No (3rd-party games) | No               | Mixed             | N/A                 | N/A            | **Yes (shared UI)**       |
| No-install play         | Yes                  | Yes              | Yes               | Yes                 | No             | **Yes**                   |

Looking at these five competitors, the market basically splits into two groups, and nobody sits in the middle. The big portals — Coolmath, Poki, Miniclip — are all about having tons of games, and the fact that they're so popular shows that people really do want a place where they can just pick something and play. But they're covered in ads, push you to make an account, and since every game is made by a different developer, nothing on the site looks like it belongs together. The single-game options — Google's Tic Tac Toe and the Optime app — are the opposite: they show that people want difficulty levels and score tracking, but there's only one game, so once you've played it a few times there's nothing new. What's missing is a hub that keeps things simple: several games, one consistent look, no ads or accounts, and stats that just save in your browser. That's the gap EZ-Games is aiming at.

---

## Languages

### 6. HTML

- **Link:** https://developer.mozilla.org/en-US/docs/Web/HTML
- **Type of source:** Primary documentation — MDN Web Docs is the standard reference for web developers, maintained by Mozilla and the web community. It documents a language standardized by the WHATWG/W3C.
- **Relation to EZ-Games:** Resource for my solution — HTML is the structure layer of the app.

HTML is the markup language that defines the structure of web pages: headings, buttons, containers, grids. MDN's reference documents every element with usage examples and browser support notes.

For EZ-Games, HTML is how the hub and each game screen get laid out — the launcher menu, the board grid, the stats display. In a React app most of this markup is actually written as JSX inside components, but it compiles down to the same HTML the browser renders, so I still need to know the underlying language. MDN is where I go to check how an element actually behaves and what's supported where.

### 7. CSS

- **Link:** https://developer.mozilla.org/en-US/docs/Web/CSS
- **Type of source:** Primary documentation — MDN Web Docs.
- **Relation to EZ-Games:** Resource for my solution — CSS is the styling layer, and it's central to the color-scheme theming feature.

CSS controls how HTML looks — colors, layout, fonts, spacing, animation. MDN's reference covers every property, selector, and layout system with interactive examples.

Theming is a core EZ-Games feature (multiple color schemes for the board and background, selectable in-game), and CSS is what makes it cheap and reliable. Each scheme is a small set of named color values that get swapped at runtime, so switching themes re-styles the whole hub instantly (see the CSS Custom Properties entry below). CSS also delivers the "consistent visual style across every game" promise: one shared stylesheet gives everything a unified identity — which is exactly what the competitor portals don't have with their mismatched third-party games.

### 8. JavaScript

- **Link:** https://developer.mozilla.org/en-US/docs/Web/JavaScript
- **Type of source:** Primary documentation — MDN Web Docs; JavaScript itself is standardized by ECMA International.
- **Relation to EZ-Games:** Resource for my solution — JavaScript implements all game logic, the bot opponent, theme switching, and stats persistence.

JavaScript is the programming language of the web, executed natively by browsers. MDN's reference covers the language itself and its standard built-in objects, with guides and examples.

Every bit of EZ-Games' behavior lives in JavaScript: game rules, win detection, the minimax bot, theme switching, saving stats. In a React app this logic sits inside components and hooks, but the core game rules — especially the bot — can be written as pure functions separate from the UI. That keeps them readable and testable on their own, which pays off when I add more games to the hub. The Expert bot's minimax search is just a small recursive function over game states, well within JavaScript's abilities, and the same function can be deliberately dumbed down to create the Beginner and Pro tiers.

---

## Frameworks and tooling

> EZ-Games is built with React, which is what gives the hub its plug-in structure — each game is a component, and adding a game means adding a component to the launcher. Vite is the build tool that compiles and serves the app. The entries after that are the browser capabilities and the algorithm that do the supporting work.

### 9. React

- **Link:** https://react.dev/
- **Type of source:** Primary — the official documentation and site of the React team at Meta, the framework's creators. It's the framework's own reference, not a third party writing about it.
- **Relation to EZ-Games:** Resource for my solution — the framework the entire app is built on; it implements the hub structure and the shared launcher, look, and stats.

React is a JavaScript library for building user interfaces out of components. Each component is a function that returns markup (JSX) based on its current state and props, and React automatically re-renders the parts of the page that change when that state updates. It's maintained by Meta with a large open-source community, and it's one of the most widely used frontend libraries in the world.

React is basically the architecture behind EZ-Games' whole pitch. The launcher and each game become components: a game mounts when you pick it and unmounts when you go back to the menu, which makes "adding more games straightforward" an actual mechanical property — write a new component, register it in the menu, done. The declarative model also fits a turn-based game nicely: the board is just a rendering of the current game state, so win detection and theme switching only have to change state instead of editing the DOM by hand. The cost is the extra build tooling (see Vite), but for a hub that's meant to keep growing, the component structure pays for itself.

### 10. Vite

- **Link:** https://vitejs.dev/
- **Type of source:** Primary — the official site of the Vite project, maintained by the Vite team. It's the tool's own documentation.
- **Relation to EZ-Games:** Resource for my solution — the build tool and development server used to create, run, and package the React app.

Vite is a modern frontend build tool. It gives you a fast development server with instant hot-reload, and when you're done it bundles the whole project into plain static files (HTML, CSS, JavaScript) that can be served anywhere. It has first-class support for React and is the standard way to start a new React project.

React can't run directly in a browser — JSX and component imports have to be compiled — and Vite is the tool that does that work. During development, hot-reload means theme or board changes show up instantly while I'm coding. When it's time to present or deploy, `npm run build` produces static files that can be hosted on any web server, which keeps the "no install" promise for players. Vite is the piece that makes the whole modern React workflow practical, and its docs are where I'd go for configuration and deployment questions.

### 11. Web Storage API (localStorage)

- **Link:** https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
- **Type of source:** Primary documentation — MDN Web Docs; the API is a web standard maintained by WHATWG/W3C.
- **Relation to EZ-Games:** Resource for my solution — provides the "local stats" feature (win streak, totals per difficulty) with no accounts and no server.

The Web Storage API lets a site save key-value data in the browser that sticks around between visits. `localStorage` is the simplest version: strings saved under names, stored on the device, and still there the next time the player opens the site.

My scope decision is "browser-stored stats, no accounts," and localStorage is exactly the mechanism for that. Win streak and per-difficulty totals are just a few JSON strings written at the end of each game (see the JSON entry). That replaces what a bigger portal would do with server accounts and databases, and keeps the whole app self-contained. The limitation is worth knowing about: localStorage is per-browser and per-device, so stats don't follow a player to another computer — which is fine, since I deliberately chose no accounts.

### 12. CSS Custom Properties (variables)

- **Link:** https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
- **Type of source:** Primary documentation — MDN Web Docs.
- **Relation to EZ-Games:** Resource for my solution — enables the in-game color-scheme switching.

CSS custom properties, commonly called CSS variables, let a stylesheet define named values like `--board-color: #444` that can be referenced anywhere and changed at runtime.

This is the cleanest way to build selectable color schemes: each scheme is a set of custom-property values, and switching themes means changing one class or attribute on the page root, which recolors every element that uses the variables. Since EZ-Games wants one consistent look across all games, defining colors once as variables and reusing them everywhere is both the theming feature and the visual-identity system in a single mechanism.

### 13. Minimax (algorithm)

- **Link:** https://en.wikipedia.org/wiki/Minimax
- **Type of source:** Secondary — Wikipedia's encyclopedia article about the algorithm, written by editors rather than the algorithm's creators. It's a widely-cited general reference, not an official or primary source.
- **Relation to EZ-Games:** Resource for my solution — the algorithm behind the Expert bot's near-perfect play.

Minimax is a decision rule for two-player zero-sum games: it explores the game tree, assumes the opponent also plays optimally, and picks the move that maximizes your minimum guaranteed outcome. Alpha-beta pruning makes the search practical by skipping branches that can't affect the result.

The proposal promises an Expert bot that's "very rarely beatable," and minimax is the standard, provable way to deliver that for a game as small as Tic Tac Toe — the whole game tree is tiny, so an effectively unbeatable bot is achievable with simple recursion. The same algorithm can be deliberately weakened to build the other two tiers: shallow search or randomized moves make a forgiving Beginner, and a moderate depth makes a solid Pro. So one piece of algorithmic thinking creates all three difficulty levels.

---

## Protocols

### 14. HTTP

- **Link:** https://developer.mozilla.org/en-US/docs/Web/HTTP
- **Type of source:** Primary documentation — MDN Web Docs; the HTTP protocol itself is standardized by the IETF.
- **Relation to EZ-Games:** Resource for my solution — the protocol that delivers the site to players' browsers.

HTTP is the request/response protocol the web runs on: a browser asks a server for a page, the server answers with HTML, CSS, and JavaScript, and the browser renders it.

HTTP is the reason EZ-Games can promise "any device, no install" — anyone with a browser and the address can load the site and play, with nothing to download. For now the app is mostly static client-side code, so HTTP mainly just serves files; it matters more when the project gets deployed and presented, whether from a local server or a hosting service. It's also the only network protocol EZ-Games relies on, because the design deliberately has no accounts, no server-side state, and no online multiplayer — that's a scope choice, not a missing feature.

### 15. JSON

- **Link:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
- **Type of source:** Primary documentation — MDN Web Docs; JSON as a format is standardized by ECMA/ISO.
- **Relation to EZ-Games:** Resource for my solution — the data format for saving stats and any future game data.

JSON is a text format for structured data — nested objects and arrays — that JavaScript can parse and stringify natively, and that most other languages can read too.

JSON is technically a data format rather than a network protocol, and I'm including it because it's the missing piece of the persistence story: localStorage only stores strings, so stats get saved as JSON objects and parsed back when a game loads. It's also the natural format if EZ-Games ever grows online features, since JSON is the standard payload for web APIs exchanged over HTTP. For now it keeps the no-accounts promise simple — one small JSON object per game holds all its stats.

---

## Technologies

### Platform: Web application

Of the four main kinds of app — command-line, desktop GUI, Android, and web — a web app fits this project best. It keeps the "no install, plays on any device" promise that sets EZ-Games apart from the competitors above, it matches how the big portals work (Coolmath, Poki, and Miniclip are all web sites), and it's the only option that runs the same on every device with a browser. Android would add app-store friction and an install step — the exact complaint players have about the Optime app — and a desktop GUI would drop the "any device" advantage. A command-line app can't do theming or a real interface at all.

### Language: JavaScript (with HTML and CSS)

The language question is mostly settled by the platform choice: JavaScript is the only language that runs natively in a browser.

| Language                  | Runs in browser?                   | Fit for a game hub UI        | Setup cost               | Verdict    |
| ------------------------- | ---------------------------------- | ---------------------------- | ------------------------ | ---------- |
| **JavaScript + HTML/CSS** | Yes — the only one                 | Excellent                    | Low                      | **Chosen** |
| Python                    | No — needs a server or desktop app | Poor without a web framework | High (adds Flask/Django) | Not a fit  |
| Java                      | No — needs a backend               | Clunky                       | High                     | Not a fit  |
| C#                        | No — needs ASP.NET                 | Medium                       | High, Windows-centric    | Not a fit  |

JavaScript is also the right pick because I already know it (roughly 6/10 comfortable), so my learning budget goes into React and the build workflow instead of a brand-new language. The one variant worth mentioning is TypeScript — typed JavaScript that compiles down to plain JS and works fine with React. It catches real bugs and it's the industry standard, but it's a second layer of syntax and types to learn on top of JavaScript, so for this timeline I'm sticking with plain JavaScript.

### Frameworks vs. libraries, and what we use

The difference matters here. A **library** is code you call when you need it — you stay in control of the overall flow (a date-picker, a math helper). A **framework** is the reverse: it calls your code. It sets up the skeleton of the app, and your code plugs into that structure (Angular, Next.js). React officially calls itself a library, but once you're using components, props, and state, it decides how your UI rebuilds — which is framework behavior. Paired with Vite, which owns the dev server and the build, the two work as a framework for this project.

- **React** — the component model *is* the hub structure: the launcher and each game are components, so adding a game means adding a component and registering it in the menu. Declarative rendering means the board is just a picture of the current game state, not something you redraw by hand.
- **Vite** — a dev server with hot reload, and a one-command build that produces the static files GitHub Pages serves.
- **localStorage, CSS Custom Properties, minimax** — covered in the annotated entries above (11–13); they handle stats, theming, and the Expert bot.

The "no extra libraries" decision is deliberate. No Redux — the app's state is small enough for React's built-in `useState`. No React Router — a menu that switches components is enough. No UI kit — CSS variables do theming. Fewer dependencies means less to learn and less that can break, which matters on a fixed timeline.

### "New stuff" load — what this stack costs me

- **New language?** No — JavaScript is familiar. The real jump is from "comfortable" to "fluent," and that's easiest on pure game logic and slowest on React idioms, so the plan is to build the hub skeleton first and keep game logic framework-independent.
- **New frameworks or libraries?** Yes — React is the main learning item (components, props, state/hooks), and the Vite workflow is new. But Vite scaffolds the project structure, so the organization is given rather than designed.
- **New build tools and project organization?** Yes — npm commands, the Vite project layout, and deploying the build. This is well-trodden territory with plenty of documentation; the main skill is running the commands and reading errors.
- **External storage?** No — everything is stored in the browser with localStorage. No cloud database, no backend, no accounts. This is the biggest scope saver in the project: data work is nearly zero.
- **Hosting and deployment?** GitHub Pages. It's free and serves static files, which is exactly what a Vite build produces. The one wrinkle is that Pages usually serves from a subpath (like `username.github.io/repo-name/`), so the app needs a base-path setting to keep asset links working. Deployment is `npm run build` followed by pushing the built files, or a GitHub Action that builds automatically on every push.

Overall the load is moderate and manageable: React is the only real hill, and a no-backend, no-database, no-account design keeps everything else flat. That's a deliberate trade — the features (themes, bot, stats) are front-end work, and the front end is where the time goes.