import { Request, Response } from "express";
import { transactionById } from "../../service/transactions";
import { addTransaction } from "../../service/transactions";
import { createTransactionUseCase } from "../../core/usecases/CreateTransaction";
import { getAllTransactionsUseCase } from "../../core/usecases/GetAllTransactions";
import { getTransactionByIdUseCase } from "../../core/usecases/GetTransactionById";

export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const transaction = await getTransactionByIdUseCase(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Transação não encontrada" });
    return res.status(200).json({ transaction });
  } catch {
    return res.status(500).json({ message: "Erro ao buscar transação" });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const newTransaction = await createTransactionUseCase(req.body); 
    return res.status(201).json({ transaction: newTransaction });
  } catch {
    return res.status(400).json({ message: "Erro ao criar transação" });
  }
};

export const getAllTransactions = async (_req: Request, res: Response) => {
  try {
    const list = await getAllTransactionsUseCase();
    return res.status(200).json(list); 
  } catch {
    return res.status(500).json({ message: "Erro ao buscar transações" });
  }
};