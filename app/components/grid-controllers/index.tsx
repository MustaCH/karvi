import { NumberFormatter } from "@/app/utils";
import { Button } from "@nextui-org/react";
import { FC } from "react";
import { BsGrid, BsListUl } from "react-icons/bs";
import { TbArrowsSort } from "react-icons/tb";

interface GridControlersProps {
  totalCount: number;
  gridMode: boolean;
  sortOrder: string;
  onPressMode: () => void;
  onPressSort: () => void;
}

export const GridControlers: FC<GridControlersProps> = ({
  totalCount,
  gridMode,
  sortOrder,
  onPressMode,
  onPressSort,
}) => {
  return (
    <div className="flex justify-between items-center pt-4 px-4">
      <NumberFormatter
        value={totalCount}
        className="text-xs"
        endContent="resultados"
      />
      <Button
        className="md:hidden"
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
  );
};

export default GridControlers;
