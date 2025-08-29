import { MongoTransactionRepository } from "../../infra/database/MongoTransactionRepository";
import { Transaction } from "../entities/Transaction";

const repo = new MongoTransactionRepository();

export async function getAllTransactionsUseCase(): Promise<Transaction[]> {
  return repo.list();
}