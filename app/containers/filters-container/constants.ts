import { IFilterType } from "@/app/types";

export const filterList: IFilterType[] = [
    {
        id: "brand", 
        title: "Marca"
    },
    {
        id: "model", 
        title: "Modelo",
    },
    {
        id: "year",
        title: "Año"
    }, 
    {
        id: "version",
        title: "Version"
    },
    {
        id: "city",
        title: "Ciudad"
    }
]

export default filterList;