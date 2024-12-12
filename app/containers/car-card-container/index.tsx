'use client'

import { CarCard } from "@/app/components";
import { ICarType } from "@/app/types";
import { BsGrid, BsListUl } from "react-icons/bs";
import { FC, useEffect, useState } from "react";
import { Button, Pagination, PaginationCursor } from "@nextui-org/react";
import { fetchCarData } from "@/app/services";
import { NumberFormatter } from "@/app/utils";
import { TbArrowsSort } from "react-icons/tb";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface CarCardContainerProps {

}

const PAGE_SIZE = 12;

export const CarCardContainer: FC<CarCardContainerProps> = () => {
    const [cars, setCars] = useState<ICarType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [gridMode, setGridMode] = useState<boolean>(false)
    const [sortOrder, setSortOrder] = useState<string>('desc');

    useEffect(() => { 
        const handleResize = () => { 
            if (window.innerWidth >= 768) { 
                setGridMode(true); 
            } 
        }; 
        window.addEventListener('resize', handleResize); 
        handleResize(); 
        return () => { 
            window.removeEventListener('resize', handleResize); 
        }; 
    }, []);

    useEffect(() => { 
        const getCars = async () => { 
            try { 
                const { cars: carData, totalCount } = await fetchCarData(page, PAGE_SIZE); 
                const sortedCars = carData.sort((a, b) => sortOrder === 'desc' ? b.price - a.price : a.price - b.price);
                setCars(sortedCars); 
                setTotalCount(totalCount); 
            } catch (error) { 
                console.error("Error al obtener los datos de los autos:", error);
            } finally { 
                setLoading(false); 
            } 
        }; 
        getCars();
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }, [page, sortOrder]);

    const handleChangeGrid = () => {
        if (gridMode === false) {
            setGridMode(true)
        } else {
            setGridMode(false)
        }
    }

    const handlePageChange = (page: number) => { 
        setPage(page); 
    };
    
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    const handleSortOrderChange = () => { 
            setSortOrder(prevSortOrder => (
                prevSortOrder === 'desc' ? 'asc' : 'desc'
            )
        ); 
    };

    return (
        <div>
            <div className="flex justify-between items-center pt-4 px-4">
                <NumberFormatter value={totalCount} className="text-xs" endContent="resultados"/>
                <Button className="md:hidden" isIconOnly variant="light" onPress={handleChangeGrid}>
                    { gridMode ? <BsListUl className="text-gray-700 text-xl"/> : <BsGrid className="text-gray-700 text-xl"/> }
                </Button>
                <Button 
                    onPress={handleSortOrderChange} 
                    className="hidden md:flex text-sm" 
                    startContent={<TbArrowsSort 
                    className={`${sortOrder === 'asc' ? 'rotate-180 transition-all duration-150' : 'rotate-[-180] transition-all duration-150' } text-xl`}/>} 
                    variant="light" 
                    color="primary"
                >
                    {sortOrder === 'desc' ? 'Mayor Precio' : 'Menor Precio'}
                </Button>
            </div>
            <div className={`${gridMode ? 'grid grid-cols-2 md:grid-cols-3 gap-4 place-items-center' : 'flex flex-col'} p-4 md:grid md:grid-cols-3`}>
                {cars.map((car)=> (
                        <CarCard key={car.id} car={car} gridMode={gridMode}/>
                    ))
                }
            </div>
            <div className="flex justify-between mt-4 px-4 pb-4 border-t-1 border-gray-300"> 
                <Button className="text-gray-800/90 bg-transparent" disabled={page === 1} onPress={() => handlePageChange(page - 1)} startContent={<FaArrowLeft/>}>Anterior</Button> 
                <Pagination 
                    classNames={{
                        wrapper: "gap-0 overflow-visible h-8",
                        item: "w-8 h-8 text-small bg-transparent shadow-none rounded-none",
                        cursor:
                          "text-small text-blue-500 bg-transparent rounded-none font-bold border-t-2 border-primary",
                      }}
                    total={totalPages} 
                    initialPage={1} page={page} 
                    onChange={(page) => handlePageChange(page)} 
                /> 
                <Button className="text-gray-800/90 bg-transparent" disabled={page === totalPages} onPress={() => handlePageChange(page + 1)} endContent={<FaArrowRight/>}>Siguiente</Button>
            </div>
        </div>
    )
}

export default CarCardContainer;