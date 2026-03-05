# color-workspace-builder

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
bun install
```

### Compile and Hot-Reload for Development

```sh
bun dev
```

### Type-Check, Compile and Minify for Production

```sh
bun run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
bun test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
bun lint
```

## Requirements

Overview:
A mini-app called "Color Workspace Builder" that allows users to create and
manage a color palette workspace. This tool is commonly used in theme configuration.

Technical showcase: - UI composition - State management - Performance optimization - Component-based architecture.
UI/UX Design: Refer to `public/design-mockup.png`.
Color palettes: Refer to the `public/combinations.json` file for pre-built color palettes. Create 7 of them.
Favicon: Refer to the `public/workspace-builder.png`.

Requirements:

UI Requirements - A palette of selectable color swatches. - A workspace area that uses the selected colors to configure the simple SDK coding theme.
Users should be able to: - Add/Reorder/Remove colors from the palette to the workspace. - View the colors' hex code. - Tooltip on hover to display accessibility contrast info (optional). - Responsive layout and usable on both desktop and tablet. - Select theme from the selector (e.g. switch code preview to Dracula / One Dark / VSCode theme…). - Add/delete new custom themes - Support a seperate Dark/Light mode toggle switch that applies for any themes.
Functionality - State management via Pinia. - Reordering can be implemented with Vue-supported 3rd party library drag-and-drop solution. - Compute and show contrast ratio between color pairs. - Warn the user with minimal label if contrast is below WCAG AA threshold (3.5). - Live code preview box that reflects the workspace colors, styled as a simple mockup Vue SFC code template. - Cache the selected colors for future visits - Cache the newly added themes for future visits.
Technical Notes - Technical stack is purely VueJS ecosystem: VueJS 3, Pinia, Vitest. - Code should be modular, clean and readable. - Proper usage of props, events, and component lifecycle is encouraged.
Bonus (Optional but Appreciated) - Functionality to Import/Export workspace theme from/to JSON. - Support keyboard accessibility for palette navigation. - Unit test with Vitest for all available cases.
Evaluation Criteria: - Component structure and separation of concerns - State management practices - UX responsiveness and accessibility awareness - Cleanliness and modularity of codebase - Bonus: use of composables, utility-first design, or advanced framework techniques.
