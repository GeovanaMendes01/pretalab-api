import { Product } from "../../core/entities/Product";
import { ProductRepository } from "../../core/repositories/ProductRepository";
import { mongooseProduct } from "./mongooseProduct";

export class MongoProductRepository implements ProductRepository {
  async getAll(): Promise<Product[]> {
    const docs = await mongooseProduct.find();
    return docs.map((d) => d.toJSON() as Product);
  }
}