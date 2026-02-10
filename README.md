# Print Center UI
Frontend for the Print Center dashboard built with React, TypeScript, Vite, Tailwind CSS v4, and ponyo-ui. Routing uses React Router v7 and state is managed with Redux Toolkit plus redux-persist.

## Requirements
- Node.js 18+ (npm included)

## Quick start
```bash
npm install
npm run dev        # start Vite dev server
npm run lint       # optional: run ESLint
npm run build      # type-check + production build
npm run preview    # preview built app
```

## Environment
Create a `.env.development` (and/or `.env.production`) in the project root:
```
VITE_API_BASE_URL=https://your-api.example.com
```

## Project structure (key parts)
- `src/main.tsx` – app entry; wraps Redux Provider, PersistGate, CookiesProvider, ThemeProvider, and `BrowserRouter`.
- `src/App.tsx` – sets ponyo-ui company theme and renders routes.
- `src/routes/` – `Routes.tsx`, `PrivateRoute.tsx`, `PublicRoute.tsx`.
- `src/components/layouts/` – shared layouts (Default, Blank, etc.), Navbar/Sidebar.
- `src/pages/` – feature pages (dashboard, goods receipt, common pages).
- `src/app/` – Redux store setup, auth slice, hooks, types.
- `src/assets/styles/` – global styles, Tailwind entry.
- `src/api/apiClient.ts` – axios instance configured with `VITE_API_BASE_URL`.

## Styling
- Tailwind CSS v4 via the Vite plugin (`@tailwindcss/vite`).
- ponyo-ui for UI primitives/components (`ThemeProvider` required, already wired in `main.tsx`).

## Routing & state
- React Router v7; every component that uses routing hooks must render under `BrowserRouter` (already wrapped in `main.tsx`).
- Redux Toolkit with redux-persist (auth slice persisted to `localStorage`).

## Building for production
```bash
npm run build
npm run preview   # serve the built output locally
```

## Troubleshooting
- `useLocation() may be used only in the context of a <Router>`: ensure the app is rendered through `src/main.tsx` (which wraps `BrowserRouter`) and restart the dev server to pick up changes.
- Tailwind classes not applying: confirm `src/assets/styles/index.css` is imported in `src/main.tsx`/`src/App.tsx`.
