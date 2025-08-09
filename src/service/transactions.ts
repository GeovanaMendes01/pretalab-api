import { Transaction, NewTransaction } from "../core/entities/Transaction";
import { transactions } from "../data";

export const transactionById = (id: string): Transaction | undefined => {
  return transactions.find((t) => t.id === id);
};

export const addTransaction = (data: NewTransaction): Transaction => {
  const id = data.id ?? (globalThis.crypto?.randomUUID?.() || String(Date.now()));
  const newTx: Transaction = { ...data, id } as Transaction;
  transactions.push(newTx);
  return newTx;
};