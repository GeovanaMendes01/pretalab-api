import { Product } from "../core/entities/Product";
import { productsMem } from "../data.products";

export const getAllProductsService = (): Product[] => {
  return productsMem;
};

export const getAllProductsFromApi = async (): Promise<Product[]> => {
  const url = process.env.PRODUCTS_API_URL;
  if (!url) throw new Error("PRODUCTS_API_URL não definida");

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`REMOTE_API_${res.status}`);
  }
  const data = (await res.json()) as Product[];
  return data;
};