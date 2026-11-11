import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/config/site.config";
import { CartProvider } from "@/modules/cart/application/cart.context";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WhatsAppFloatButton } from "@/components/whatsapp/WhatsAppFloatButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: `${SITE_CONFIG.shortName} — Catálogo Digital & Materiales en Salta`,
  description: SITE_CONFIG.description,
  keywords: [
    "ferretería en Limache",
    "pinturería barrio limache",
    "ferretería salta",
    "guardia domingo ferretería salta",
    "materiales de construcción salta",
    "cables normalizados salta",
    "termofusión agua salta",
  ],
  authors: [{ name: "Ferretería Limache" }],
  openGraph: {
    title: `${SITE_CONFIG.shortName} — Catálogo Digital & Pedidos por WhatsApp`,
    description: "Consultá stock en tiempo real y cotizá tus materiales para retiro sin fila en Barrio Limache.",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100`}
      >
        <CartProvider>
          <Header />
          <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <WhatsAppFloatButton />
        </CartProvider>
      </body>
    </html>
  );
}
