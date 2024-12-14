import { CarCard, NoResultsCard } from "@/app/components";
import { ICarType } from "@/app/types";
import { Spinner } from "@nextui-org/react";
import { FC } from "react";

interface CarCardContainerProps {
  gridMode: boolean;
  loading: boolean;
  cars: ICarType[];
}

export const CarCardContainer: FC<CarCardContainerProps> = ({
  gridMode,
  loading,
  cars,
}) => {
  return (
    <div
      className={`${
        gridMode
          ? "grid grid-cols-2 md:grid-cols-3 gap-4 place-items-center"
          : "flex flex-col"
      } p-4`}
    >
      {loading ? (
        <div className="grid place-items-center col-span-3 h-[80vh]">
          <Spinner size="lg" />
        </div>
      ) : cars.length > 0 ? (
        cars.map((car) => (
          <CarCard key={car.id} car={car} gridMode={gridMode} />
        ))
      ) : (
        <div className="grid place-items-center col-span-3 h-[60vh]">
          <NoResultsCard/>
        </div>
      )}
    </div>
  );
};

export default CarCardContainer;
