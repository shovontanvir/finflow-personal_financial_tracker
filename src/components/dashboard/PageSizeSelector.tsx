import { useFilterAndPaginationStore } from "@/store/useFilterAndPaginationStore";
import { SelectComponent } from "@/components/SelectComponent";

const PAGINATIONOPTIONS = [
  {
    value: 5,
    label: "5",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 25,
    label: "25",
  },
  {
    value: 50,
    label: "50",
  },
];

const PageSizeSelector = () => {
  const { pageSize, setPageSize } = useFilterAndPaginationStore();

  return (
    <div className="flex items-center gap-2">
      <SelectComponent
        placeholder={pageSize}
        options={PAGINATIONOPTIONS}
        classNames="w-auto"
        onValueChange={(value) => setPageSize(Number(value))}
      />

      <h3 className="text-xs font-medium text-muted-foreground">Per Page</h3>
    </div>
  );
};

export default PageSizeSelector;
