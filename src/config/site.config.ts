export interface StoreHours {
  weekdays: string;
  saturday: string;
  sundayGuard: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  phoneDisplay: string;
  whatsappNumber: string; // formato internacional sin signos ni espacios para wa.me
  address: {
    street: string;
    neighborhood: string;
    city: string;
    province: string;
    country: string;
    fullText: string;
    googleMapsUrl: string;
  };
  hours: StoreHours;
  paymentMethods: string[];
}

export const SITE_CONFIG: SiteConfig = {
  name: "Pinturería y Ferretería Limache",
  shortName: "Ferretería Limache",
  tagline: "Tu ferretería de confianza en Barrio Limache",
  description:
    "Catálogo digital de materiales, pinturas, herramientas, electricidad y plomería. Consultá stock y pedí cotización directa para retiro sin filas.",
  phoneDisplay: "+54 9 387 527-0706",
  whatsappNumber: "5493875270706",
  address: {
    street: "Etapa 10, Manzana 1, Casa 18",
    neighborhood: "Barrio Limache",
    city: "Salta Capital",
    province: "Salta",
    country: "Argentina",
    fullText: "Barrio Limache, Etapa 10, Manzana 1, Casa 18 — Salta Capital",
    googleMapsUrl: "https://maps.google.com/?q=Barrio+Limache+Salta+Capital",
  },
  hours: {
    weekdays: "Lunes a Viernes: 09:00 a 13:30 hs y 16:00 a 20:30 hs",
    saturday: "Sábados: 09:00 a 13:30 hs y 16:00 a 20:30 hs",
    sundayGuard: "Domingos: 10:00 a 14:00 hs (Guardia de Fin de Semana)",
  },
  paymentMethods: [
    "Efectivo (con descuento especial)",
    "Transferencia bancaria / Alias",
    "Mercado Pago",
    "Tarjetas de Débito",
  ],
};
