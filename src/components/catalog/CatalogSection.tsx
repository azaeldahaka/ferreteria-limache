"use client";

import React, { useMemo, useState } from "react";
import { Category, CategorySlug } from "@/modules/catalog/domain/category.model";
import { Product } from "@/modules/catalog/domain/product.model";
import { CategoryPills } from "./CategoryPills";
import { SearchBar } from "./SearchBar";
import { ProductCard } from "./ProductCard";

interface CatalogSectionProps {
  categories: Category[];
  initialProducts: Product[];
}

export function CatalogSection({
  categories,
  initialProducts,
}: CatalogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategorySlug | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    let list = initialProducts;

    // Filtro por categoría
    if (selectedCategory !== "all") {
      list = list.filter((p) => p.categorySlug === selectedCategory);
    }

    // Filtro por término de búsqueda
    const clean = searchQuery.trim().toLowerCase();
    if (clean) {
      list = list.filter((p) => {
        const matchName = p.name.toLowerCase().includes(clean);
        const matchDesc = p.description.toLowerCase().includes(clean);
        const matchTags = p.tags.some((t) => t.toLowerCase().includes(clean));
        return matchName || matchDesc || matchTags;
      });
    }

    return list;
  }, [initialProducts, selectedCategory, searchQuery]);

  return (
    <section id="catalogo" className="w-full space-y-6 pt-4">
      {/* Controles de Búsqueda y Filtros */}
      <div className="space-y-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          totalResults={filteredProducts.length}
        />
        <CategoryPills
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Grid de Productos */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 space-y-2">
          <p className="font-bold text-zinc-800 dark:text-zinc-200 text-sm">
            No encontramos materiales con ese criterio.
          </p>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            ¿Buscás algo específico que no ves listado? Escribinos por WhatsApp y te confirmamos disponibilidad en el depósito.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
