import { create } from "zustand";

interface FilterAndPaginationState {
  page: number;
  pageSize: number;
  isPaginated: boolean; // Optional, can be derived from total count and pageSize
  lastPage: number; // Optional, can be calculated from total count and pageSize

  sortBy?: "date" | "amount"; // e.g., "date" or "amount"
  sortOrder?: "asc" | "desc"; // e.g., "asc" or "desc"
  // Actions
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  resetPagination: () => void;
  setIsPaginated: (isPaginated: boolean) => void;
  setLastPage: (lastPage: number) => void;
  setSortBy: (sortBy: "date" | "amount") => void;
  setSortOrder: (sortOrder: "asc" | "desc") => void;
  toggleSort: () => void; // Action to toggle sorting
}

export const useFilterAndPaginationStore = create<FilterAndPaginationState>(
  (set) => ({
    // Initial State
    page: 1,
    pageSize: 5, // You can set this to 5 if you want to see pagination work with less data
    isPaginated: false,
    lastPage: 1,
    sortBy: "date",
    sortOrder: "desc",

    // Set specific page
    setPage: (page) => set({ page }),

    // Change items per page (e.g., if you add a 'Rows per page' dropdown)
    setPageSize: (pageSize) => set({ pageSize, page: 1 }),
    setLastPage: (lastPage) => set({ lastPage }),

    // set isPaginated based on total count and pageSize (can be called after fetching total count)
    setIsPaginated: (isPaginated) => set({ isPaginated }),

    // Helper to jump back to start
    resetPagination: () => set({ page: 1 }),
    setSortBy: (sortBy) => set({ sortBy }),
    setSortOrder: (sortOrder) => set({ sortOrder }),
    toggleSort: () => {
      set((state) => ({
        sortOrder: state.sortOrder === "asc" ? "desc" : "asc",
      }));
    },
  }),
);
