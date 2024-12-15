'use client'

import { CashRegisterIcon } from "@/app/icons";
import { ICarType } from "@/app/types";
import { NumberFormatter } from "@/app/utils";
import { Button, Chip } from "@nextui-org/react";
import { FC, useEffect, useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CarCardProps {
  car: ICarType;
  gridMode: boolean;
}

const carImages: string[] = [
  'https://s3-alpha-sig.figma.com/img/210d/0755/dd24cb0bde29a2119e23f3236f743cb1?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OZzB022UCqsUrhwyzFZyKZszyEylpxPoOtkj-lCQoZvGkhO787Ko0ANqixcqkTSANDEPzMuUMHez2Rl9t2M2goJTqXPjZgKgyhHBlICuMLAvsLVrVfM28CqgK7jy5maJuct-QaYIe7gR5r-rXX1qZFKqXKcZMu1kCzsdvPoLnPh8N-DoT3PKLlVx4QlrEDargzSS1bh-jmn9WHGy7i2KDemgalKn9sw53B2pr9mjiTmI6Bm8~I7JWG7V-aQikgbT5mm2GnvnOWcZmOK4eUgM3R4NsRZcb0htyayUbilA~fJ0nNzfWM2CzJDYeHTc2M0Ou0gJ0qV36oXsbODim2QlCw__', 
  'https://s3-alpha-sig.figma.com/img/2759/ca26/75dc4ba63c6906f49bbaa32f101780ae?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SEj5-ixy16k7JHNcUCwuMm7wkEUVxoXrSBlIubUOG3N2HqjcYk2eqsB9BCLTbqRDiUfIoIYpvyw-D9KiAM9IQtqRlNR7zkLm61XMAatlQ7SpLtkijvfQuE5PNpfUi3y7iXrf9j5rF4K7uZ5ngjMaBZkfXNSdPEh1z5FEYEmT~jvPKa1zdif0kiTtCVJZ3~cpAoF5KEau527ZJBc-CAuV17Tcct39GLZ6ej-ztRDlF9i18QhPHhKm6~184YRAyhJ3Uv7FGH5vJkFV~Mt2TC9qo07AIrni4P1PXaE97mq6lszzIbW9QP36ejfiTXJQL6mKJ8trGHK1YOTmQO2qN5XjQQ__',
  'https://motormagazine.com.ar/wp-content/uploads/2019/03/fiat-uno-way-1-1.jpg'
];

export const CarCard: FC<CarCardProps> = ({ car, gridMode }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.some((favorite: ICarType) => favorite.id === car.id));
  }, [car.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (favorite: ICarType) => favorite.id !== car.id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(car);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <div
      className={`flex ${
        gridMode
          ? "flex-col rounded-lg shadow-md max-w-[296px]"
          : "flex-row items-center"
      } ${!gridMode ? "border-b-2 border-gray-300/50" : ""} ${
        gridMode ? "bg-white" : ""
      } gap-4 p-2`}
    >
      <div
        className={`relative ${
          !gridMode ? "h-[106px] w-[120px]" : ""
        } md:max-w-[280px] md:max-h-[196px] overflow-hidden rounded-lg`}
      >
        <Button
          isIconOnly
          variant="solid"
          radius="full"
          size="sm"
          className={`absolute top-1 right-1 z-50 ${
            gridMode ? "bg-white" : "bg-white/50"
          }`}
          onPress={toggleFavorite}
        >
          {!isFavorite ? <BsHeart /> : <BsHeartFill className="text-blue-700 " />}
        </Button>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          loop
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="w-full h-full"
          style={{
            '--swiper-pagination-color' : '#FFFFFF',
            '--swiper-pagination-bullet-inactive-color': '#FFFFFF',
            '--swiper-pagination-bullet-inactive-opacity': '50%'
          }}
        >
          {carImages.map((imgSrc, index) => (
            <SwiperSlide key={index}>
              <img
                className="h-full w-full object-cover"
                src={imgSrc}
                alt={`Car image ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-center">
          <Chip variant="flat" size="sm">
            {car.year}
          </Chip>
          <Chip variant="flat" size="sm">
            <NumberFormatter value={car.mileage} endContent="km" />
          </Chip>
        </div>
        <div className={!gridMode ? `text-sm gap-1` : `text-sm md:text-md`}>
          {gridMode ? (
            <div className="capitalize">
              <strong>{car.model}</strong>
              <p>{car.version}</p>
            </div>
          ) : (
            <p className="font-semibold capitalize">
              {car.model} <span className="font-normal">{car.version}</span>
            </p>
          )}
        </div>
        <div className="text-orange-500 text-md md:text-lg">
          <NumberFormatter startContent="R$" value={car.price} />
        </div>
        <div className="text-xs text-gray-700/50">
          <p>{car.city}</p>
        </div>
      </div>
      {gridMode && (
        <div className="grid place-items-center">
          <Button
            className="text-sm font-semibold bg-blue-800 text-white"
            fullWidth
            startContent={<CashRegisterIcon />}
          >
            Simular parcelas
          </Button>
        </div>
      )}
    </div>
  );
};

export default CarCard;
