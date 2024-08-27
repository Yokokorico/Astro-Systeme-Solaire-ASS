import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Astronomical Solar System",
  description: "Le système solaire en 3D avec ThreeJS",
  viewport: "width=device-width, initial-scale=1",
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "système solaire",
    "ThreeJS",
    "3D",
    "astronomie",
    "planètes",
    "réalité virtuelle",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://astro-systeme-solaire-ass.vercel.app/", 
    title: "Astronomical Solar System",
    description: "Découvrez le système solaire en 3D avec ThreeJS",
    images: [
      {
        url: "/assets/images/description-image.png", 
        width: 1200,
        height: 630,
        alt: "Astronomical Solar System",
      },
    ],
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
