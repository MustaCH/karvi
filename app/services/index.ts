import axios from "axios";
import { ICarType, IFilterType } from "@/app/types";

const API_URL =
  "/api/challenge/cars/ASST-challenge-01JEVJTR90HVPSS2NRPPG02CJ3.json";
  
  const filterOrder = [
    "brand", 
    "model", 
    "year", 
    "version", 
    "city"
  ];

type FilterCounts = Record<string, Record<string, number>>;

export interface IFiltersResponse {
  year: IFilterType[];
  city: IFilterType[];
  brand: IFilterType[];
  model: IFilterType[];
  version: IFilterType[];
}

export const fetchCarData = async (
  page: number = 1,
  pageSize: number = 12
): Promise<{ cars: ICarType[]; totalCount: number; filters: FilterCounts }> => {
  try {
    const response = await axios.get(API_URL);
    if (response.data && Array.isArray(response.data.items)) {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const cars = response.data.items.slice(startIndex, endIndex);
      const totalCount = response.data.items.length;

      const filters: FilterCounts = {};
      response.data.items.forEach((car: ICarType) => {
        Object.entries(car).forEach(([key, value]) => {
          if (typeof value === "string" || typeof value === "number") {
            if (!filters[key]) filters[key] = {};
            if (!filters[key][value]) filters[key][value] = 0;
            filters[key][value] += 1;
          }
        });
      });

      return { cars, totalCount, filters };
    } else {
      console.error(
        "La respuesta no contiene el array de items esperado",
        response.data
      );
      return { cars: [], totalCount: 0, filters: {} };
    }
  } catch (error) {
    console.error("Error al consumir la API:", error);
    throw error;
  }
};

export const fetchAvailableFilters = async (): Promise<IFiltersResponse> => { 
  try { 
    const response = await axios.get(API_URL); 
    const availableFilters: Record<string, IFilterType[]> = response.data.availableFilters; 
    const orderedFilters: IFiltersResponse = { 
      brand: [], 
      model: [], 
      year: [], 
      version: [], 
      city: [] 
    }; 
    filterOrder.forEach((key) => { 
      if (key in availableFilters) { 
        orderedFilters[key as keyof IFiltersResponse] = availableFilters[key]; 
      } 
    }); 
    return orderedFilters; 
  } catch (error) { 
    console.error(error)
    throw new Error('No se pudo obtener los filtros disponibles'); 
  } 
};

export const fetchFilteredCarData = async (
  filters: Partial<ICarType>,
  page: number = 1,
  pageSize: number = 12,
  searchTerm: string = "" 
): Promise<{ cars: ICarType[]; totalCount: number }> => {
  try {
    const { cars: allCars } = await fetchCarData();
    const filteredCars = allCars.filter(
      (car) =>
        (!filters.brand || car.brand === filters.brand) &&
        (!filters.model || car.model === filters.model) &&
        (!filters.year || car.year === Number(filters.year)) &&
        (!filters.price || car.price <= filters.price) &&
        (!filters.version || car.version === filters.version) &&
        (!filters.mileage || car.mileage <= filters.mileage) &&
        (!filters.city || car.city === filters.city) &&
        (searchTerm === "" || 
          car.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
          car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||  
          car.version.toLowerCase().includes(searchTerm.toLowerCase()))  
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

