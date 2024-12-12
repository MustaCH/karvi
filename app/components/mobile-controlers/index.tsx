import { Button, Divider } from "@nextui-org/react";
import { FC } from "react";
import FilterDrawer from "../filter-drawer";
import { IoSearchOutline } from "react-icons/io5";
import { FilterIcon } from "@/app/icons";

interface MobileControlersProps {
  onOpen: () => void;
}

export const MobileControlers: FC<MobileControlersProps> = ({ onOpen }) => {
  return (
    <>
      <Button
        className="text-[#566DED] font-semibold"
        variant="light"
        onPress={onOpen}
        startContent={<IoSearchOutline />}
      >
        Buscar
      </Button>
      <Divider orientation="vertical" />
      <Button
        className="text-[#566DED] font-semibold"
        variant="light"
        onPress={onOpen}
        startContent={<FilterIcon />}
      >
        Filtrar
      </Button>
    </>
  );
};

export default MobileControlers;
