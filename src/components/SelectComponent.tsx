import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function SelectComponent({
  placeholder,
  options,
  classNames,
  value,
  onValueChange,
}: {
  placeholder?: string | number;
  options: { value: string | number; label: string }[];
  classNames?: string;
  onValueChange?: (value: string | null) => void;
  value?: string | number | null;
}) {
  // Get the label for the selected value
  const displayLabel = value
    ? options.find((option) => String(option.value) === String(value))?.label
    : undefined;

  return (
    <Select
      value={value == null ? undefined : String(value)}
      onValueChange={(v) => onValueChange?.(v)}
    >
      <SelectTrigger className={cn("w-full", classNames)}>
        <SelectValue placeholder={placeholder}>{displayLabel}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={String(option.value)} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
