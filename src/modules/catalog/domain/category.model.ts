export type CategorySlug =
  | "pintureria"
  | "herramientas"
  | "electricidad"
  | "plomeria"
  | "tornilleria"
  | "construccion";

export interface Category {
  id: string;
  slug: CategorySlug;
  name: string;
  shortName: string;
  iconName: string; // Lucide icon identifier
  description: string;
  featuredExamples: string[];
  badgeColor: string; // Tailwind color class for badges/accents
}
