import { Request, Response } from "express";
import { transactionById } from "../service/transactions";
import { addTransaction } from "../service/transactions";

export const getTransactionById = (req: Request, res: Response) => {
  const transaction = transactionById(req.params.id);
  res.json({ transaction });
};

export const createTransaction = (req: Request, res: Response) => {
  const { id, date, description, amount, type, category } = req.body;

  if (!id || !date || !description || !amount || !type || !category) {
    return res.status(400).json({ message: "Dados incompletos" });
  }

  const newTransaction = addTransaction({
    id,
    date,
    description,
    amount,
    type,
    category,
  });

  res.status(201).json({ transaction: newTransaction });
};