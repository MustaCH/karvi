import { Button, ButtonGroup } from "@nextui-org/react";
import { FC } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FilterIcon } from "@/app/icons";

interface MobileControlersProps {
  onOpen: () => void;
}

export const MobileControlers: FC<MobileControlersProps> = ({ onOpen }) => {
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
        Filtrar
      </Button>
    </ButtonGroup>
  );
};

export default MobileControlers;
