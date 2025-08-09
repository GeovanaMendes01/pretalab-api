import { Request, Response } from "express";
import { transactionById } from "../../service/transactions";
import { addTransaction } from "../../service/transactions";
import { createTransactionUseCase } from "../../core/usecases/CreateTransaction";

export const getTransactionById = (req: Request, res: Response) => {
  const transaction = transactionById(req.params.id);
  res.json({ transaction });
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const newTransaction = await createTransactionUseCase(req.body); 
    return res.status(201).json({ transaction: newTransaction });
  } catch {
    return res.status(400).json({ message: "Erro ao criar transação" });
  }
};