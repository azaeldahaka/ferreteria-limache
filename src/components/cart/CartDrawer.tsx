"use client";

import React, { useState } from "react";
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/modules/cart/application/cart.context";
import { whatsAppMessageBuilder } from "@/modules/whatsapp/domain/whatsapp-message.builder";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, clearCart, totalItems } =
    useCart();
  const [clientNotes, setClientNotes] = useState("");

  if (!isOpen) return null;

  const handleSendWhatsApp = () => {
    const url = whatsAppMessageBuilder.buildCartQuote(items, clientNotes);
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer Container con Safe-Area Top & Bottom */}
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-950 h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="px-5 py-4 pt-[calc(1rem+env(safe-area-inset-top,0px))] border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="font-extrabold text-base text-zinc-900 dark:text-white">
              Cotizador de Materiales
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
              {totalItems}
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Cerrar cotizador"
            className="w-9 h-9 flex items-center justify-center rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List con overscroll-contain para mobile */}
        <div className="flex-1 overflow-y-auto overscroll-y-contain px-5 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-zinc-400">
              <ShoppingBag className="w-12 h-12 text-zinc-300 dark:text-zinc-700 stroke-1" />
              <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Tu lista de cotización está vacía
              </p>
              <p className="text-xs text-zinc-500 max-w-xs">
                Navegá el catálogo y sumá materiales para armar tu pedido y consultar stock directo por WhatsApp.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-zinc-500 pb-1">
                <span>Materiales seleccionados ({items.length})</span>
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-600 font-semibold flex items-center gap-1 cursor-pointer py-1 px-1.5 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Vaciar lista
                </button>
              </div>

              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 flex items-center justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate break-words">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-zinc-500">
                      Unidad: {item.product.unit}
                    </p>
                  </div>

                  {/* Quantity Controller con Hit Area táctil optimizada */}
                  <div className="flex items-center gap-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-0.5 shrink-0">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center rounded text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                      title="Restar 1"
                      aria-label={`Restar una unidad de ${item.product.name}`}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold px-2 min-w-6 text-center text-zinc-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center rounded text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                      title="Sumar 1"
                      aria-label={`Sumar una unidad de ${item.product.name}`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors shrink-0"
                    title="Quitar"
                    aria-label={`Quitar ${item.product.name} del pedido`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Optional Client Note (con font-size 16px en móvil para evitar zoom) */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Aclaración o consulta adicional (opcional):
                </label>
                <textarea
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  placeholder="Ej: Paso a retirar hoy a las 18:30 hs, necesito factura B, o consultar por marcas específicas..."
                  rows={2}
                  className="w-full p-2.5 rounded-xl text-base sm:text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900 dark:text-white placeholder:text-zinc-400 transition-all"
                />
              </div>
            </>
          )}
        </div>

        {/* Footer Actions con Safe-Area Bottom */}
        <div className="p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] border-t border-zinc-200 dark:border-zinc-800 space-y-2 bg-zinc-50/80 dark:bg-zinc-900/80">
          <button
            onClick={handleSendWhatsApp}
            disabled={items.length === 0}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-white/20" />
            <span>Enviar Pedido a WhatsApp</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
          <p className="text-[11px] text-center text-zinc-500">
            Te comunicaremos directamente con la ferretería para confirmar stock y retiro sin fila.
          </p>
        </div>
      </div>
    </div>
  );
}
