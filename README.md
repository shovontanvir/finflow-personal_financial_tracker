# FinFlow

FinFlow is a personal finance dashboard built as a technical assessment for TechCare Inc. The project focuses on

- clean architecture,
- strict TypeScript practices, and
- responsive data-driven UI patterns in a modern React application.

The app helps users track income and expenses, review transaction activity, and understand spending behavior through visual summaries and trend charts. It is designed to demonstrate maintainable frontend engineering with clear state management, modular components, and realistic mocked data interactions.

## Tech Stack

### Dependency Rationale

- **Vite + React 19 + TypeScript (Strict Mode)** as the core frontend foundation.
- **TanStack Query**: standardizes async data fetching, caching, loading/error states, and invalidation.
- **React Hook Form + Zod**: gives schema-first validation with strong TypeScript inference for transaction forms.
- **Recharts**: provides composable chart primitives for donut/pie and line/area trends.
- **Lucide React**: offers tree-shakeable icon components with consistent visual style.
- **date-fns**: simplifies month grouping, date parsing, and display formatting.
- **clsx + tailwind-merge**: helps compose conditional class names without duplicate/overridden Tailwind utilities.

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

## Detailed Documentation

### Architecture Overview

The current codebase is organized into a typed, modular structure:

- `src/services` contains the API/service abstraction.
- `src/data` contains mock seed data.
- `src/types` contains reusable TypeScript contracts.
- `src/App.tsx` is the current UI entry component (minimal scaffold at this stage).

This structure is intentionally designed to separate UI, domain types, and data-access logic.

### Data Source and Mock API Behavior

The app currently uses a local mock service in `src/services/api.ts` instead of an external backend.

- Storage key: `finflow_transactions` in `localStorage`.
- Initial bootstrap: if no storage data exists, seed transactions from `src/data/mockData.ts`.
- Simulated latency: `600ms` base delay for network-like behavior.
- Error simulation: `25%` random error chance to test failure handling paths.

### Available Service Methods

`apiMethods` exposes CRUD-style async functions:

- `get()` returns all transactions.
- `post(body)` creates a transaction and generates a unique `id`.
- `put(txn_id, body)` updates a transaction by id.
- `delete(txn_id)` removes a transaction by id.

All methods return a typed `ApiResponse<T>` shape:

- `success: boolean`
- `message: string`
- `data: T | null`
- `error?: string`

### Type Safety and Domain Contracts

The transaction model is strongly typed in `src/types/transaction.d.ts`.

- `TransactionType`: `income | expense`
- `TransactionStatus`: `completed | pending | failed`
- `TransactionCategory`: strict category union (Food, Transport, Utilities, Entertainment, Health, Shopping, Income, Other)

This enforces compile-time correctness across filtering, charting, and form validation.

### Seed Dataset

`src/data/mockData.ts` includes 30 transactions spanning multiple months, so dashboard summaries and trend charts have meaningful data immediately after first run.
