import { Transaction, transactions } from "../data";

export const transactionById = (id: string): Transaction | undefined => {
  return transactions.find((transaction) => transaction.id === id);
};

export const addTransaction = (data: Transaction): Transaction => {
  transactions.push(data);
  return data;
};