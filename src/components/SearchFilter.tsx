import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useFilterAndPaginationStore } from "@/store/useFilterAndPaginationStore";
import { useEffect, useState } from "react";

export const SearchFilter = () => {
  const { setSearchString, searchString } = useFilterAndPaginationStore();

  const [localSearchString, setLocalSearchString] = useState(
    searchString || "",
  );
  const DEBOUNCE_DELAY = 500; // milliseconds

  const debouncedSearchString = useDebounce(localSearchString, DEBOUNCE_DELAY);

  useEffect(() => {
    setSearchString(debouncedSearchString);
  }, [debouncedSearchString, setSearchString]);

  useEffect(() => {
    setLocalSearchString(searchString);
  }, [searchString]);

  return (
    <Input
      placeholder="Search by Description"
      value={localSearchString}
      onChange={(e) => setLocalSearchString(e.target.value)}
      className="text-sm placeholder:text-muted-foreground"
    />
  );
};
