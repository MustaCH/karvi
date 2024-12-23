import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {NextUIProvider} from "@nextui-org/react";
import { FavoritesProvider } from "./context/favoritesContext";


const raleway = localFont({
  src: "./fonts/Raleway-VariableFont_wght.ttf",
  variable: "--font-raleway-sans",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "Karvi - Challenge",
  description: "Challenge Karvi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`${raleway.variable} antialiased bg-gray-300/10`}>
          <FavoritesProvider>
            <NextUIProvider>
              {children}
            </NextUIProvider>
          </FavoritesProvider>
        </body>
    </html>
  );
}
