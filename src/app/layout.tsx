import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://astro-systeme-solaire-ass.vercel.app/"), // Ajoutez cette ligne
  title: "Astronomical Solar System",
  description: "Le système solaire en 3D avec ThreeJS",
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
        url: "https://astro-systeme-solaire-ass.vercel.app/assets/images/description-image.png", // URL complète de l'image
        width: 1200,
        height: 630,
        alt: "Astronomical Solar System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Astronomical Solar System",
    description: "Découvrez le système solaire en 3D avec ThreeJS",
    images: ["https://astro-systeme-solaire-ass.vercel.app/assets/images/description-image.png"], 
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
