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
  onValueChange?: (value: string | number | null) => void;
  value?: string | number | null;
}) {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger className={cn("w-full", classNames)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
