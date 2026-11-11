"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  totalResults: number;
}

export function SearchBar({ value, onChange, totalResults }: SearchBarProps) {
  return (
    <div className="w-full relative">
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar pinturas, caños, amoladora, cables, tarugos..."
          aria-label="Buscar materiales en el catálogo"
          autoCapitalize="none"
          autoCorrect="off"
          enterKeyHint="search"
          className="w-full pl-10 pr-10 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-base sm:text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
        />
        {value.length > 0 && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3 p-1 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
            title="Limpiar búsqueda"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {value.trim().length > 0 && (
        <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mt-1.5 px-2">
          {totalResults === 0
            ? "No se encontraron materiales para tu búsqueda."
            : `Mostrando ${totalResults} ${totalResults === 1 ? "resultado" : "resultados"}`}
        </div>
      )}
    </div>
  );
}
