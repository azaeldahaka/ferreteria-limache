import { ICatalogRepository } from "../domain/catalog.repository.interface";
import { Category, CategorySlug } from "../domain/category.model";
import { Product } from "../domain/product.model";
import { CATEGORIES_DATA, PRODUCTS_DATA } from "./catalog.data";

export class StaticCatalogRepository implements ICatalogRepository {
  async getCategories(): Promise<Category[]> {
    return CATEGORIES_DATA;
  }

  async getCategoryBySlug(slug: CategorySlug | string): Promise<Category | null> {
    const category = CATEGORIES_DATA.find((cat) => cat.slug === slug);
    return category ?? null;
  }

  async getProducts(): Promise<Product[]> {
    return PRODUCTS_DATA;
  }

  async getProductsByCategory(categorySlug: CategorySlug | string): Promise<Product[]> {
    return PRODUCTS_DATA.filter((p) => p.categorySlug === categorySlug);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return PRODUCTS_DATA.filter((p) => p.featured);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return PRODUCTS_DATA;

    return PRODUCTS_DATA.filter((p) => {
      const matchName = p.name.toLowerCase().includes(cleanQuery);
      const matchDesc = p.description.toLowerCase().includes(cleanQuery);
      const matchTags = p.tags.some((tag) => tag.toLowerCase().includes(cleanQuery));
      return matchName || matchDesc || matchTags;
    });
  }

  async getProductById(id: string): Promise<Product | null> {
    const product = PRODUCTS_DATA.find((p) => p.id === id);
    return product ?? null;
  }
}

// Singleton de repositorio para consumo en servicios o RSC
export const catalogRepository = new StaticCatalogRepository();
