# 📊 FinFlow - Personal Finance Dashboard

FinFlow is a personal finance dashboard built as a technical assessment for TechCare Inc. The project demonstrates professional-grade React development with clean architecture, strict TypeScript practices, and responsive data-driven UI patterns.

## Project Overview

The app helps users:

- 📈 Track income and expenses with real-time updates
- 🔍 Search and filter transactions with simultaneous multi-criteria filtering
- 📊 Visualize spending patterns through donut charts and 6-month trend analysis
- 📋 Manage transactions with comprehensive pagination and sorting
- 🌙 Switch between light and dark themes
- ✅ Validate transactions with strict Zod schema enforcement

**Key Principles**: Clean architecture, modular components, strong TypeScript typing (zero `any` types), performance optimization with memoization, and professional error handling.

## 🚀 Live Demo

**Try it now**: [https://finflow-personal-finance-tracker.netlify.app/](https://finflow-personal-finance-tracker.netlify.app/)

The live demo includes 30 seed transactions with mock data. You can:

- Add new transactions using the "Add Transaction" button
- Filter by category and status
- Search by description (500ms debounce)
- Sort by date or amount
- Browse 6-month spending trends
- Toggle between light and dark themes

**Note**: Data is stored locally in your browser's localStorage and will reset on page refresh.

## Key Features & Highlights

### Core Requirements (All Implemented ✅)

- 📊 Dashboard with balance, income, and expense totals
- 🔍 Real-time search with 500ms debounce
- 🏷️ Multi-filter (category + status)
- 📈 Sorting by date and amount
- 📋 Pagination (5/10/25/50 items per page)
- 📝 Add transaction form with Zod validation
- 📊 6-month spending trend chart
- 🍩 Category breakdown donut chart

### Extra Features (Beyond Requirements 🎁)

#### 1. **Dark Mode Support** 🌙

- Full light/dark theme switching via `next-themes`
- Toggle button in header
- Automatically detects system preference
- All components properly styled for both themes
- Persisted theme preference in localStorage

#### 2. **Professional Error Handling** ⚠️

- Custom `<Error />` component with user-friendly messages
- "Try Again" button with automatic query invalidation
- Fallback UI displays on API failures
- Mock API simulates 25% error rate for robustness testing

#### 3. **Loading States & Skeleton UI** ⏳

- `<LoadingSkeleton />` component with shimmer animation
- Professional skeleton loader during initial data fetch
- Smooth transition from loading to content
- Prevents layout shift (CLS optimization)

#### 4. **Toast Notifications** 📬

- Success toasts (green #10b981) on transaction creation
- Error toasts (red #ef4444) on failures
- `sonner` library for auto-dismissing notifications
- Custom styling with brand colors
- Professional UX feedback for user actions

#### 5. **Mock API Error Simulation** 🛡️

- Configurable random error injection (25% failure rate)
- Realistic network latency simulation (1.5s base delay)
- Tests error handling and retry logic
- Helps validate UI during development

#### 6. **Mock Data with Realistic Values** 📊

- 30 seed transactions spanning 6 months
- Mixed income and expense types
- All categories represented
- Various status values (completed/pending/failed)
- Proper date distribution for trend analysis

#### 7. **Comprehensive Responsive Design** 📱

- **Mobile-first approach** with Tailwind CSS breakpoints
- **Drawer optimization**: 80vw on mobile → 50vw on desktop (`md:w-1/2`)
- **Table responsiveness**: Horizontal scroll on mobile, multiline on larger screens
- **Chart responsiveness**: Responsive container with aspect ratio maintenance
- **Navigation**: Collapsible menu on mobile, full header on desktop
- **Spacing & Padding**: Dynamic padding that adapts from mobile (px-4) to desktop (px-8)
- **Font sizes**: Fluid typography with Tailwind's responsive modifiers
- **Grid layouts**: Auto-flow grids that stack on mobile, multi-column on desktop
- **Touch-friendly**: Button/interactive element sizes optimized for finger targets (min 44×44px)
- **Media Queries**: Breakpoints at sm (640px), md (768px), lg (1024px), xl (1280px)
- **Tested resolutions**:
  - ✅ Mobile: 375px (iPhone SE)
  - ✅ Tablet: 768px (iPad)
  - ✅ Desktop: 1920px (Full HD)
  - ✅ Ultra-wide: 2560px (4K)

**Implementation Details:**

- Header adjusts from stacked buttons (mobile) to inline toolbar (desktop)
- Drawer width optimizes form usability: narrow on phones, wider on desktops
- Transaction table shows essential columns on mobile (description, amount), full columns on desktop
- Charts adjust container width and font sizes for readability
- Filter controls stack vertically on mobile, horizontally on desktop
- Pagination adapts button sizes for touch on mobile

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

- **Node.js** 16.x or higher (LTS recommended)
- **npm** 8.x or higher (comes with Node.js)
- **Git** (to clone the repository)

### Step 1: Install Dependencies

```bash
npm install
```

This installs all required packages including React, TypeScript, TanStack Query, Zod, and shadcn/ui components.

### Step 2: Start Development Server

```bash
npm run dev
```

Opens the app at `http://localhost:5173` with Vite's Hot Module Replacement (HMR) enabled. Changes reflect instantly in the browser.

**Verify the app is running:**

- Navigate to `http://localhost:5173`
- You should see the FinFlow dashboard with transaction list, charts, and filters
- Mock data is automatically loaded into localStorage
- Try adding a transaction using the "Add Transaction" button in the header

### Step 3: Build for Production

```bash
npm run build
```

Creates an optimized production bundle in the `dist/` folder. TypeScript is checked, code is minified, and assets are optimized.

### Step 4: Preview Production Build

```bash
npm run preview
```

Serves the production build locally to verify it works before deployment.

### Step 5: Run Linting

```bash
npm run lint
```

Checks TypeScript and ESLint rules for code quality. The project enforces strict TypeScript mode with no `any` types allowed.

## Project Folder Structure

```
finflow-techcare/
├── src/
│   ├── components/
│   │   ├── ui/                          # Shadcn UI primitives (Button, Input, Select, etc.)
│   │   ├── dashboard/                   # Feature components
│   │   │   ├── TransactionTable.tsx     # Transaction list with sorting
│   │   │   ├── CategoryChart.tsx        # Donut chart for spending by category
│   │   │   ├── MonthlyComparisonChart.tsx # 6-month trend analysis
│   │   │   ├── StatusGrid.tsx           # Dashboard stats (income, balance, expenses)
│   │   │   ├── FilterAndSearchComponent.tsx # Multi-filter UI
│   │   │   ├── PaginationComponent.tsx  # Table pagination
│   │   │   └── PageSizeSelector.tsx     # Items per page dropdown
│   │   ├── Header.tsx                   # Top navigation with dark mode toggle
│   │   ├── TransactionForm.tsx          # Add/edit transaction form (React Hook Form)
│   │   ├── TransactionFormWrapper.tsx   # Drawer wrapper for form
│   │   ├── SelectComponent.tsx          # Custom select wrapper with Base UI
│   │   ├── SearchFilter.tsx             # Debounced search input
│   │   ├── Error.tsx                    # Error fallback UI with retry
│   │   └── LoadingSkeleton.tsx          # Shimmer loading state
│   │
│   ├── hooks/
│   │   ├── useTransactions.ts           # Core data hook with memoized calculations
│   │   ├── useAddTransaction.ts         # Create mutation hook with toasts
│   │   └── useDebounce.ts               # Debounce utility hook
│   │
│   ├── lib/
│   │   ├── validations/
│   │   │   └── transactions.ts          # Zod schemas for transaction validation
│   │   ├── filterUtils.ts               # Search and filter logic
│   │   ├── sortUtils.ts                 # Sorting functions (date, amount)
│   │   ├── formatters.ts                # Date and currency formatting
│   │   ├── transactionUtils.ts          # Calculations (balance, totals, aggregation)
│   │   └── utils.ts                     # General utilities
│   │
│   ├── store/
│   │   └── useFilterAndPaginationStore.ts # Zustand store for UI state
│   │
│   ├── services/
│   │   └── api.ts                       # Mock API with localStorage persistence
│   │
│   ├── data/
│   │   └── mockData.ts                  # 30 seed transactions for demo
│   │
│   ├── types/
│   │   ├── transaction.d.ts             # Transaction model types
│   │   └── api.d.ts                     # API response interface
│   │
│   ├── App.tsx                          # Main app component
│   ├── main.tsx                         # React entry point with Query provider
│   └── index.css                        # Global Tailwind styles
│
├── public/                              # Static assets
├── package.json                         # Dependencies and scripts
├── tsconfig.json                        # TypeScript strict configuration
├── vite.config.ts                       # Vite bundler config
├── eslint.config.js                     # ESLint rules
├── components.json                      # Shadcn/ui config
└── README.md                            # This file
```

### Folder Organization Philosophy

- **Separation of Concerns**: UI components, business logic (hooks), and API layer are physically separated
- **Scalability**: New features can be added to `components/` and `hooks/` without restructuring
- **Type Safety**: All domain models in `types/` ensure compile-time correctness
- **Reusability**: Utility functions in `lib/` can be imported across components
- **Testability**: Pure functions in `lib/` and custom hooks are easy to unit test
- **Performance**: Heavy calculations memoized in `hooks/` and `store/`

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

---

## State Management Strategy

### The Three-Layer Approach

FinFlow uses **three distinct state management patterns** for different concerns:

#### 1. **Server State: React Query (TanStack Query)**

**What it manages**: Transaction data fetched from the mock API

**Why React Query**:

- Handles async data fetching, caching, and invalidation automatically
- Provides loading/error/success states out of the box
- `staleTime: 5 minutes` prevents excessive refetches
- `useQuery` for reads, `useMutation` for writes
- Single source of truth for server data across all components

**Implementation**:

```typescript
// src/hooks/useTransactions.ts
const { data, isLoading, error } = useQuery({
  queryKey: ["transactions"],
  queryFn: () => apiMethods.get(),
  staleTime: 5 * 60 * 1000, // 5 minutes
});

// After adding/updating:
queryClient.invalidateQueries({ queryKey: ["transactions"] });
```

#### 2. **UI State: Zustand**

**What it manages**: Filters, sorting, pagination (user interactions)

**Why Zustand**:

- Lightweight alternative to Redux
- Minimal boilerplate compared to Context API with useReducer
- Direct method calls (no actions/reducers to wire up)
- Perfect for UI-only state that doesn't need persistence
- Less noise than Redux while keeping state centralized

**Implementation**:

```typescript
// src/store/useFilterAndPaginationStore.ts
const useFilterAndPaginationStore = create<FilterState>((set) => ({
  filters: { category: null, status: null },
  sortOrder: "date-desc",
  currentPage: 1,
  pageSize: 10,
  setFilters: (filters) => set({ filters }),
  // ... more methods
}));
```

#### 3. **Form State: React Hook Form + Local useState**

**What it manages**: Form field values, validation errors, submission state

**Why React Hook Form**:

- Minimal re-renders (controlled by validation, not every keystroke)
- Schema-first validation with Zod for type safety
- Easy integration with uncontrolled components
- Built-in error handling and display

**Implementation**:

```typescript
const form = useForm<TransactionFormValues>({
  resolver: zodResolver(transactionSchema),
  mode: "onChange",
});
```

### Rationale

| Concern             | Tool                  | Reason                                                |
| ------------------- | --------------------- | ----------------------------------------------------- |
| **Server data**     | React Query           | Specialized for async/caching/invalidation            |
| **UI interactions** | Zustand               | Lightweight, simple, perfect for non-persistent state |
| **Forms**           | React Hook Form + Zod | Optimized for performance, schema-driven validation   |

This separation means:

- ✅ Components don't over-fetch data
- ✅ Filters/pagination don't cause re-fetches unnecessarily
- ✅ Form validation is type-safe and DRY
- ✅ Easy to test each concern independently

---

## Trade-offs and Shortcuts (Time Constraints)

### 1. **No Edit/Delete Transaction UI** ⏱️

**Decision**: Add transaction feature is fully implemented; edit/delete are not exposed in the UI.

**Rationale**:

- Add transaction flow is the critical path for MVP
- Edit/delete require confirmation dialogs and additional UX polish
- API endpoints exist (`PUT`, `DELETE`), but UI integration was deprioritized
- Estimated effort: 3-4 hours additional development

**To enable**: See [Future Improvements](#future-improvements) section.

### 2. **Mock API Without WebSocket or Real-time Updates** ⏱️

**Decision**: Mocked with localStorage; no server-sent events or polls.

**Rationale**:

- Real-time sync adds complexity without MVP value
- localStorage is sufficient for single-user demo
- React Query invalidation simulates fresh data on mutations
- Production would replace `services/api.ts` with actual backend

**Impact**: Multiple browser tabs won't auto-sync transactions.

### 3. **No Transaction Categories Icons** 🎨

**Decision**: Text-only category display with color badges.

**Rationale**:

- Icon library would add bundle bloat (~50kb)
- Text + badge colors are sufficient for category identification
- Lucide React icons are already included; could be added later without breaking changes

### 4. **No Recurring Transactions** ⏱️

**Decision**: All transactions are one-time entries.

**Rationale**:

- MVP requires tracking existing transactions, not scheduling future ones
- Recurring logic requires date math, cron-like storage, and UI complexity
- Could add via separate feature flag in future

### 5. **No Budget Limits or Alerts** ⏱️

**Decision**: Dashboard shows actuals only, no threshold warnings.

**Rationale**:

- Requires persistent user settings storage (new schema)
- Notification system adds complexity
- Dashboard already shows spending breakdown; users can interpret manually

### 6. **Pagination Over Virtual Scrolling** 📦

**Decision**: Server-side pagination (5/10/25/50 items per page).

**Rationale**:

- Virtual scrolling libraries add complexity and bundle size
- Pagination is simpler to implement and understand
- With 30 seed transactions, performance is not a concern
- Scales fine up to hundreds of transactions

### 7. **No CSV Export** ⏱️

**Rationale**:

- Adds little user value for a 48-hour assessment
- Could implement via `papaparse` library in 30 minutes if needed

### 8. **Tailwind Default Theme Only (Light + Dark Mode Built-in)** 🎨

**Decision**: No custom color palette/theme customization.

**Rationale**:

- Tailwind + next-themes provide light/dark out of box
- Custom themes would require shadow DOM or CSS-in-JS
- Time spent on theming better spent on features

**What we kept**: Professional color scheme with good contrast (Tailwind defaults).

---

## Future Improvements & Extensions

### High Priority (Core Features)

1. **Implement Edit/Delete Transaction UI** (3-4 hours)
   - Create `useUpdateTransaction` mutation hook
   - Add edit button to transaction table rows
   - Add delete button with confirmation dialog
   - Integrate with API endpoints (already exist)
   - Test edit/delete flows end-to-end

2. **Add Real-time Sync Between Tabs** (2 hours)
   - Use `localStorage` event listener to broadcast changes
   - Update Query cache when another tab modifies data
   - Emit toast notification when data changes externally

3. **Implement Recurring Transactions** (4-5 hours)
   - Add "Recurring" toggle to form
   - Store recurrence pattern (weekly, monthly, yearly)
   - Auto-generate future transactions via background job or on-load computation
   - Add recurring transaction management UI

### Medium Priority (UX Enhancements)

4. **Add Transaction Category Icons** (1 hour)
   - Import icons from Lucide by category name
   - Update `StatusBadge` component to show icon + text
   - Improve visual scanability

5. **Implement Budget Limits & Alerts** (3-4 hours)
   - Add settings modal for per-category budget caps
   - Store budgets in localStorage user preferences
   - Add warning in dashboard when spending exceeds threshold
   - Notify via toast when budget exceeded

6. **CSV/PDF Export** (2 hours)
   - Add export button to transaction table
   - Use `papaparse` for CSV generation
   - Alternatively use `pdfkit` for PDF with formatting

7. **Search by Amount Range** (1 hour)
   - Add min/max amount filter inputs
   - Integrate with existing filter store
   - Display results matching range

8. **Custom Date Range Picker** (2 hours)
   - Replace preset "last 6 months" with date picker
   - Show trends for any custom range
   - Add "Compare periods" feature (this month vs last month)

### Low Priority (Polish & Analytics)

9. **Analytics/Insights Tab** (4-5 hours)
   - Add new dashboard section with statistics
   - Show average transaction, top spending day, category breakdown pie
   - Show weekly/monthly trends
   - Add insights like "You spent 20% more on food vs last month"

10. **Transaction Notes/Comments** (2 hours)
    - Add optional notes field to transaction form
    - Display notes in transaction details modal
    - Search/filter by notes content

11. **Error Boundary Component** (1 hour)
    - Catch React component errors
    - Display fallback UI with reset button
    - Log errors for debugging

12. **Performance Profiling & Optimization** (2 hours)
    - Use React DevTools Profiler to identify slow renders
    - Add `useCallback` to event handlers if needed
    - Virtualize transaction list if 1000+ items
    - Lazy-load chart components

13. **End-to-End Testing** (4-6 hours)
    - Add Cypress or Playwright test suite
    - Test user flows: add transaction → filter → sort → paginate
    - Test validation error messages
    - Test dark mode toggle

14. **Storybook for UI Components** (3 hours)
    - Document all reusable components
    - Create interactive component playground
    - Helps other developers understand component API

### Backend Integration (When Moving to Production)

15. **Replace Mock API with Real Backend** (6-8 hours)
    - Update `services/api.ts` to call actual REST/GraphQL endpoints
    - Add authentication (JWT tokens)
    - Add request retry logic with exponential backoff
    - Update error handling for server errors
    - Add request/response logging

16. **Add Server-Side Pagination** (2 hours)
    - Update API calls to use `limit/offset` or cursor pagination
    - Sync with UI pagination store
    - Reduce payload size

### Deployment & DevOps

17. **GitHub Actions CI/CD Pipeline** (2 hours)
    - Auto-run lint on push
    - Auto-build production bundle
    - Deploy to Vercel or Netlify

18. **Sentry Error Tracking** (1 hour)
    - Add Sentry SDK
    - Log production errors
    - Get alerts on new errors

---

## Implementation Quality Metrics

| Metric                  | Status        | Details                                                    |
| ----------------------- | ------------- | ---------------------------------------------------------- |
| **TypeScript Coverage** | ✅ 100%       | Zero `any` types; strict mode enabled                      |
| **Console Logs**        | ✅ 0          | All debug logs removed from final code                     |
| **Component Size**      | ✅ <200 lines | Largest component is ~200 lines (TransactionTable)         |
| **Memoization**         | ✅ 6 useMemo  | Strategic memoization in useTransactions hook              |
| **Test Coverage**       | ⚠️ 0%         | Manual testing only; no unit/integration tests yet         |
| **Bundle Size**         | ?             | Run `npm run build` to check; Vite optimizes automatically |
| **Accessibility**       | ✅ Good       | Semantic HTML, ARIA labels, keyboard navigation            |
| **Responsive Design**   | ✅ Yes        | Mobile (80vw) → Desktop (50vw) drawer sizing               |

---

## Key Takeaways

### What Went Well ✅

1. **Architecture Decisions**: Clean separation of concerns (UI ↔ Hooks ↔ Services ↔ Types)
2. **Type Safety**: Zod schemas + TypeScript strict mode caught errors early
3. **Performance**: Strategic memoization prevents unnecessary re-renders
4. **User Experience**: Professional UI with dark mode, loading states, error recovery
5. **Maintainability**: Modular components and hooks make code easy to extend

### Lessons Learned 📚

1. **React Query is Worth It**: Handles so much complexity with minimal boilerplate
2. **Zustand > Redux for Small Apps**: Much less ceremony, easier to understand
3. **Zod is Great**: Schema-first validation + TypeScript inference is powerful
4. **Mock Data Matters**: Having realistic seed data helped validate UI early
5. **Separate UI State from Server State**: Prevents subtle bugs and confusion

---

_Last Updated: March 29, 2026_  
_Built with ❤️ for TechCare Inc. Technical Assessment_
