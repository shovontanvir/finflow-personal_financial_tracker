import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function SelectComponent({
  placeholder,
  options,
  classNames,
  onValueChange,
}: {
  placeholder?: string | number;
  options: { value: string | number; label: string }[];
  classNames?: string;
  onValueChange?: (value: string | number | null) => void;
}) {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className={cn("w-full max-w-48", classNames)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
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
