import { ICatalogRepository } from "../domain/catalog.repository.interface";
import { Category, CategorySlug } from "../domain/category.model";
import { Product } from "../domain/product.model";
import { catalogRepository } from "../infrastructure/catalog.repository";

export class CatalogService {
  constructor(private readonly repository: ICatalogRepository = catalogRepository) {}

  async getAllCategories(): Promise<Category[]> {
    return this.repository.getCategories();
  }

  async getCategory(slug: CategorySlug | string): Promise<Category | null> {
    return this.repository.getCategoryBySlug(slug);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return this.repository.getFeaturedProducts();
  }

  async getProductsByCategory(categorySlug: CategorySlug | string): Promise<Product[]> {
    return this.repository.getProductsByCategory(categorySlug);
  }

  async searchProducts(query: string): Promise<Product[]> {
    return this.repository.searchProducts(query);
  }

  async getProduct(id: string): Promise<Product | null> {
    return this.repository.getProductById(id);
  }
}

export const catalogService = new CatalogService();
