"use client";

import React from "react";
import Link from "next/link";
import { Phone, ShoppingCart, Wrench } from "lucide-react";
import { SITE_CONFIG } from "@/config/site.config";
import { useCart } from "@/modules/cart/application/cart.context";
import { StoreStatusBadge } from "./StoreStatusBadge";

export function Header() {
  const { totalItems, toggleCart } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200 dark:bg-zinc-950/95 dark:border-zinc-800 transition-colors">
      {/* Top Banner de Guardia y Aviso Rápido */}
      <div className="bg-amber-500 text-zinc-950 text-xs py-1.5 px-3 text-center font-bold tracking-wide flex items-center justify-center gap-2">
        <span>⚡ GUARDIA DOMINGOS 10:00 A 14:00 HS</span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden sm:inline">Urgencias del barrio sin moverte de casa</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Wrench className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="font-extrabold text-base sm:text-lg leading-tight tracking-tight text-zinc-900 dark:text-white">
              {SITE_CONFIG.shortName}
            </div>
            <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
              Barrio Limache • Salta
            </div>
          </div>
        </Link>

        {/* Status Badge (desktop/tablet) */}
        <div className="hidden md:block">
          <StoreStatusBadge />
        </div>

        {/* Actions (Call + Cart) */}
        <div className="flex items-center gap-2">
          <a
            href={`tel:${SITE_CONFIG.whatsappNumber}`}
            className="p-2 sm:px-3 sm:py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Llamar al local"
          >
            <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="hidden sm:inline">Llamar</span>
          </a>

          <button
            onClick={toggleCart}
            type="button"
            className="relative px-3 py-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 transition-colors flex items-center gap-2 text-xs font-bold shadow-sm"
            aria-label="Abrir cotizador de materiales"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Cotizador</span>
            {totalItems > 0 && (
              <span className="bg-amber-400 text-zinc-950 text-[10px] font-black px-1.5 py-0.2 rounded-full min-w-4 text-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Status Badge mobile bar */}
      <div className="md:hidden px-4 pb-2.5 flex justify-center">
        <StoreStatusBadge />
      </div>
    </header>
  );
}
