import mongoose from "mongoose";
import { mongoosePurchase } from "./mongoosePurchase";
import { Purchase } from "../../core/entities/Purchase";
import { PurchaseRepository } from "../../core/repositories/PurchaseRepository";

export class MongoPurchaseRepository implements PurchaseRepository {
  async getAll(): Promise<Purchase[]> {
    const purchases = await mongoosePurchase.find();
    return purchases.map((p) => p.toJSON() as Purchase);
  }

  async getById(id: string): Promise<Purchase | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const doc = await mongoosePurchase.findById(new mongoose.Types.ObjectId(id));
    return doc ? (doc.toJSON() as Purchase) : null;
  }

  async create(data: Omit<Purchase, "id">): Promise<Purchase> {
    const saved = await mongoosePurchase.create(data);
    return saved.toJSON() as Purchase;
  }
}