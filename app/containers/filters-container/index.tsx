"use client";

import { ICarType } from "@/app/types";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { FC, useState, useEffect } from "react";
import filterList from "./constants";

interface FiltersContainerProps {
  filters: Record<string, Record<string, number>>;
  selectedFilters?: Partial<ICarType>;
  allCars?: ICarType[];
  onApplyFilters: (filters: Partial<ICarType>) => void;
}

export const FiltersContainer: FC<FiltersContainerProps> = ({
  filters,
  onApplyFilters,
  selectedFilters,
  allCars,
}) => {
  const [filteredCars, setFilteredCars] = useState<ICarType[] | undefined>(
    allCars
  );

  const applyFilters = (filters: Partial<ICarType>) => {
    let filtered = allCars;

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (key === "year") {
          filtered = filtered?.filter(
            (car) => car[key as keyof ICarType] === Number(value)
          );
        } else {
          filtered = filtered?.filter(
            (car) => car[key as keyof ICarType] === value
          );
        }
      }
    });

    setFilteredCars(filtered);
  };

  useEffect(() => {
    if (selectedFilters) {
      applyFilters(selectedFilters);
    }
  }, [selectedFilters, allCars]);

  const handleFilterChange = (
    key: keyof ICarType,
    value: string | number | undefined
  ) => {
    const updatedFilters = {
      ...selectedFilters,
      [key]: key === "year" ? Number(value) : value, // Convertimos el año a número
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
                Object.entries(filters[filter.id]).map(([value]) => {
                  const filteredCount = filteredCars?.filter(
                    (car) => car[filter.id as keyof ICarType] === value
                  ).length;

                  return (
                    <Button
                      key={value}
                      className="w-fit bg-transparent text-start font-semibold text-xs"
                      onPress={() =>
                        handleFilterChange(filter.id as keyof ICarType, value)
                      }
                      isDisabled={filteredCount === 0}
                    >
                      {value}{" "}
                      <span
                        className={`${
                          filteredCount && filteredCount > 0
                            ? "font-normal text-black/50"
                            : "opacity-0"
                        }`}
                      >
                        ({filteredCount})
                      </span>
                    </Button>
                  );
                })}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FiltersContainer;
