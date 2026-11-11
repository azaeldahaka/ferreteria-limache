import { Product } from "@/modules/catalog/domain/product.model";

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
}
