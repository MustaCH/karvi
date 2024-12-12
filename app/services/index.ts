import axios from "axios";
import { ICarType } from "@/app/types";

const API_URL = "/api/challenge/cars/ASST-challenge-01JEVJTR90HVPSS2NRPPG02CJ3.json";

export const fetchCarData = async (page: number = 1, pageSize: number = 12): Promise<{ cars: ICarType[], totalCount: number }> => {
    try {
        const response = await axios.get(API_URL);
        if (response.data && Array.isArray(response.data.items)) {
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const cars = response.data.items.slice(startIndex, endIndex);
            const totalCount = response.data.totalCount;
            return { cars, totalCount };
        } else {
            console.error("La respuesta no contiene el array de items esperado", response.data);
            return { cars: [], totalCount: 0 };
        }
    } catch (error) {
        console.error("Error al consumir la API:", error);
        throw error;
    }
};

export const fetchFilteredCarData = async (filters: Partial<ICarType>, page: number = 1, pageSize: number = 12): Promise<{ cars: ICarType[], totalCount: number }> => {
    try {
        const { cars: allCars, totalCount } = await fetchCarData();
        const filteredCars = allCars.filter(car =>
            (!filters.brand || car.brand === filters.brand) &&
            (!filters.model || car.model === filters.model) &&
            (!filters.year || car.year === filters.year) &&
            (!filters.price || car.price <= filters.price) &&
            (!filters.mileage || car.mileage <= filters.mileage) &&
            (!filters.city || car.city === filters.city)
        );
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const cars = filteredCars.slice(startIndex, endIndex);
        return { cars, totalCount: filteredCars.length };
    } catch (error) {
        console.error("Error al aplicar filtros a los datos:", error);
        throw error;
    }
};
