import { Purchase, PurchaseItem } from "../entities/Purchase";
import { MongoPurchaseRepository } from "../../infra/database/MongoPurchaseRepository";
import { calcTotal } from "../../service/purchase"; // usa do service

const repo = new MongoPurchaseRepository();

export async function checkoutUseCase(items: PurchaseItem[]): Promise<Purchase> {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("BAD_REQUEST");
  }

  const total = calcTotal(items);

  if (total > 20000) {
    throw new Error("LIMIT_EXCEEDED");
  }

  const data = {
    date: new Date().toISOString(),
    total,
    items,
  };

  const saved = await repo.create!(data);
  return saved;
}