import { MongoPurchaseRepository } from "../../infra/database/MongoPurchaseRepository";
const repo = new MongoPurchaseRepository();

export const getPurchaseByIdUseCase = async (id: string) => {
  return repo.getById(id);
};