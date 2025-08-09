import { Transaction, NewTransaction } from "../entities/Transaction";

export interface TransactionRepository {
  create(transaction: NewTransaction): Promise<Transaction>;
}