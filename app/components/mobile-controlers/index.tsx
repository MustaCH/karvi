import { Button, ButtonGroup } from "@nextui-org/react";
import { FC } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FilterIcon } from "@/app/icons";
import { ICarType } from "@/app/types";

interface MobileControlersProps {
  onOpen: () => void;
  applyedFilters: Partial<ICarType>;
}

export const MobileControlers: FC<MobileControlersProps> = ({ onOpen, applyedFilters }) => {

  const filters = Object.entries(applyedFilters).length

  return (
    <ButtonGroup className="w-full h-fit mx-4 ">
      <Button
        className="text-[#566DED] font-semibold"
        variant="light"
        onPress={onOpen}
        fullWidth
        startContent={<IoSearchOutline />}
      >
        Buscar
      </Button>
      <Button
        className="text-[#566DED] font-semibold"
        variant="light"
        onPress={onOpen}
        fullWidth
        startContent={<FilterIcon />}
      >
        Filtrar {filters > 0 && <span>({filters})</span>} 
      </Button>
    </ButtonGroup>
  );
};

export default MobileControlers;
