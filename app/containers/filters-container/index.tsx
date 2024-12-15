"use client";

import { ICarType, IFilterType } from "@/app/types";
import { FC, useState, useEffect } from "react";
import { fetchAvailableFilters, IFiltersResponse } from "@/app/services";
import { Accordion } from "@/app/components";

interface FiltersContainerProps {
  filters: Record<string, Record<string, number>>;
  selectedFilters?: Partial<ICarType>;
  allCars?: ICarType[];
  onApplyFilters: (filters: Partial<ICarType>) => void;
}

export const FiltersContainer: FC<FiltersContainerProps> = ({
  onApplyFilters,
  selectedFilters,
  allCars,
}) => {
  const [filterList, setFilterList] = useState<IFiltersResponse | undefined>(undefined);
  const [filteredCars, setFilteredCars] = useState<ICarType[] | undefined>(allCars);

  useEffect(() => {
    const fetchFilters = async () => {
      const filters = await fetchAvailableFilters();
      setFilterList(filters);
    };

    fetchFilters();
  }, []);

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
      [key]: key === "year" ? Number(value) : value,
    };
    onApplyFilters(updatedFilters);
  };

  return (
    <div>
      {filterList ? (
        <>
          {Object.entries(filterList).map(([filterKey, filterValues]) => (
            <Accordion title={filterKey} key={filterKey}>
              <div className="flex flex-col">
                {filterValues.map((filter: IFilterType) => {
                  const filteredCount = filteredCars?.filter(
                    (car) => car[filterKey as keyof ICarType] === filter.id
                  ).length;

                  return (
                    <button
                      key={filter.id}
                      className={`w-fit bg-transparent text-start font-semibold text-xs py-2 px-4 ${filteredCount === 0 ? 'text-gray-800/30' : 'text-gray-800'}`}
                      onClick={() =>
                        handleFilterChange(filterKey as keyof ICarType, filter.id)
                      }
                      disabled={filteredCount === 0}
                    >
                      {filter.name}{" "}
                      <span
                        className={`${
                          filteredCount && filteredCount > 0
                            ? "font-normal text-black/50"
                            : "opacity-0"
                        }`}
                      >
                        ({filteredCount})
                      </span>
                    </button>
                  );
                })}
              </div>
            </Accordion>
          ))}
        </>
      ) : (
        <div className="grid place-items-center h-full">
          <p>Loading filters...</p>
        </div>
      )}
    </div>
  );
};

export default FiltersContainer;
