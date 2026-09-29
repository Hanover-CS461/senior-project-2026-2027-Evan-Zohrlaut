---
title: 3. Components and JSX
layout: default
---

# 3. Components and JSX

[Home](index.md) · [Previous: Scaffolding](02-scaffolding.md) · [Next: Game slots](04-game-slots.md)

Now you'll learn the two ideas everything in React is built on — **components** and **JSX** — and use them to build the first real piece of your launcher: the **header** with the logo and title at the top.

## What is a component?

A **component** is a JavaScript function that returns a piece of UI. The starter page's `App` is a component:

```jsx
function App() {
  return (
    <h1>Hello React</h1>
  )
}
```

React components:

- Are **functions** (named in `PascalCase`, like `App`, `Header`, `GameSlot`).
- **Return JSX** — markup written inside your JavaScript.
- Are **reusable** — once you define one, you can use it anywhere.
- Are **composable** — components can contain other components.

The whole launcher will be one `App` component that renders a `Header` component and several `GameSlot` components. That structure is what makes "adding more games" a matter of adding components, not rewriting the page.

## What is JSX?

**JSX** looks like HTML but lives inside JavaScript files. It's how you write the markup a component returns.

```jsx
return (
  <header className="header">
    <h1>EZ-Games</h1>
  </header>
)
```

JSX has a few rules worth knowing now (you'll see them all in this tutorial):

| JSX rule | What it means | Example |
| --- | --- | --- |
| `className` instead of `class` | `class` is a reserved word in JavaScript | `<div className="header">` |
| Expressions in `{}` braces | Embed JavaScript values into markup | `<h1>{title}</h1>` |
| One outer element per `return` | JSX must have a single top-level element | wrap siblings in a `<div>` |
| Self-closing tags | Empty elements close themselves | `<br />` |

React's official docs explain this more fully: [Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx).

## Step 1 — Replace the starter `App.jsx`

Open `src/App.jsx` and replace its contents with a minimal version of your launcher that just renders the header:

```jsx
import './App.css'
import Header from './components/Header.jsx'

function App() {
  return (
    <div className="launcher">
      <Header />
    </div>
  )
}

export default App
```

`App` renders a `<div className="launcher">` (a container you'll style later) and inside it the `<Header />` component — which doesn't exist yet. If you save now, the page breaks. Let's fix that.

## Step 2 — Create the `Header` component

Create a new folder `src/components`. In it, create a file named `Header.jsx`:

```jsx
function Header() {
  return (
    <header className="header">
      <svg className="header__logo" viewBox="0 0 48 48" aria-hidden="true">
        <rect x="4" y="4" width="40" height="40" rx="10" fill="var(--color-accent)" />
        <path
          d="M17 17l14 14M31 17L17 31"
          stroke="var(--color-bg)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      <div className="header__text">
        <h1 className="header__title">EZ-Games</h1>
        <p className="header__tagline">A place for quick, fun games — all in one site.</p>
      </div>
    </header>
  )
}

export default Header
```

That inline `<svg>` is your **logo** — a stylized "X" in a rounded square. It uses `var(--color-accent)` and `var(--color-bg)`, CSS custom properties you'll define in the styling section. For now the browser uses the fallback behavior: undefined variables mean the properties are simply missing, so the logo may look blank until Section 5.

Save both files and check the browser. The starter page is gone; you should see **"EZ-Games"** with its tagline at the top — your logo and title are in place.

## Step 3 — Pass data to a component with props

Hard-coding "EZ-Games" inside `Header` works, but components are more useful when they **receive** data. Data passed into a component is called **props** (short for *properties*).

Change `Header` to accept props:

```jsx
function Header({ title, tagline }) {
  return (
    <header className="header">
      <svg className="header__logo" viewBox="0 0 48 48" aria-hidden="true">
        <rect x="4" y="4" width="40" height="40" rx="10" fill="var(--color-accent)" />
        <path
          d="M17 17l14 14M31 17L17 31"
          stroke="var(--color-bg)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      <div className="header__text">
        <h1 className="header__title">{title}</h1>
        <p className="header__tagline">{tagline}</p>
      </div>
    </header>
  )
}

export default Header
```

Now `Header` is a component that says "give me a `title` and a `tagline`, and I'll draw the header." Update `App.jsx` to pass them:

```jsx
import './App.css'
import Header from './components/Header.jsx'

function App() {
  return (
    <div className="launcher">
      <Header title="EZ-Games" tagline="A place for quick, fun games — all in one site." />
    </div>
  )
}

export default App
```

Save and check the browser — the header looks identical. The difference is now the header is **data-driven**: the same component could render "Coolmath" or "Poki" just by passing different props. That's the whole point of props, and it's exactly how the game slots in the next section will work.

See the official guide: [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component).

## Practice — stretch your legs
{: #practice-stretch-your-legs }

> **Practice 1 (recommended):** Change the tagline passed from `App.jsx` to something else, e.g. `"Quick games, one site."` Save and confirm the browser updates instantly (that's HMR). Then change it back.
>
> **Practice 2 (harder):** The header's logo is currently an "X". Draw a different simple shape by replacing the `<path d="...">` inside the `<svg>`. Try a circle: `<circle cx="24" cy="24" r="10" fill="var(--color-bg)" />`. If the header still renders, you've got the hang of JSX.

## Section check

At this point you should have:

- ✅ A `Header` component rendering a logo and title
- ✅ `App.jsx` rendering `<Header />` with props
- ✅ The browser showing the EZ-Games header at the top
- ✅ A working mental model of components, JSX, and props

Next: build the grid of placeholder game slots from a list of data.

---

[Home](index.md) · [Previous: Scaffolding](02-scaffolding.md) · [Next: Game slots](04-game-slots.md)