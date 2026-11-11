import { SITE_CONFIG } from "@/config/site.config";
import { Product } from "@/modules/catalog/domain/product.model";
import { CartItem } from "@/modules/cart/domain/cart-item.model";

export class WhatsAppMessageBuilder {
  private readonly phoneNumber: string;

  constructor(phoneNumber: string = SITE_CONFIG.whatsappNumber) {
    this.phoneNumber = phoneNumber;
  }

  /**
   * Construye un mensaje general de bienvenida y consulta de stock
   */
  buildGeneralInquiry(): string {
    const text = [
      "¡Hola! 👋 Vi la web de *Pinturería y Ferretería Limache*.",
      "Quería consultar por stock y precios de materiales. ¿Tienen disponible?",
    ].join("\n\n");

    return this.createWhatsAppUrl(text);
  }

  /**
   * Construye un mensaje de consulta por un producto puntual del catálogo
   */
  buildProductInquiry(product: Product): string {
    const text = [
      `¡Hola! 👋 Vi este producto en el catálogo web de *${SITE_CONFIG.shortName}*:`,
      `📦 *${product.name}*`,
      `• Unidad: ${product.unit}`,
      `• Rubro: ${product.categorySlug.toUpperCase()}`,
      "",
      "¿Tienen stock disponible en el local para pasar a retirar?",
    ].join("\n");

    return this.createWhatsAppUrl(text);
  }

  /**
   * Construye un mensaje de pedido/cotización con lista de materiales del carrito
   */
  buildCartQuote(items: CartItem[], clientNotes?: string): string {
    if (items.length === 0) {
      return this.buildGeneralInquiry();
    }

    const lines: string[] = [
      `¡Hola *${SITE_CONFIG.shortName}*! 📋 Armé este pedido en la web para consultar stock y pasar a retirar:`,
      "",
    ];

    items.forEach((item, index) => {
      lines.push(
        `${index + 1}. *${item.quantity}x* ${item.product.name} (${item.product.unit})`
      );
      if (item.notes) {
        lines.push(`   └ Nota: ${item.notes}`);
      }
    });

    lines.push("");
    lines.push(`Total de materiales: ${items.length} ${items.length === 1 ? "ítem" : "ítems"}`);

    if (clientNotes && clientNotes.trim().length > 0) {
      lines.push(`📝 *Aclaración del cliente:* ${clientNotes.trim()}`);
    }

    lines.push("");
    lines.push("¿Me confirman si tienen todo en stock y el presupuesto final? ¡Muchas gracias!");

    return this.createWhatsAppUrl(lines.join("\n"));
  }

  private createWhatsAppUrl(messageText: string): string {
    const encoded = encodeURIComponent(messageText);
    return `https://wa.me/${this.phoneNumber}?text=${encoded}`;
  }
}

export const whatsAppMessageBuilder = new WhatsAppMessageBuilder();
