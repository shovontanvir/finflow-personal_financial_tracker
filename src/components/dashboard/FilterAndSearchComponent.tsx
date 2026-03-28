import { useFilterAndPaginationStore } from "@/store/useFilterAndPaginationStore";
import { SearchFilter } from "../SearchFilter";
import { SelectComponent } from "../SelectComponent";
import { Button } from "../ui/button";

const FilterAndSearchComponent = () => {
  const {
    filterCategory,
    filterStatus,
    setFilterCategory,
    setFilterStatus,
    setSearchString,
    resetPagination,
  } = useFilterAndPaginationStore();

  const categoryOptions = [
    { value: "Food", label: "Food" },
    { value: "Transport", label: "Transport" },
    { value: "Utilities", label: "Utilities" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Health", label: "Health" },
    { value: "Shopping", label: "Shopping" },
    { value: "Income", label: "Income" },
    { value: "Other", label: "Other" },
  ];

  const statusOptions = [
    { value: "completed", label: "Completed" },
    { value: "pending", label: "Pending" },
    { value: "failed", label: "Failed" },
  ];

  const clearFilters = () => {
    setFilterCategory("");
    setFilterStatus("");
    setSearchString("");
    resetPagination();
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-2">
      {/* search by description */}
      <SearchFilter />

      {/* filters by category */}
      <SelectComponent
        placeholder="Filter by Category"
        options={categoryOptions}
        value={filterCategory}
        classNames="w-full md:w-auto"
        onValueChange={(value) => {
          setFilterCategory(value as string);
          resetPagination();
        }}
      />

      {/* filters by status */}
      <SelectComponent
        placeholder="Filter by Status"
        options={statusOptions}
        value={filterStatus}
        classNames="w-full md:w-auto"
        onValueChange={(value) => {
          setFilterStatus(value as string);
          resetPagination();
        }}
      />

      {/* clear filters */}
      <Button
        variant="destructive"
        onClick={clearFilters}
        className="w-full md:w-auto text-xs"
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default FilterAndSearchComponent;
