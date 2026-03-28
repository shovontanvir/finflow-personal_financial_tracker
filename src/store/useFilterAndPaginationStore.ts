import { create } from "zustand";

interface FilterAndPaginationState {
  page: number;
  pageSize: number;
  isPaginated: boolean; // Optional, can be derived from total count and pageSize
  lastPage: number; // Optional, can be calculated from total count and pageSize
  // Actions
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  resetPagination: () => void;
  setIsPaginated: (isPaginated: boolean) => void;
  setLastPage: (lastPage: number) => void;
}

export const useFilterAndPaginationStore = create<FilterAndPaginationState>(
  (set) => ({
    // Initial State
    page: 1,
    pageSize: 5, // You can set this to 5 if you want to see pagination work with less data
    isPaginated: false,
    lastPage: 1,

    // Set specific page
    setPage: (page) => set({ page }),

    // Change items per page (e.g., if you add a 'Rows per page' dropdown)
    setPageSize: (pageSize) => set({ pageSize, page: 1 }),
    setLastPage: (lastPage) => set({ lastPage }),

    // set isPaginated based on total count and pageSize (can be called after fetching total count)
    setIsPaginated: (isPaginated) => set({ isPaginated }),

    // Helper to jump back to start
    resetPagination: () => set({ page: 1 }),
  }),
);
