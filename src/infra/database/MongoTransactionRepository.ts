import { mongooseTransaction } from "./mongooseTransaction";
import { Transaction, NewTransaction } from "../../core/entities/Transaction";
import { TransactionRepository } from "../../core/repositories/TransactionRepository";

export class MongoTransactionRepository implements TransactionRepository {
  async create(data: NewTransaction): Promise<Transaction> {
    const saved = await mongooseTransaction.create(data);
    return saved.toJSON() as unknown as Transaction;
  }
}
