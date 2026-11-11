import { Category, CategorySlug } from "./category.model";
import { Product } from "./product.model";

export interface ICatalogRepository {
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: CategorySlug | string): Promise<Category | null>;
  getProducts(): Promise<Product[]>;
  getProductsByCategory(categorySlug: CategorySlug | string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
}
