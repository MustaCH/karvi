"use client";

import { CarCard, FilterChips, FilterDrawer } from "@/app/components";
import { ICarType } from "@/app/types";
import { FC, useEffect, useState } from "react";
import { Button, Divider, Pagination, useDisclosure } from "@nextui-org/react";
import { fetchCarData, fetchFilteredCarData } from "@/app/services";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import FiltersContainer from "../filters-container";
import { FilterIcon } from "@/app/icons";
import { IoSearchOutline } from "react-icons/io5";
import { GridControlers } from "@/app/components/grid-controllers";

const PAGE_SIZE = 12;

const CarCardContainer: FC = () => {
  const [cars, setCars] = useState<ICarType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [gridMode, setGridMode] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [filters, setFilters] = useState<
    Record<string, Record<string, number>>
  >({});
  const [selectedFilters, setSelectedFilters] = useState<Partial<ICarType>>({});
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  useEffect(() => {
    const handleResize = () => {
      setGridMode(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (Object.keys(selectedFilters).length > 0) {
          const { cars: filteredCars, totalCount } = await fetchFilteredCarData(
            selectedFilters,
            1,
            PAGE_SIZE
          );
          const sortedCars = filteredCars.sort((a, b) =>
            sortOrder === "desc" ? b.price - a.price : a.price - b.price
          );
          setCars(sortedCars);
          setTotalCount(totalCount);
          setPage(1);
        } else {
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
        }
      } catch (error) {
        console.error("Error al cambiar el orden de los datos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [sortOrder, selectedFilters]);

  const handleApplyFilters = async (newFilters: Partial<ICarType>) => {
    setLoading(true);
    try {
      const { cars: filteredCars, totalCount } = await fetchFilteredCarData(
        newFilters,
        page,
        PAGE_SIZE
      );
      setCars(filteredCars);
      setTotalCount(totalCount);
      setSelectedFilters(newFilters);
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
        <Button
          className="text-[#566DED] font-semibold"
          variant="light"
          onPress={onOpen}
          startContent={<IoSearchOutline />}
        >
          Buscar
        </Button>
        <Divider orientation="vertical" />
        <Button
          className="text-[#566DED] font-semibold"
          variant="light"
          onPress={onOpen}
          startContent={<FilterIcon />}
        >
          Filtrar
        </Button>
        <FilterDrawer
          isOpen={isOpen}
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
        <div
          className={`${
            gridMode
              ? "grid grid-cols-2 md:grid-cols-3 gap-4 place-items-center"
              : "flex flex-col"
          } p-4`}
        >
          {cars.map((car) => (
            <CarCard key={car.id} car={car} gridMode={gridMode} />
          ))}
        </div>
        <div className="flex justify-between mt-4 px-4 pb-4 border-t-1 border-gray-300">
          <Button
            className="text-gray-800/90 bg-transparent"
            disabled={page === 1}
            onPress={() => setPage(page - 1)}
            startContent={<FaArrowLeft />}
          >
            Anterior
          </Button>
          <Pagination
            classNames={{
              wrapper: "gap-0 overflow-visible h-8",
              item: "w-8 h-8 text-small bg-transparent shadow-none rounded-none",
              cursor:
                "text-small text-blue-500 bg-transparent rounded-none font-bold border-t-2 border-primary",
            }}
            total={Math.ceil(totalCount / PAGE_SIZE)}
            initialPage={1}
            page={page}
            onChange={setPage}
          />
          <Button
            className="text-gray-800/90 bg-transparent"
            disabled={page === Math.ceil(totalCount / PAGE_SIZE)}
            onPress={() => setPage(page + 1)}
            endContent={<FaArrowRight />}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarCardContainer;
