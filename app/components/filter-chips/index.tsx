import { Chip } from "@nextui-org/react";
import { ICarType } from "@/app/types";
import { FC } from "react";

interface FilterChipsProps {
  selectedFilters: Partial<ICarType>;
  onRemoveFilter: (key: keyof ICarType) => void;
}

export const FilterChips: FC<FilterChipsProps> = ({ selectedFilters, onRemoveFilter }) => {
  return (
    <div className="flex gap-2 mt-2">
      {Object.entries(selectedFilters).map(([key, value]) => (
        <Chip variant="bordered" color="primary" key={key} onClose={() => onRemoveFilter(key as keyof ICarType)}>
          {value}
        </Chip>
      ))}
    </div>
  );
};

export default FilterChips;
