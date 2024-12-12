import { Button, Chip } from "@nextui-org/react";
import { ICarType } from "@/app/types";
import { FC } from "react";
import { HiOutlineTrash } from "react-icons/hi";

interface FilterChipsProps {
  selectedFilters: Partial<ICarType>;
  onRemoveFilter: (key: keyof ICarType) => void;
  onClearFilters: () => void;
}

export const FilterChips: FC<FilterChipsProps> = ({
  selectedFilters,
  onRemoveFilter,
  onClearFilters,
}) => {
  return (
    <div className="flex flex-col gap-8 md:flex-row justify-between w-full px-4">
      <div className="flex gap-2 mt-2">
        {Object.entries(selectedFilters).map(([key, value]) => (
          <Chip
            variant="bordered"
            color="primary"
            key={key}
            onClose={() => onRemoveFilter(key as keyof ICarType)}
          >
            {value}
          </Chip>
        ))}
      </div>
      {Object.entries(selectedFilters).length > 0 && (
        <div>
          <Button
            onPress={onClearFilters}
            className="text-md w-full md:w-fit"
            color="primary"
            variant="light"
            startContent={<HiOutlineTrash />}
          >
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterChips;
