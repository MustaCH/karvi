'use client'

import { CarCard, FilterChips } from "@/app/components";
import { ICarType } from "@/app/types";
import { BsGrid, BsListUl } from "react-icons/bs";
import { FC, useEffect, useState } from "react";
import { Button, Pagination } from "@nextui-org/react";
import { fetchCarData, fetchFilteredCarData } from "@/app/services";
import { NumberFormatter } from "@/app/utils";
import { TbArrowsSort } from "react-icons/tb";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import FiltersContainer from "../filters-container";

const PAGE_SIZE = 12;

const CarCardContainer: FC = () => {
    const [cars, setCars] = useState<ICarType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [gridMode, setGridMode] = useState<boolean>(false);
    const [sortOrder, setSortOrder] = useState<string>('desc');
    const [filters, setFilters] = useState<Record<string, Record<string, number>>>({});
    const [selectedFilters, setSelectedFilters] = useState<Partial<ICarType>>({});

    useEffect(() => {
        const handleResize = () => {
            setGridMode(window.innerWidth >= 768);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { cars: carData, totalCount, filters } = await fetchCarData(page, PAGE_SIZE);
                const sortedCars = carData.sort((a, b) => sortOrder === 'desc' ? b.price - a.price : a.price - b.price);
                setCars(sortedCars);
                setTotalCount(totalCount);
                setFilters(filters);
            } catch (error) {
                console.error("Error al obtener los datos de los autos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page, sortOrder]);

    const handleApplyFilters = async (newFilters: Partial<ICarType>) => {
        setLoading(true);
        try {
            const { cars: filteredCars, totalCount } = await fetchFilteredCarData(newFilters, page, PAGE_SIZE);
            setCars(filteredCars);
            setTotalCount(totalCount);
            setSelectedFilters(newFilters);
        } catch (error) {
            console.error("Error al aplicar filtros:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFilter = (key: keyof ICarType) => {
        const updatedFilters = { ...selectedFilters };
        delete updatedFilters[key];
        handleApplyFilters(updatedFilters);
    };

    return (
        <div className="grid grid-cols-5 mt-8">
            <FiltersContainer filters={filters} onApplyFilters={handleApplyFilters} selectedFilters={selectedFilters} />
            <div className="col-span-4">
                <FilterChips selectedFilters={selectedFilters} onRemoveFilter={handleRemoveFilter} />
                <div className="flex justify-between items-center pt-4 px-4">
                    <NumberFormatter value={totalCount} className="text-xs" endContent="resultados" />
                    <Button className="md:hidden" isIconOnly variant="light" onPress={() => setGridMode(!gridMode)}>
                        {gridMode ? <BsListUl className="text-gray-700 text-xl" /> : <BsGrid className="text-gray-700 text-xl" />}
                    </Button>
                    <Button
                        onPress={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                        className="hidden md:flex text-sm"
                        startContent={<TbArrowsSort className={`${sortOrder === 'asc' ? 'rotate-180' : ''} text-xl`} />}
                        variant="light"
                        color="primary"
                    >
                        {sortOrder === 'desc' ? 'Mayor Precio' : 'Menor Precio'}
                    </Button>
                </div>
                <div className={`${gridMode ? 'grid grid-cols-2 md:grid-cols-3 gap-4 place-items-center' : 'flex flex-col'} p-4`}>
                    {cars.map(car => (
                        <CarCard key={car.id} car={car} gridMode={gridMode} />
                    ))}
                </div>
                <div className="flex justify-between mt-4 px-4 pb-4 border-t-1 border-gray-300">
                    <Button className="text-gray-800/90 bg-transparent" disabled={page === 1} onPress={() => setPage(page - 1)} startContent={<FaArrowLeft />}>Anterior</Button>
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
                    <Button className="text-gray-800/90 bg-transparent" disabled={page === Math.ceil(totalCount / PAGE_SIZE)} onPress={() => setPage(page + 1)} endContent={<FaArrowRight />}>Siguiente</Button>
                </div>
            </div>
        </div>
    );
};

export default CarCardContainer;
