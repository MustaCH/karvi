'use client'

import { Button, ButtonGroup, Input } from "@nextui-org/react";
import { FC, useState } from "react";
import { IoCloseSharp, IoSearchOutline } from "react-icons/io5";
import { FilterIcon } from "@/app/icons";
import { ICarType } from "@/app/types";

interface MobileControlersProps {
  onOpen: () => void;
  applyedFilters: Partial<ICarType>;
  onSearch: (searchTerm: string) => void;
}

export const MobileControlers: FC<MobileControlersProps> = ({ onOpen, applyedFilters, onSearch }) => {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchTerm);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit(); 
    }
  };

  const handleClearSearch = () => {
    setSearchTerm(""); 
    onSearch("");      
  };

  const filters = Object.entries(applyedFilters).length;

  return (
    <div className="w-full h-fit flex flex-col items-center gap-3">
      <ButtonGroup className="w-full h-fit mx-4 ">
        <Button
          className="text-[#566DED] font-semibold"
          variant="light"
          onPress={() => setSearchOpen(prev => !prev)} 
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
      <div
        className={`w-96 overflow-hidden flex justify-center transition-all duration-300 ease-in-out`}
        style={{
          maxHeight: searchOpen ? '4rem' : '0',
          opacity: searchOpen ? 1 : 0,
        }}
      >
        <Input
          fullWidth
          isClearable
          value={searchTerm}
          classNames={{
            base: "h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Escribe tu búsqueda..."
          size="sm"
          startContent={ 
            <Button className="rounded-full" onPress={handleSearchSubmit} isIconOnly variant="light">
              <IoSearchOutline />
            </Button>
          }
          endContent={
            <>    
              {searchTerm && (
                <Button
                  className="rounded-full ml-2"
                  onPress={handleClearSearch}
                  isIconOnly
                  variant="light"
                >
                  <IoCloseSharp className="text-red-700 text-xl"/>
                </Button>
              )}
            </>
          }
          type="search"
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown} 
        />
      </div>
    </div>
  );
};

export default MobileControlers;
