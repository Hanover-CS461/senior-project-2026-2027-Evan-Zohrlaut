---
title: 6. Summary and next steps
layout: default
---

# 6. Summary and next steps

[Home](index.md) · [Previous: Styling](05-styling-theming.md)

You made it! Let's recap what you built and learned, check your progress against the objectives, and look at where the launcher goes from here.

## What you built

You now have a running React app that renders the **EZ-Games launcher**:

- A **logo and title** at the top, driven by a `Header` component that takes `title` and `tagline` props
- A **grid of placeholder game slots**, rendered from a `GAMES` array with `.map()`, each drawn by a `GameSlot` component
- An **SVG placeholder icon** per slot from the `GameIcon` component
- A **single consistent color scheme** defined with CSS custom properties and reused by every component

## Check your progress

| Learning objective | Where you covered it | Did you get it? |
| --- | --- | --- |
| Create and run a React project with Vite | [Section 2](02-scaffolding.md) — `npm create vite@latest`, `npm run dev` | |
| Explain components and write JSX | [Section 3](03-components-and-jsx.md) — `Header`, `className`, expressions | |
| Render a list from data with `.map()` and props | [Section 4](04-game-slots.md) — `GAMES`, `GameSlot`, `key` | |
| Theme consistently with CSS custom properties | [Section 5](05-styling-theming.md) — `:root`, `var()`, light theme | |
| See how the launcher grows into a hub | This section — adding a game = adding an array entry | |

## How this becomes EZ-Games

This launcher was built to grow. The pieces are already in place for the full project described in the [proposal](../proposal/proposal.md):

- **New games** — a finished game becomes a component, and its `GAMES` entry switches from a "Coming Soon" placeholder to a real slot. Tic Tac Toe is next, with a three-level bot.
- **Color schemes** — the CSS variables are the theming system. Preset schemes are just different sets of variable values, applied by swapping a class or attribute on the root.
- **Local stats** — win streaks and totals per difficulty will be saved with the browser's `localStorage` API, so no account or server is needed.
- **Deployment** — `npm run build` produces static files that any static host can serve, including GitHub Pages.

Every future feature mounts into the structure you built here rather than replacing it.

## Exercises recap

If you haven't already, try the practices — they're the best way to make the material stick:

1. **Change the tagline** and watch HMR update the browser ([Section 3](03-components-and-jsx.md#practice-stretch-your-legs)).
2. **Draw a different logo** shape inside the header's `<svg>` ([Section 3](03-components-and-jsx.md#practice-stretch-your-legs)).
3. **Add a fourth game** to the `GAMES` array ([Section 4](04-game-slots.md#practice-make-it-yours)).
4. **Add a new icon variant** to `GameIcon` ([Section 4](04-game-slots.md#practice-make-it-yours)).
5. **Change the accent color** and recolor the whole app ([Section 5](05-styling-theming.md#practice-play-with-the-theme)).
6. **Add a light theme** with a single `.light` class ([Section 5](05-styling-theming.md#practice-play-with-the-theme)).

Completing at least two is enough to satisfy the tutorial's practice requirement — but all six will make you genuinely comfortable with the stack.

## See also

Official documentation referenced throughout the tutorial:

- [React — Your First Component](https://react.dev/learn/your-first-component)
- [React — Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)
- [React — Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- [React — Rendering Lists](https://react.dev/learn/rendering-lists)
- [Vite — Getting Started](https://vitejs.dev/guide/)
- [MDN — Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [MDN — Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Node.js](https://nodejs.org/)

## Where to go next

You have everything you need to start building the first real game. A natural next step: create a `TicTacToe` component that renders a 3×3 board, give it the same visual language (CSS variables, `className` naming), and swap it into the launcher where the placeholder now sits.

Thanks for following along — go build something fun.

---

[Home](index.md) · [Previous: Styling](05-styling-theming.md)