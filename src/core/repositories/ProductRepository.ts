import { Product } from "../entities/Product";

export interface ProductRepository {
  getAll(): Promise<Product[]>;
}