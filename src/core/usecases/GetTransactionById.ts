import { MongoTransactionRepository } from "../../infra/database/MongoTransactionRepository";
import { Transaction } from "../entities/Transaction";

const repo = new MongoTransactionRepository();

export async function getTransactionByIdUseCase(id: string): Promise<Transaction | null> {
  return repo.findById(id);
}