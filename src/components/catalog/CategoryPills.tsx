"use client";

import React from "react";
import {
  Paintbrush,
  Wrench,
  Zap,
  Droplets,
  Nut,
  Hammer,
  LayoutGrid,
} from "lucide-react";
import { Category, CategorySlug } from "@/modules/catalog/domain/category.model";

interface CategoryPillsProps {
  categories: Category[];
  selectedCategory: CategorySlug | "all";
  onSelectCategory: (slug: CategorySlug | "all") => void;
}

export function CategoryPills({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryPillsProps) {
  const getIcon = (slug: string) => {
    switch (slug) {
      case "pintureria":
        return <Paintbrush className="w-4 h-4 text-amber-500" />;
      case "herramientas":
        return <Wrench className="w-4 h-4 text-blue-500" />;
      case "electricidad":
        return <Zap className="w-4 h-4 text-yellow-500" />;
      case "plomeria":
        return <Droplets className="w-4 h-4 text-cyan-500" />;
      case "tornilleria":
        return <Nut className="w-4 h-4 text-zinc-500" />;
      case "construccion":
        return <Hammer className="w-4 h-4 text-orange-500" />;
      default:
        return <LayoutGrid className="w-4 h-4 text-zinc-500" />;
    }
  };

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center gap-2 min-w-max pb-1">
        <button
          onClick={() => onSelectCategory("all")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
            selectedCategory === "all"
              ? "bg-zinc-900 text-white border-zinc-900 shadow-sm dark:bg-white dark:text-zinc-950 dark:border-white"
              : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800 dark:hover:bg-zinc-800"
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span>Todos los Rubros</span>
        </button>

        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                isSelected
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800 dark:hover:bg-zinc-800"
              }`}
            >
              {getIcon(cat.slug)}
              <span>{cat.shortName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
