import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "LockerRoom — Custom Clothing Configurator",
  description:
    "Desain pakaian custom kamu sendiri dengan konfigurator 3D interaktif. Pilih warna, upload desain, dan lihat hasilnya secara real-time.",
  keywords: ["custom clothing", "3D configurator", "desain kaos", "pakaian custom"],
  openGraph: {
    title: "LockerRoom — Custom Clothing Configurator",
    description: "Desain pakaian custom kamu sendiri dengan konfigurator 3D interaktif.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
