import { Drawer, DrawerContent } from "@nextui-org/react";
import { FC } from "react";
import FilterChips from "../filter-chips";
import { FiltersContainer } from "@/app/containers";
import { ICarType } from "@/app/types";

interface FilterDrawerProps {
  isOpen: boolean;
  cars: ICarType[];
  onOpenChange: () => void;
  selectedFilters: Partial<ICarType>;
  filters: Record<string, Record<string, number>>;
  handleRemoveFilter: (key: keyof ICarType) => void;
  handleClearFilters: () => void;
  handleApplyFilters: (newFilters: Partial<ICarType>) => void;
}

export const FilterDrawer: FC<FilterDrawerProps> = ({
  isOpen,
  onOpenChange,
  selectedFilters,
  filters,
  cars,
  handleRemoveFilter,
  handleClearFilters,
  handleApplyFilters,
}) => {
  return (
    <Drawer isOpen={isOpen} size="xs" onOpenChange={onOpenChange}>
      <DrawerContent className="flex flex-col gap-0 py-8">
        <FilterChips
          selectedFilters={selectedFilters}
          onRemoveFilter={handleRemoveFilter}
          onClearFilters={handleClearFilters}
        />
        <FiltersContainer
          filters={filters}
          allCars={cars}
          onApplyFilters={handleApplyFilters}
          selectedFilters={selectedFilters}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default FilterDrawer;
