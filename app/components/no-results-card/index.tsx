import { CgSmileSad } from "react-icons/cg";

export const NoResultsCard = () => {
    return (
        <div className="w-full">
            <div className="flex gap-2 items-center text-blue-700">
                <CgSmileSad className="text-3xl"/>
                <p className="text-xl">No se encontraron resultados</p>
            </div>
        </div>
    )
}

export default NoResultsCard;