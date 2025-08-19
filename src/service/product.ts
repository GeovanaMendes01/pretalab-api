import { Product } from "../core/entities/Product";
import { productsMem } from "../data.products";

export const getAllProductsService = (): Product[] => {
  return productsMem;
};