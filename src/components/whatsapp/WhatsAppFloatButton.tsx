"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { useCart } from "@/modules/cart/application/cart.context";
import { whatsAppMessageBuilder } from "@/modules/whatsapp/domain/whatsapp-message.builder";

export function WhatsAppFloatButton() {
  const { totalItems, openCart } = useCart();

  const handleClick = (e: React.MouseEvent) => {
    // Si el usuario tiene productos en su lista de cotización, abrir el cotizador para confirmar envío
    if (totalItems > 0) {
      e.preventDefault();
      openCart();
    }
  };

  const generalUrl = whatsAppMessageBuilder.buildGeneralInquiry();

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      <a
        href={generalUrl}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl hover:scale-105 active:scale-95 transition-all focus:outline-none"
        aria-label="Contactar por WhatsApp a la ferretería"
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30 pointer-events-none" />
        <MessageCircle className="w-7 h-7 fill-white" />

        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-amber-400 text-zinc-950 text-xs font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-950 shadow-md">
            {totalItems}
          </span>
        )}
      </a>
    </div>
  );
}
