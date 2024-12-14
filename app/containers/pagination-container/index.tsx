import { Button, Pagination } from "@nextui-org/react";
import { FC } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PaginationContainerProps {
  page: number;
  totalCount: number;
  pageSize: number;
  onPressPrev: () => void;
  onPressAfter: () => void;
  onChangePage: (page: number) => void;
}

export const PaginationContainer: FC<PaginationContainerProps> = ({
  page,
  totalCount,
  pageSize,
  onPressPrev,
  onPressAfter,
  onChangePage,
}) => {
  return (
    <div className="flex justify-between mt-4 px-4 pb-4 border-t-1 border-gray-300">
      <Button
        className="text-gray-800/90 bg-transparent"
        disabled={page === 1}
        onPress={onPressPrev}
        startContent={<FaArrowLeft />}
      >
        Anterior
      </Button>
      <Pagination
        classNames={{
          wrapper: "gap-0 overflow-visible h-8",
          item: "w-8 h-8 text-small bg-transparent shadow-none rounded-none",
          cursor:
            "text-small text-blue-500 bg-transparent rounded-none font-bold border-t-2 border-primary",
        }}
        total={Math.max(1, Math.ceil(totalCount / pageSize))} 
        initialPage={1}
        page={page}
        onChange={onChangePage}
      />
      <Button
        className="text-gray-800/90 bg-transparent"
        disabled={page === Math.ceil(totalCount / pageSize)}
        onPress={onPressAfter}
        endContent={<FaArrowRight />}
      >
        Siguiente
      </Button>
    </div>
  );
};

export default PaginationContainer;
