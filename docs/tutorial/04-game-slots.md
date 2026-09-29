---
title: 4. Cards and lists
layout: default
---

# 4. Cards and lists

[Home](index.md) · [Previous: Components and JSX](03-components-and-jsx.md) · [Next: Styling](05-styling-theming.md)

The main part of your page is a **grid of cards** — the content your visitors came to see. In the example those cards are game slots, but the pattern is the same for any page: links, projects, photos, posts. In this section you'll build the cards and render them from a list of data — which is exactly how any collection stays easy to grow.

## Step 1 — Model the content as data

Instead of writing several almost-identical cards by hand, define the collection as a JavaScript array. In the example, each item is a game with an `id`, a `name`, a `description`, and a `variant` that picks which icon to show. Your own cards would follow the same shape with whatever fields you need:

```jsx
const GAMES = [
  { id: 'tic-tac-toe', name: 'Tic Tac Toe', description: 'The first game', variant: 'x' },
  { id: 'slot-2', name: 'Coming Soon', description: 'Reserved for the next game', variant: 'plus' },
  { id: 'slot-3', name: 'Coming Soon', description: 'Reserved for the next game', variant: 'plus' },
]
```

> **Why data first?** Later, when Tic Tac Toe is finished, you flip it from a placeholder to a real game by changing its entry — or you add a fourth object to add a fourth game. For your own page, that's how you add a new link or project. The UI doesn't have to change at all. This is the "hub" idea of EZ-Games in miniature — and the "collection" idea behind any data-driven page.

## Step 2 — Create the card component

Each item in that list will be rendered by a card component. The example calls it `GameSlot`; you'd name yours after whatever your cards hold. Create `src/components/GameSlot.jsx`:

```jsx
import GameIcon from './GameIcon.jsx'

function GameSlot({ game }) {
  return (
    <article className="game-slot">
      <GameIcon variant={game.variant} />
      <h2 className="game-slot__name">{game.name}</h2>
      <p className="game-slot__description">{game.description}</p>
      <span className="game-slot__badge">Coming soon</span>
    </article>
  )
}

export default GameSlot
```

Let's read it before saving:

- **`import GameIcon from './GameIcon.jsx'`** — imports the icon component you'll create in Step 3.
- **`function GameSlot({ game })`** — the component receives the whole item as a single prop called `game` and destructures it.
- **`<GameIcon variant={game.variant} />`** — renders the icon component and hands it the `variant` value from the data.
- **`<article>`** — a semantic HTML element for a self-contained card.
- **`{game.name}` and `{game.description}`** — expressions that insert values from the item's data.

This component receives the whole item as a single prop and renders its `name`, `description`, and an icon. The icon comes from another component, `GameIcon`, which handles the SVG placeholder art — separating "what icon to draw" from "how the card is laid out."

## Step 3 — Create the `GameIcon` component

Create `src/components/GameIcon.jsx` with two simple SVG placeholders: an "X" for the real game and a "+" for empty slots:

```jsx
function GameIcon({ variant = 'plus' }) {
  const isX = variant === 'x'
  return (
    <svg className="game-slot__icon" viewBox="0 0 64 64" aria-hidden="true">
      {isX ? (
        <path
          d="M18 18l28 28M46 18L18 46"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M32 20v24M20 32h24"
          fill="none"
          stroke="var(--color-muted)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}

export default GameIcon
```

Note the `{isX ? (...) : (...)}` inside the `<svg>` — that's a JavaScript ternary expression embedded in JSX, choosing which path to draw based on the `variant` prop. Also note `variant = 'plus'`: the `= 'plus'` gives the prop a **default value** used when no `variant` is passed.

> **Check:** save and look at the browser. Nothing new shows up yet — the icon component exists but nothing renders it yet. Step 4 connects everything.

## Step 4 — Render the list in `App.jsx`

Now wire everything together. Update `src/App.jsx` to define the `GAMES` array and render each game with `.map()`:

```jsx
import './App.css'
import Header from './components/Header.jsx'
import GameSlot from './components/GameSlot.jsx'

const GAMES = [
  { id: 'tic-tac-toe', name: 'Tic Tac Toe', description: 'The first game', variant: 'x' },
  { id: 'slot-2', name: 'Coming Soon', description: 'Reserved for the next game', variant: 'plus' },
  { id: 'slot-3', name: 'Coming Soon', description: 'Reserved for the next game', variant: 'plus' },
]

function App() {
  return (
    <div className="launcher">
      <Header title="EZ-Games" tagline="A place for quick, fun games — all in one site." />
      <main className="game-grid">
        {GAMES.map((game) => (
          <GameSlot key={game.id} game={game} />
        ))}
      </main>
    </div>
  )
}

export default App
```

Three things to notice in the new lines:

- **`{GAMES.map((game) => ...)}`** — an expression in braces that transforms each game object into a `<GameSlot />`. `.map()` returns a new array, and React renders each element.
- **`game={game}`** — passes the current game object into the `GameSlot` as a prop.
- **`key={game.id}`** — a special prop that React uses to keep track of each list item. React requires a stable, unique `key` for every item in a list; using the `id` is the standard approach.

> **What just happened:** `GAMES.map(...)` runs once per item in the array. For the first item it renders a `GameSlot` with the "X" icon; for the other two it renders slots with "+" icons. The `key` tells React which card is which, so it can update the right one when the data changes.
>
> **Check:** save and look at the browser. Below the header you should now see **three cards**: one with an "X" (Tic Tac Toe) and two with "+" placeholders. They won't look styled yet — Section 5 fixes that.

## Step 5 — A quick style pass so you can see the layout

The grid layout comes from a small bit of CSS. Create `src/App.css` (or replace what Vite generated) with:

```css
.launcher {
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.25rem;
  margin-top: 2rem;
}
```

`grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))` makes the grid **responsive**: it places as many columns as fit at 200px minimum and grows them to share the row. Resize the browser window and watch the cards reflow.

See the official guides: [Rendering Lists](https://react.dev/learn/rendering-lists) and [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component).

## Practice — make it yours
{: #practice-make-it-yours }

> **Practice 3 (recommended):** Add a fourth game to the `GAMES` array — e.g. `{ id: 'slot-4', name: 'Coming Soon', description: 'Reserved for the next game', variant: 'plus' }`. Save and confirm a fourth card appears. This is the whole "add an item" workflow in one line — for your own page, add a fourth entry to *your* array.
>
> **Practice 4 (harder):** The Tic Tac Toe card currently shows a "+"-style icon. Change `GAMES` so Tic Tac Toe uses `variant: 'x'` if it doesn't already, then give `GameIcon` a third shape (try an `o` variant — a `<circle>`) and use it somewhere.

## Section check

At this point you should have:

- ✅ An array of data driving the collection
- ✅ Card and icon components with props
- ✅ `.map()` rendering the cards, each with a `key`
- ✅ A responsive grid of three (or four) cards

Next: give the whole page one consistent look with CSS custom properties.

---

[Home](index.md) · [Previous: Components and JSX](03-components-and-jsx.md) · [Next: Styling](05-styling-theming.md)