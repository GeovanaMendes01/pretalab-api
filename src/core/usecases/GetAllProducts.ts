import { Product } from "../entities/Product";
import { MongoProductRepository } from "../../infra/database/MongoProductRepository";

const repo = new MongoProductRepository();

export const getAllProductsUseCase = async (): Promise<Product[]> => {
  return repo.getAll();
};