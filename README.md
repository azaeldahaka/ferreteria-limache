# Pinturería y Ferretería Limache — Catálogo Digital & Web Mobile-First

[![Live Demo](https://img.shields.io/badge/Vercel-Producci%C3%B3n%20Activa-success?style=flat&logo=vercel)](https://ferreteria-limache.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%204-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

Plataforma web comercial y catálogo interactivo mobile-first para **Pinturería y Ferretería Limache**, negocio local de Barrio Limache (Salta Capital). Diseñado para consulta rápida de stock, cotizaciones directas por WhatsApp y pedidos para retiro sin fila.

🌐 **Sitio Web Oficial en Producción:** [https://ferreteria-limache.vercel.app](https://ferreteria-limache.vercel.app)

---

## 📍 Datos Comerciales de la Ferretería

- **Nombre Comercial:** Pinturería y Ferretería Limache
- **Ubicación Física:** Barrio Limache, Etapa 10, Manzana 1, Casa 18 — Salta Capital
- **Teléfono / WhatsApp de Pedidos:** `+54 9 387 527-0706`
- **Enlace de WhatsApp Directo:** [wa.me/5493875270706](https://wa.me/5493875270706?text=Hola!%20Quería%20consultar%20por%20stock%20y%20precios)
- **Horarios de Atención:**
  - Lunes a Sábados: `09:00 a 13:30 hs` y `16:00 a 20:30 hs`
  - **Domingos (Guardia de Fin de Semana):** `10:00 a 14:00 hs` *(Diferencial clave para emergencias del barrio)*
- **Medios de Pago:** Efectivo (descuento), Transferencias bancarias / Alias, Mercado Pago y Tarjetas de Débito.

---

## 🎯 Propuesta de Valor y Solución Técnica

1. **Visibilidad en Google y Redes:** Indexación con Schema.org (`HardwareStore`, `LocalBusiness`), OpenGraph y sitemap para vecinos que buscan *"ferretería cerca de mí"* o en Google Maps.
2. **Atajo de Pedidos por WhatsApp:** Albañiles, pintores y vecinos pueden enviar la lista de materiales antes de salir de casa, consultar stock y pasar a retirar sin hacer fila.
3. **Catálogo de 6 Rubros Principales:**
   - 🎨 **Pinturería & Acabados:** Látex interior/exterior, esmaltes sintéticos, impermeabilizantes, rodillos, pinceles.
   - 🔧 **Herramientas & Máquinas:** Herramientas de mano, discos de corte, cintas métricas, niveles.
   - ⚡ **Electricidad & Iluminación:** Cables normalizados IRAM, llaves térmicas, tomas, lámparas LED.
   - 🚿 **Plomería & Conexiones:** Caños termofusión agua/gas, canillas esféricas, válvulas, selladores y teflón.
   - 🔩 **Tornillería & Fijación:** Tarugos con tope, tirafondos, autoperforantes, bulonería y clavos.
   - 🧱 **Construcción & Arreglos:** Cemento rápido, enduido interior, yeso, pegamentos y siliconas.

---

## 🏛️ Arquitectura de Software & Marco Ágil (Ing. de Software y Sistemas 3)

El proyecto implementa un diseño desacoplado siguiendo **Clean Architecture** adaptada a Next.js 15:

```
src/
├── app/                              # Presentation Layer (Rutas Next.js App Router)
│   ├── layout.tsx                    # Shell global, fuentes y metadatos
│   ├── page.tsx                      # Landing page principal y catálogo interactivo
│   └── sitemap.ts                    # Generador de sitemap XML dinámico
├── modules/
│   ├── catalog/                      # Módulo de Dominio: Catálogo de Productos
│   │   ├── domain/                   # Entidades, interfaces (ICatalogRepository)
│   │   ├── application/              # Casos de uso y servicios (CatalogService)
│   │   └── infrastructure/           # Implementación estática tipada in-memory
│   ├── cart/                         # Módulo de Dominio: Carrito & Cotizador
│   │   ├── domain/                   # Modelo CartItem
│   │   └── application/              # Contexto de estado reactivo y persistencia local
│   └── whatsapp/                     # Módulo de Dominio: Builder de Mensajería
│       └── domain/                   # WhatsAppMessageBuilder (Patrón Builder)
├── components/                       # Componentes UI (Mobile-First)
│   ├── layout/                       # Header, Footer, StoreStatusBadge (Guardia)
│   ├── catalog/                      # CatalogSection, ProductCard, SearchBar, CategoryPills
│   ├── cart/                         # CartDrawer (Cotizador deslizable)
│   └── whatsapp/                     # WhatsAppFloatButton
├── config/                           # Parámetros comerciales y de negocio
└── lib/                              # Utilidades transversales (Tailwind Merge)
```

### Patrones de Diseño Aplicados:
- **Repository Pattern (`ICatalogRepository`):** Desacopla la UI de la persistencia de datos (in-memory en v1 $\rightarrow$ extensible a base de datos externa sin cambiar contratos).
- **Builder Pattern (`WhatsAppMessageBuilder`):** Construcción estructurada de enlaces comerciales para WhatsApp Web / App con saltos de línea, emojis y detalle de materiales.
- **Compound Components:** Drawer de cotización y filtros con gestión de estado transparente.

---

## 🛠️ Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo local
npm run dev

# Compilar para producción (Type check + Build)
npm run build

# Ejecutar servidor de producción
npm start

# Análisis de código estático
npm run lint
```

---

## 👨‍💻 Autor

Proyecto desarrollado como trabajo integrador de **Ingeniería de Software** y **Sistemas 3** (Ingeniería Informática — UCASAL).
