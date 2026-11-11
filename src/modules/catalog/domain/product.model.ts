import { CategorySlug } from "./category.model";

export interface Product {
  id: string;
  name: string;
  slug: string;
  categorySlug: CategorySlug;
  description: string;
  unit: string; // ej. "Litro", "Balde 20L", "Unidad", "Metro", "Caja x 100"
  estimatedPrice?: number;
  inStock: boolean;
  featured?: boolean;
  tags: string[];
}
