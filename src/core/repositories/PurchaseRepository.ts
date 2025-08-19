import { Purchase } from "../entities/Purchase";

export interface PurchaseRepository {
  getAll(): Promise<Purchase[]>;
  getById(id: string): Promise<Purchase | null>;
  create?(data: Omit<Purchase, "id">): Promise<Purchase>;
}