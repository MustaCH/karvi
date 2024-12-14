"use client";

import { FilterChips, FilterDrawer, MobileControlers, NoResultsCard } from "@/app/components";
import { ICarType } from "@/app/types";
import { FC, useEffect, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import { fetchCarData, fetchFilteredCarData } from "@/app/services";
import FiltersContainer from "../filters-container";
import { GridControlers } from "@/app/components/grid-controllers";
import CarCardContainer from "../car-card-container";
import PaginationContainer from "../pagination-container";
import { useMediaQuery } from "react-responsive";

const PAGE_SIZE = 12;

const MarketplaceContainer: FC = () => {
  const [cars, setCars] = useState<ICarType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const isWideScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const [gridMode, setGridMode] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [filters, setFilters] = useState<
    Record<string, Record<string, number>>
  >({});
  const [selectedFilters, setSelectedFilters] = useState<Partial<ICarType>>({});
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  useEffect(() => {
    setGridMode(isWideScreen);
  }, [isWideScreen]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (Object.keys(selectedFilters).length > 0) {
          const { cars: filteredCars } = await fetchFilteredCarData(
            selectedFilters,
            page, 
            PAGE_SIZE
          );
          const sortedCars = filteredCars.sort((a, b) =>
            sortOrder === "desc" ? b.price - a.price : a.price - b.price
          );
          setCars(sortedCars);
          setTotalCount(totalCount);
        } else {
          const {
            cars: carData,
            totalCount,
            filters,
          } = await fetchCarData(page, PAGE_SIZE);
          const sortedCars = carData.sort((a, b) =>
            sortOrder === "desc" ? b.price - a.price : a.price - b.price
          );
          setCars(sortedCars);
          setTotalCount(totalCount);
          setFilters(filters);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, sortOrder, selectedFilters]);
  

  const handleApplyFilters = async (newFilters: Partial<ICarType>) => {
    setLoading(true);
    try {
      const { cars: filteredCars, totalCount } = await fetchFilteredCarData(
        newFilters,
        1, 
        PAGE_SIZE
      );
      setCars(filteredCars);
      setTotalCount(totalCount);
      setSelectedFilters(newFilters);
      setPage(1); 
      onClose();
    } catch (error) {
      console.error("Error al aplicar filtros:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleRemoveFilter = async (key: keyof ICarType) => {
    const updatedFilters = { ...selectedFilters };
    delete updatedFilters[key];
    setSelectedFilters(updatedFilters);

    if (Object.keys(updatedFilters).length === 0) {
      setLoading(true);
      onClose();
      try {
        const {
          cars: carData,
          totalCount,
          filters,
        } = await fetchCarData(1, PAGE_SIZE);
        const sortedCars = carData.sort((a, b) =>
          sortOrder === "desc" ? b.price - a.price : a.price - b.price
        );
        setCars(sortedCars);
        setTotalCount(totalCount);
        setFilters(filters);
        setPage(1);
      } catch (error) {
        console.error("Error al limpiar los filtros:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
      try {
        const { cars: filteredCars, totalCount } = await fetchFilteredCarData(
          updatedFilters,
          1,
          PAGE_SIZE
        );
        const sortedCars = filteredCars.sort((a, b) =>
          sortOrder === "desc" ? b.price - a.price : a.price - b.price
        );
        setCars(sortedCars);
        setTotalCount(totalCount);
        setPage(1);
      } catch (error) {
        console.error("Error al eliminar el filtro:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClearFilters = async () => {
    setSelectedFilters({});
    setLoading(true);
    try {
      const {
        cars: carData,
        totalCount,
        filters,
      } = await fetchCarData(1, PAGE_SIZE);
      const sortedCars = carData.sort((a, b) =>
        sortOrder === "desc" ? b.price - a.price : a.price - b.price
      );
      setCars(sortedCars);
      setTotalCount(totalCount);
      setFilters(filters);
      setPage(1);
      onClose();
    } catch (error) {
      console.error("Error al limpiar los filtros:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (newPage: number) => {
    setLoading(true);
    try {
      const { cars: newCars } = await fetchCarData(newPage, PAGE_SIZE);
      if (newCars.length > 0) {
        setCars(newCars);
        setPage(newPage);
      } else {
        console.warn("No hay contenido en esta página.");
      }
    } catch (error) {
      console.error("Error al cambiar de página:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col lg:grid grid-cols-5 pt-8">
      <div className="hidden lg:inline mt-4">
        <FiltersContainer
          allCars={cars}
          filters={filters}
          onApplyFilters={handleApplyFilters}
          selectedFilters={selectedFilters}
        />
      </div>
      <div className="lg:hidden flex justify-evenly items-center">
        <MobileControlers onOpen={onOpen} />
        <FilterDrawer
          isOpen={isOpen}
          cars={cars}
          onOpenChange={onOpenChange}
          selectedFilters={selectedFilters}
          filters={filters}
          handleApplyFilters={handleApplyFilters}
          handleClearFilters={handleClearFilters}
          handleRemoveFilter={handleRemoveFilter}
        />
      </div>
      <div className="col-span-4">
        <div className="hidden lg:flex h-18">
          <FilterChips
            selectedFilters={selectedFilters}
            onRemoveFilter={handleRemoveFilter}
            onClearFilters={handleClearFilters}
          />
        </div>
        <GridControlers
          totalCount={totalCount}
          gridMode={gridMode}
          sortOrder={sortOrder}
          onPressMode={() => setGridMode(!gridMode)}
          onPressSort={() =>
            setSortOrder(sortOrder === "desc" ? "asc" : "desc")
          }
        />
        <CarCardContainer gridMode={gridMode} loading={loading} cars={cars} />
        <PaginationContainer
          page={page}
          totalCount={totalCount}
          pageSize={PAGE_SIZE}
          onPressPrev={() => setPage((prev) => Math.max(prev - 1, 1))}
          onPressAfter={() => setPage((prev) => prev + 1)}
          onChangePage={handlePageChange}
        />
      </div>
    </div>
  );
};

export default MarketplaceContainer;
