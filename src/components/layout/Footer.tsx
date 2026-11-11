"use client";

import React, { useEffect, useState } from "react";
import { Clock, MapPin, Phone, ShieldCheck, Heart } from "lucide-react";
import { SITE_CONFIG } from "@/config/site.config";

export function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="w-full bg-zinc-900 text-zinc-300 border-t border-zinc-800 pt-12 pb-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Info del Local */}
        <div className="space-y-3">
          <h3 className="text-white font-extrabold text-base tracking-tight flex items-center gap-2">
            <span>{SITE_CONFIG.name}</span>
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            {SITE_CONFIG.description}
          </p>
          <div className="flex items-start gap-2 text-xs text-zinc-300 pt-2">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>{SITE_CONFIG.address.fullText}</span>
          </div>
          <div className="pt-1">
            <a
              href={SITE_CONFIG.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 underline font-semibold"
            >
              Ver ubicación en Google Maps &rarr;
            </a>
          </div>
        </div>

        {/* Horarios & Guardia */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-sm flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Horarios de Atención</span>
          </h4>
          <ul className="text-xs space-y-2 text-zinc-400">
            <li className="flex flex-col">
              <span className="text-zinc-200 font-semibold">Lunes a Sábados:</span>
              <span>09:00 a 13:30 hs y 16:00 a 20:30 hs</span>
            </li>
            <li className="flex flex-col p-2.5 rounded-lg bg-zinc-800/80 border border-amber-500/30">
              <span className="text-amber-400 font-bold flex items-center gap-1">
                ⭐ Domingos de Guardia:
              </span>
              <span className="text-zinc-200 font-medium">10:00 a 14:00 hs</span>
              <span className="text-[11px] text-zinc-400 pt-0.5">
                Para emergencias y refacciones del fin de semana.
              </span>
            </li>
          </ul>
        </div>

        {/* Medios de Pago & Contacto */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Medios de Pago Aceptados</span>
          </h4>
          <ul className="text-xs space-y-1.5 text-zinc-400">
            {SITE_CONFIG.paymentMethods.map((method, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{method}</span>
              </li>
            ))}
          </ul>
          <div className="pt-2 text-xs text-zinc-400">
            <span>WhatsApp directo de pedidos: </span>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
              className="text-emerald-400 font-bold hover:underline"
            >
              {SITE_CONFIG.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
        <div>
          © {year} {SITE_CONFIG.name}. Todos los derechos reservados.
        </div>
        <div className="flex items-center gap-1">
          <span>Desarrollado con</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          <span>por estudiante de Ing. Informática UCASAL para el barrio.</span>
        </div>
      </div>
    </footer>
  );
}
