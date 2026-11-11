"use client";

import React from "react";
import { MessageCircle, Plus, Check } from "lucide-react";
import { Product } from "@/modules/catalog/domain/product.model";
import { useCart } from "@/modules/cart/application/cart.context";
import { whatsAppMessageBuilder } from "@/modules/whatsapp/domain/whatsapp-message.builder";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { items, addItem } = useCart();
  const cartItem = items.find((i) => i.product.id === product.id);
  const isInCart = Boolean(cartItem);

  const directWhatsAppUrl = whatsAppMessageBuilder.buildProductInquiry(product);

  return (
    <div className="flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm hover:shadow-md transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
      <div className="space-y-2">
        {/* Category & Stock Tag */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {product.categorySlug}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Stock disponible
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 leading-snug">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Unit presentation */}
        <div className="pt-1">
          <span className="inline-block text-[11px] font-medium text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/60 px-2 py-0.5 rounded">
            Presentación: <strong className="text-zinc-900 dark:text-white">{product.unit}</strong>
          </span>
        </div>
      </div>

      {/* Action Buttons (Mobile-first) */}
      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-2 gap-2">
        <a
          href={directWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 transition-colors"
          title="Consultar por este material"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Consultar</span>
        </a>

        <button
          onClick={() => addItem(product, 1)}
          type="button"
          className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
            isInCart
              ? "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800"
              : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
          }`}
        >
          {isInCart ? (
            <>
              <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Sumado ({cartItem?.quantity})</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Al Pedido</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
