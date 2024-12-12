"use client";

import { ICarType } from "@/app/types";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { FC, useState } from "react";
import filterList from "./constants";

interface FiltersContainerProps {
  filters: Record<string, Record<string, number>>;
  selectedFilters?: Partial<ICarType>;
  onApplyFilters: (filters: Partial<ICarType>) => void;
}

export const FiltersContainer: FC<FiltersContainerProps> = ({
  filters,
  onApplyFilters,
  selectedFilters,
}) => {
  const handleFilterChange = (
    key: keyof ICarType,
    value: string | number | undefined
  ) => {
    const updatedFilters = {
      ...selectedFilters,
      [key]: value,
    };
    onApplyFilters(updatedFilters);
  };

  return (
    <div>
      <Accordion>
        {filterList.map((filter, i) => (
          <AccordionItem
            className="text-sm font-semibold"
            key={i}
            title={filter.title}
          >
            <div className="flex flex-col">
              {filters[filter.id] &&
                Object.entries(filters[filter.id]).map(([value, count]) => (
                  <Button
                    key={value}
                    className="w-fit bg-transparent text-start font-semibold text-xs"
                    onPress={() =>
                      handleFilterChange(filter.id as keyof ICarType, value)
                    }
                  >
                    {value}{" "}
                    <span className="font-normal text-black/50">({count})</span>
                  </Button>
                ))}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FiltersContainer;
