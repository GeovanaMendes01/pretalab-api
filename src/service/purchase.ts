import { Purchase, PurchaseItem } from "../core/entities/Purchase";
import { purchasesMem } from "../data.purchases";

export const getAllPurchasesService = (): Purchase[] => {
  return purchasesMem;
};

export const purchaseById = (id: string): Purchase | undefined => {
  return purchasesMem.find((p) => p.id === id);
};

export const calcTotal = (items: PurchaseItem[]): number => {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
};