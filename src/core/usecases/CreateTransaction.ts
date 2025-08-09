import { NewTransaction, Transaction } from "../entities/Transaction";
import { MongoTransactionRepository } from "../../infra/database/MongoTransactionRepository";

const repo = new MongoTransactionRepository();

export async function createTransactionUseCase(data: NewTransaction): Promise<Transaction> {
  return repo.create(data);
}