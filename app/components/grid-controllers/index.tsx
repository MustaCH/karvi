import { ICarType } from "@/app/types";
import { NumberFormatter } from "@/app/utils";
import { Button } from "@nextui-org/react";
import { FC } from "react";
import { BsGrid, BsHeart, BsHeartFill, BsListUl } from "react-icons/bs";
import { TbArrowsSort } from "react-icons/tb";

interface GridControlersProps {
  totalCount: number;
  gridMode: boolean;
  sortOrder: string;
  favorites?: ICarType[];
  onPressMode: () => void;
  onPressSort: () => void;
  onToggleFavorites: () => void;
}

export const GridControlers: FC<GridControlersProps> = ({
  totalCount,
  gridMode,
  sortOrder,
  favorites,
  onPressMode,
  onPressSort,
  onToggleFavorites
}) => {
  return (
    <div className="grid grid-cols-3 place-items-center pt-4 px-8">
      <div className="w-full flex justify-start">
        <NumberFormatter
          value={totalCount}
          className="text-xs"
          endContent="resultados"
        />
      </div>
      <Button variant="light" startContent={favorites?.length === 0 ? <BsHeart /> : <BsHeartFill />} onPress={onToggleFavorites} className="text-sm flex items-center gap-2 text-blue-700">
        Favoritos {favorites?.length !== 0 && <span>({favorites?.length})</span>}
      </Button>
      <div className="md:hidden w-full flex justify-end">
        <Button
          isIconOnly
          variant="light"
          onPress={onPressMode}
        >
          {gridMode ? (
            <BsListUl className="text-gray-700 text-xl" />
          ) : (
            <BsGrid className="text-gray-700 text-xl" />
          )}
        </Button>
      </div>
      <div className="md:w-full md:flex justify-end">        
        <Button
          onPress={onPressSort}
          className="hidden md:flex text-sm"
          startContent={
            <TbArrowsSort
              className={`${
                sortOrder === "asc"
                  ? "rotate-180 transition-all duration-250"
                  : "rotate-[-180] transition-all duration-250"
              } text-xl`}
            />
          }
          variant="light"
          color="primary"
        >
          {sortOrder === "desc" ? "Menor Precio" : "Mayor Precio"}
        </Button>
      </div>
    </div>
  );
};

export default GridControlers;
