import { mongooseTransaction } from "./mongooseTransaction";
import { Transaction, NewTransaction } from "../../core/entities/Transaction";
import { TransactionRepository } from "../../core/repositories/TransactionRepository";

export class MongoTransactionRepository implements TransactionRepository {
  async create(data: NewTransaction): Promise<Transaction> {
    const saved = await mongooseTransaction.create(data);
    return saved.toJSON() as unknown as Transaction;
  }
  async list(): Promise<Transaction[]> {
    const transactions = await mongooseTransaction.find();
    return transactions.map(d => d.toJSON() as unknown as Transaction);
  }

  async findById(id: string): Promise<Transaction | null> {
    const doc = await mongooseTransaction.findById(id);
    return doc ? (doc.toJSON() as unknown as Transaction) : null;
  }
}
