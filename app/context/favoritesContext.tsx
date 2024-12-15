'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ICarType } from "@/app/types";

interface FavoritesContextType {
  favorites: ICarType[];
  toggleFavorite: (car: ICarType) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<ICarType[]>([]);

  const toggleFavorite = (car: ICarType) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((favorite) => favorite.id === car.id)) {
        return prevFavorites.filter((favorite) => favorite.id !== car.id);
      } else {
        return [...prevFavorites, car];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
