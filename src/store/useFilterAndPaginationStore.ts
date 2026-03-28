import { create } from "zustand";

interface FilterAndPaginationState {
  page: number;
  pageSize: number;
  isPaginated: boolean; // Optional, can be derived from total count and pageSize
  lastPage: number; // Optional, can be calculated from total count and pageSize

  sortBy: "date" | "amount"; // e.g., "date" or "amount"
  sortOrder: "asc" | "desc"; // e.g., "asc" or "desc"

  searchString: string; // For filtering transactions by description or other text fields
  filterCategory: string; // For filtering by category (if needed)
  filterStatus: string; // For filtering by status (if needed)
  // Actions
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  resetPagination: () => void;
  setIsPaginated: (isPaginated: boolean) => void;
  setLastPage: (lastPage: number) => void;
  setSortBy: (sortBy: "date" | "amount") => void;
  setSortOrder: (sortOrder: "asc" | "desc") => void;
  toggleSort: () => void; // Action to toggle sorting
  setSearchString: (searchString: string) => void;
  setFilterCategory: (category: string) => void;
  setFilterStatus: (status: string) => void;
}

export const useFilterAndPaginationStore = create<FilterAndPaginationState>(
  (set) => ({
    // Initial State
    page: 1,
    pageSize: 10, // You can set this to 5 if you want to see pagination work with less data
    isPaginated: false,
    lastPage: 1,
    sortBy: "date",
    sortOrder: "desc",
    searchString: "",
    filterCategory: "",
    filterStatus: "",

    // Set specific page
    setPage: (page) => set({ page }),

    // Change items per page (e.g., if you add a 'Rows per page' dropdown)
    setPageSize: (pageSize) => set({ pageSize, page: 1 }),
    setLastPage: (lastPage) => set({ lastPage }),

    // set isPaginated based on total count and pageSize (can be called after fetching total count)
    setIsPaginated: (isPaginated) => set({ isPaginated }),

    // Helper to jump back to start
    resetPagination: () => set({ page: 1 }),

    // Sorting actions
    setSortBy: (sortBy) => set({ sortBy }),
    setSortOrder: (sortOrder) => set({ sortOrder }),
    toggleSort: () => {
      set((state) => ({
        sortOrder: state.sortOrder === "asc" ? "desc" : "asc",
      }));
    },

    // Filtering actions
    setSearchString: (searchString) => set({ searchString }),
    setFilterCategory: (filterCategory) => set({ filterCategory }),
    setFilterStatus: (filterStatus) => set({ filterStatus }),
  }),
);
