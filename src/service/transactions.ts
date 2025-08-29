import { Transaction, NewTransaction } from "../core/entities/Transaction";
import { transactions } from "../data";
import { mongooseTransaction } from "../infra/database/mongooseTransaction";

export const transactionById = (id: string): Transaction | undefined => {
  return transactions.find((t) => t.id === id);
};

export const addTransaction = (data: NewTransaction): Transaction => {
  const id = data.id ?? (globalThis.crypto?.randomUUID?.() || String(Date.now()));
  const newTx: Transaction = { ...data, id } as Transaction;
  transactions.push(newTx);
  return newTx;
};

export const transaction = (): Transaction[] => {
  return transactions;
}

export const listTransactionsFromDB = async (): Promise<Transaction[]> => {
  const docs = await mongooseTransaction.find();
  return docs.map((d) => d.toJSON() as Transaction);
};

export const transactionByIdFromDB = async (
  id: string
): Promise<Transaction | null> => {
  const doc = await mongooseTransaction.findById(id);
  return doc ? (doc.toJSON() as Transaction) : null;
};