# FinFlow

FinFlow is a personal finance dashboard built as a technical assessment for TechCare Inc. The project focuses on

- clean architecture,
- strict TypeScript practices, and
- responsive data-driven UI patterns in a modern React application.

The app helps users track income and expenses, review transaction activity, and understand spending behavior through visual summaries and trend charts. It is designed to demonstrate maintainable frontend engineering with clear state management, modular components, and realistic mocked data interactions.

## Tech Stack

- **Vite**: Fast dev server startup and instant HMR, ideal for a time-boxed technical assessment where quick iteration matters.
- **React 19**: Modern component model and up-to-date React patterns for building a scalable, interactive dashboard UI.
- **TypeScript (Strict Mode)**: Strong type safety, better editor tooling, and fewer runtime bugs through compile-time checks.

### Why vite?

Vite was chosen specifically to maximize development speed without sacrificing a modern build pipeline. It keeps feedback loops short during implementation while still producing optimized production bundles.

### Why **HMR (Hot Module Replacement)**?

Because code changes are applied in the browser instantly without a full page reload, so component state is usually preserved while developing. This makes UI iteration and debugging much faster.

## Local Setup and Run

### Prerequisites

- Node.js (LTS recommended)
- npm (comes with Node.js)

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

This starts Vite with HMR for local development.

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

### 5. Run lint checks

```bash
npm run lint
```
