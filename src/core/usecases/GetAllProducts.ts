import { Product } from "../entities/Product";
import { MongoProductRepository } from "../../infra/database/MongoProductRepository";
import { productsMem } from "../../data.products";

const repo = new MongoProductRepository();

export const getAllProductsUseCase = async (): Promise<Product[]> => {
  try {
    const fromDb = await repo.getAll();
    if (!fromDb?.length) return productsMem;
    return fromDb;
  } catch {
    return productsMem;
  }
};