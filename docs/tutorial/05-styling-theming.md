---
title: 5. Styling and theming
layout: default
---

# 5. Styling and theming

[Home](index.md) · [Previous: Game slots](04-game-slots.md) · [Next: Summary](06-summary.md)

Your launcher works, but right now the logo is invisible and the slots are unstyled. In this section you'll give the whole page **one consistent look** using **CSS custom properties** — the mechanism EZ-Games uses for its color schemes.

## What are CSS custom properties?

A **CSS custom property** (also called a CSS variable) is a named value you define once and reuse everywhere:

```css
:root {
  --color-accent: #7aa2f7;
}
```

- The name always starts with `--` (like `--color-accent`).
- It's **defined** on `:root` (the page's top-level element) so it's available everywhere.
- It's **used** with the `var()` function: `color: var(--color-accent);`.

The payoff: change the value in one place, and every element using it recolors instantly. That single property is what makes selectable color schemes possible — you'll see the pattern in the practice section.

## Step 1 — Global styles and the theme

Replace `src/index.css` with the global stylesheet. It defines the **color scheme** and base typography:

```css
:root {
  --color-bg: #1e1e2e;
  --color-surface: #2a2a3c;
  --color-text: #eef1f8;
  --color-muted: #a6adc0;
  --color-accent: #7aa2f7;
  --color-slot-border: #3b3b52;
  --radius: 12px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  background-color: var(--color-bg);
  color: var(--color-text);
}
```

Notice how the whole palette lives in one block at the top. The `body` rule then uses `var(--color-bg)` and `var(--color-text)` — so the page background and text color are *driven by* the scheme, not hard-coded. This is the theming story: the dark theme is just these seven variable values.

## Step 2 — Style the header

Now the logo's `var(--color-accent)` and `var(--color-bg)` resolve to real values, and you can lay out the header. Create `src/components/Header.css`:

```css
.header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.header__logo {
  width: 3rem;
  height: 3rem;
  flex-shrink: 0;
}

.header__title {
  margin: 0;
  font-size: 1.75rem;
  line-height: 1.2;
}

.header__tagline {
  margin: 0.25rem 0 0;
  color: var(--color-muted);
}
```

And import it in `Header.jsx`:

```jsx
import './Header.css'

function Header({ title, tagline }) {
  // ... unchanged
}
```

The naming convention `header__logo`, `header__title`, `header__tagline` is **BEM** (Block, Element, Modifier): the block is `header`, and each piece inside is an element of that block. It keeps styles predictable and collision-free as the project grows.

## Step 3 — Style the game slots

Create `src/components/GameSlot.css`:

```css
.game-slot {
  border: 2px dashed var(--color-slot-border);
  border-radius: var(--radius);
  background: var(--color-surface);
  padding: 1.5rem;
  text-align: center;
}

.game-slot__icon {
  width: 3rem;
  height: 3rem;
  margin: 0 auto 0.75rem;
}

.game-slot__name {
  margin: 0;
  font-size: 1.1rem;
}

.game-slot__description {
  margin: 0.5rem 0 0;
  color: var(--color-muted);
  font-size: 0.9rem;
}

.game-slot__badge {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: var(--color-accent);
  color: var(--color-bg);
  font-size: 0.75rem;
  font-weight: 600;
}
```

Import it in `GameSlot.jsx`:

```jsx
import GameIcon from './GameIcon.jsx'
import './GameSlot.css'

function GameSlot({ game }) {
  // ... unchanged
}
```

The slots use dashed borders (`border: 2px dashed ...`) and the "Coming soon" badge — clear visual signals that these are placeholders waiting for real games. The card background, text color, and badge color all come from CSS variables, so every part of the page belongs to the same theme.

## Step 4 — Full check

Save everything. The browser should now show the finished launcher matching Figure 1 from the introduction:

- **Logo + "EZ-Games" title** at the top, tagline beneath it in muted text
- A **responsive grid** of three slots
- Slot 1 (**Tic Tac Toe**) with an accent-colored "X" icon
- Slots 2 and 3 (**Coming Soon**) with dashed borders and "+" icons

The page now has one consistent visual identity — and the entire theme lives in seven variables at the top of `index.css`.

See the official reference: [Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) on MDN.

## Practice — play with the theme
{: #practice-play-with-the-theme }

> **Practice 5 (recommended):** Change the accent color. In `src/index.css`, edit `--color-accent: #7aa2f7;` to a different value — try `#f7768e` (pink) or `#9ece6a` (green). Save and watch the logo, badge, and card accents recolor together. This is the core of EZ-Games' color-scheme feature.
>
> **Practice 6 (harder):** Add a **light theme** without duplicating any styles. Define the light values inside a `.light` class:
>
> ```css
> .light {
>   --color-bg: #f4f5fb;
>   --color-surface: #ffffff;
>   --color-text: #1e1e2e;
>   --color-muted: #5b5f78;
>   --color-slot-border: #d4d6e4;
> }
> ```
>
> Then temporarily add `class="light"` to the `<body>` in `index.html` (or to the launcher `<div>` in `App.jsx`) and confirm the whole page switches. Every element recolors because they all read from the same variables — no individual rules needed.

## Section check

At this point you should have:

- ✅ A color scheme defined once as CSS custom properties
- ✅ Styled header, grid, and slots all reading from those variables
- ✅ A page that looks finished and consistent
- ✅ (If you did the practices) the ability to re-theme the app by changing a few values

Next: recap what you learned, check your progress against the objectives, and see where the app goes from here.

---

[Home](index.md) · [Previous: Game slots](04-game-slots.md) · [Next: Summary](06-summary.md)