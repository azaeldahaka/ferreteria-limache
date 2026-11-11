"use client";

import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface StatusResult {
  isOpen: boolean;
  isSundayGuard: boolean;
  label: string;
}

function calculateCurrentStatus(): StatusResult {
  // Obtenemos la hora local de Argentina (UTC-3)
  const now = new Date();
  const day = now.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  const hour = now.getHours();
  const min = now.getMinutes();
  const timeInMinutes = hour * 60 + min;

  // Rango Lunes a Sábados: 09:00 - 13:30 (540 a 810) y 16:00 - 20:30 (960 a 1230)
  const morningOpen = 9 * 60;
  const morningClose = 13 * 60 + 30;
  const afternoonOpen = 16 * 60;
  const afternoonClose = 20 * 60 + 30;

  // Domingo: Guardia de 10:00 a 14:00 (600 a 840)
  const sundayOpen = 10 * 60;
  const sundayClose = 14 * 60;

  if (day === 0) {
    if (timeInMinutes >= sundayOpen && timeInMinutes <= sundayClose) {
      return {
        isOpen: true,
        isSundayGuard: true,
        label: "Guardia Abierta de Domingo (10 a 14 hs)",
      };
    }
    return {
      isOpen: false,
      isSundayGuard: true,
      label: "Cerrado • Guardia: Domingo 10 a 14 hs",
    };
  }

  const isWeekdayOpen =
    (timeInMinutes >= morningOpen && timeInMinutes <= morningClose) ||
    (timeInMinutes >= afternoonOpen && timeInMinutes <= afternoonClose);

  if (isWeekdayOpen) {
    return {
      isOpen: true,
      isSundayGuard: false,
      label: "Abierto Ahora (Turno activo)",
    };
  }

  return {
    isOpen: false,
    isSundayGuard: false,
    label: "Cerrado • Abre 09:00 y 16:00 hs",
  };
}

export function StoreStatusBadge() {
  const [status, setStatus] = useState<StatusResult>({
    isOpen: true,
    isSundayGuard: false,
    label: "Horarios comerciales activos",
  });

  useEffect(() => {
    setStatus(calculateCurrentStatus());
    const interval = setInterval(() => {
      setStatus(calculateCurrentStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
        status.isOpen
          ? status.isSundayGuard
            ? "bg-amber-500/10 text-amber-800 border-amber-400 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-700"
            : "bg-emerald-500/10 text-emerald-800 border-emerald-400 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-700"
          : "bg-zinc-100 text-zinc-600 border-zinc-300 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700"
      }`}
    >
      <span className="relative flex h-2 w-2">
        {status.isOpen && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              status.isSundayGuard ? "bg-amber-500" : "bg-emerald-500"
            }`}
          />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            status.isOpen
              ? status.isSundayGuard
                ? "bg-amber-600"
                : "bg-emerald-600"
              : "bg-zinc-400"
          }`}
        />
      </span>
      <Clock className="w-3.5 h-3.5" />
      <span>{status.label}</span>
    </div>
  );
}
