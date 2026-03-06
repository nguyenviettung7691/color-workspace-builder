# Color Workspace Builder

A Vue 3 application for creating and managing custom color palette workspaces for theme configuration. Build, preview, and save custom code editor themes with live syntax highlighting.

## Features

- 🎨 **Interactive Palette Selection** - Choose from 7 pre-built color palettes
- 🔧 **Workspace Builder** - Add, reorder, and remove colors with drag-and-drop
- 👁️ **Live Code Preview** - Real-time syntax highlighting preview of your theme
- 💾 **Save Custom Themes** - Create and store your own themes locally
- 🌓 **Dark/Light Mode Toggle** - Switch between dark and light editor modes
- ⚠️ **Contrast Checker** - WCAG AA compliance warnings for accessibility
- 📱 **Responsive Design** - Desktop-first with tablet support
- 💿 **Persistent Storage** - Themes and colors saved in localStorage

## Setup Instructions

### Prerequisites

Before setting up the project, ensure you have the following installed on your system:

#### Node.js

This project requires **Node.js version 20.19.0 or higher** (or Node.js 22.12.0+).

**Check your Node.js version:**
```bash
node --version
```

**If you need to install or upgrade Node.js:**
- Download from [nodejs.org](https://nodejs.org/)
- Or use a version manager like [nvm](https://github.com/nvm-sh/nvm) (Linux/macOS) or [nvm-windows](https://github.com/coreybutler/nvm-windows)

#### Package Manager

This project uses **Bun** as the package manager. You can also use npm or pnpm if preferred.

**To install Bun:**

**Windows (PowerShell):**
```powershell
powershell -c "irm bun.sh/install.ps1|iex"
```

**macOS/Linux:**
```bash
curl -fsSL https://bun.sh/install | bash
```

**Alternative: Using npm**
If you prefer to use npm (comes with Node.js), you can use it instead - just replace `bun` commands with `npm` throughout the instructions.

### Installation Steps

Follow these steps to get the project up and running locally:

#### 1. Clone or Download the Repository

```bash
# If using git
git clone <repository-url>
cd color-workspace-builder

# Or if you downloaded a zip file, extract it and navigate to the folder
cd color-workspace-builder
```

#### 2. Install Dependencies

```bash
bun install
```

**Using npm instead:**
```bash
npm install
```

This will install all required dependencies including:
- Vue 3.5.29
- Pinia (state management)
- Vite (build tool)
- TypeScript
- Vitest (testing framework)
- ESLint & Prettier (code quality)

**Expected output:** You should see a list of installed packages and no critical errors.

#### 3. Verify Installation

Run the type checker to ensure everything is set up correctly:

```bash
bun run type-check
```

**Using npm:**
```bash
npm run type-check
```

If this completes without errors, your setup is successful!

### Running the Development Server

Start the local development server:

```bash
bun run dev
```

**Using npm:**
```bash
npm run dev
```

**Expected output:**
```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

Open your browser and navigate to `http://localhost:5173/` to see the application.

The development server features:
- **Hot Module Replacement (HMR)** - Changes appear instantly without page reload
- **TypeScript Support** - Type checking in the editor
- **Fast Refresh** - Preserves component state during updates

### Troubleshooting Setup Issues

#### Port Already in Use

If port 5173 is already in use:
```bash
# Vite will automatically try the next available port
# Or specify a different port:
bun run dev -- --port 3000
```

#### Permission Errors (Windows)

If you encounter permission errors on Windows:
1. Run PowerShell as Administrator
2. Or adjust execution policy: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

#### Module Not Found Errors

If you see module errors after installation:
```bash
# Clear node_modules and reinstall
rm -rf node_modules
bun install

# Or with npm
rm -rf node_modules package-lock.json
npm install
```

#### Node Version Issues

If you get Node version errors:
```bash
# Check your version
node --version

# Must be >= 20.19.0 or >= 22.12.0
# Use nvm to switch versions if needed
nvm install 22
nvm use 22
```

## Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server with HMR |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build locally |
| `bun run test:unit` | Run unit tests with Vitest |
| `bun run type-check` | Run TypeScript type checking |
| `bun run lint` | Lint and fix code with ESLint + oxlint |
| `bun run format` | Format code with Prettier |
| `bun run deploy` | Deploy to GitHub Pages |

### Project Structure

```
color-workspace-builder/
├── public/
│   ├── combinations.json      # Pre-built color palettes
│   └── workspace-builder.png  # Favicon
├── src/
│   ├── components/            # Vue components
│   │   ├── AppHeader.vue
│   │   ├── WorkspaceBuilder.vue
│   │   ├── PaletteGrid.vue
│   │   ├── WorkspaceColors.vue
│   │   ├── CodePreview.vue
│   │   ├── ThemeSelector.vue
│   │   ├── SaveThemeModal.vue
│   │   └── DeleteThemeModal.vue
│   ├── composables/           # Composable functions
│   │   └── useContrast.ts
│   ├── stores/                # Pinia stores
│   │   └── workspaceStore.ts
│   ├── types/                 # TypeScript types
│   │   └── index.ts
│   ├── data/                  # Static data
│   │   └── defaultThemes.ts
│   ├── App.vue                # Root component
│   └── main.ts                # Application entry point
├── __tests__/                 # Test files
│   └── Workspace.spec.ts
└── package.json
```

### Running Tests

The project uses Vitest for unit testing.

**Run tests in watch mode:**
```bash
bun run test:unit
```

**Run tests once:**
```bash
bun run test:unit -- --run
```

**Run tests with UI:**
```bash
bun run test:unit -- --ui
```

### Code Quality

**Lint your code:**
```bash
bun run lint
```

**Format your code:**
```bash
bun run format
```

The project uses:
- **ESLint** - JavaScript/TypeScript linting
- **oxlint** - Fast Rust-based linter
- **Prettier** - Code formatting
- **Vue ESLint Plugin** - Vue-specific rules

## Building for Production

### Create Production Build

```bash
bun run build
```

This will:
1. Run type checking
2. Build optimized bundles
3. Output to `dist/` directory

### Preview Production Build

```bash
bun run preview
```

This starts a local server to preview the production build before deployment.

## Deployment

The project is configured for GitHub Pages deployment:

```bash
bun run deploy
```

This will:
1. Build the project
2. Deploy the `dist/` folder to the `gh-pages` branch

**Note:** Configure your GitHub repository settings to serve from the `gh-pages` branch.

## Technical Stack

- **Framework:** Vue 3.5.29 (Composition API)
- **State Management:** Pinia 3.0.4
- **Build Tool:** Vite 7.3.1
- **Language:** TypeScript 5.9.3
- **Testing:** Vitest 4.0.18
- **Linting:** ESLint 10.0.2, oxlint 1.50.0
- **Formatting:** Prettier 3.8.1

## Browser Support

This application requires a modern browser with ES6+ support:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

Private project - not licensed for redistribution.
