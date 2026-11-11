import React from "react";
import { MessageCircle, MapPin, Zap, ShieldAlert, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/config/site.config";
import { catalogService } from "@/modules/catalog/application/catalog.service";
import { CatalogSection } from "@/components/catalog/CatalogSection";

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    catalogService.getAllCategories(),
    catalogService.searchProducts(""),
  ]);

  // Schema.org Structured Data para Google Search y Maps (LocalBusiness / HardwareStore)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HardwareStore",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    telephone: SITE_CONFIG.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.province,
      addressCountry: "AR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "13:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "16:00",
        closes: "20:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "10:00",
        closes: "14:00",
      },
    ],
    priceRange: "$$",
  };

  return (
    <div className="space-y-8">
      {/* Inyección de JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section Mobile-First */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-zinc-900 text-white p-6 sm:p-10 shadow-xl">
        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tu ferretería de barrio, ahora en tu celular</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Consultá stock, cotizá y retirá <span className="text-amber-400">sin hacer fila</span>
          </h1>

          <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
            Armá tu lista de materiales para arreglos, albañilería, pintura o electricidad desde casa y envianos tu pedido directo a nuestro WhatsApp.
          </p>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#catalogo"
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Ver Catálogo de Materiales</span>
            </a>

            <a
              href={SITE_CONFIG.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-sm transition-all flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Cómo Llegar</span>
            </a>
          </div>
        </div>

        {/* Feature Badges Grid */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <p className="font-bold text-white">Respuesta Rápida</p>
              <p className="text-[11px] text-blue-200">Presupuestos directos por WhatsApp</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <p className="font-bold text-white">Guardia de Domingos</p>
              <p className="text-[11px] text-blue-200">Abiertos de 10 a 14 hs</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
            <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-white">Atención Vecinal</p>
              <p className="text-[11px] text-blue-200">Asesoramiento técnico de confianza</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Catalog Section */}
      <CatalogSection categories={categories} initialProducts={products} />
    </div>
  );
}
