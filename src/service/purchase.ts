import { Purchase, PurchaseItem } from "../core/entities/Purchase";
import { purchasesMem } from "../data.purchases";
import { mongoosePurchase } from "../infra/database/mongoosePurchase";

export const getAllPurchasesService = (): Purchase[] => {
  return purchasesMem;
};

export const purchaseById = (id: string): Purchase | undefined => {
  return purchasesMem.find((p) => p.id === id);
};

export const calcTotal = (items: PurchaseItem[]): number => {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
};

export const listPurchasesFromDB = async (): Promise<Purchase[]> => {
  const docs = await mongoosePurchase.find();
  return docs.map((d) => d.toJSON() as Purchase);
};