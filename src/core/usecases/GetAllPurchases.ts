import { MongoPurchaseRepository } from "../../infra/database/MongoPurchaseRepository";
import { Purchase } from "../entities/Purchase";

const repo = new MongoPurchaseRepository();

export const getAllPurchasesUseCase = async (): Promise<Purchase[]> => {
  return repo.getAll();
};