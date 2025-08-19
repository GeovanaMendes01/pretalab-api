import { Request, Response } from "express";
import { getAllPurchasesUseCase } from "../../core/usecases/GetAllPurchases";
import { getPurchaseByIdUseCase } from "../../core/usecases/GetPurchaseById";
import { checkoutUseCase } from "../../core/usecases/Checkout";

export const getAllPurchases = async (_req: Request, res: Response) => {
  try {
    const purchases = await getAllPurchasesUseCase();
    return res.status(200).json(purchases);
  } catch {
    return res.status(500).json({ message: "Erro ao buscar histórico de compras" });
  }
};

export const getPurchaseById = async (req: Request, res: Response) => {
  try {
    const purchase = await getPurchaseByIdUseCase(req.params.id);
    if (!purchase) return res.status(404).json({ message: "Compra não encontrada" });
    return res.status(200).json(purchase);
  } catch {
    return res.status(500).json({ message: "Erro ao buscar compra" });
  }
};

export const checkout = async (req: Request, res: Response) => {
  try {
    const { items } = req.body;

    const purchase = await checkoutUseCase(items);

    return res.status(201).json(purchase);
  } catch (e: any) {
    if (e?.message === "LIMIT_EXCEEDED") {
      return res
        .status(400)
        .json({ message: "O valor total da compra excede o limite de R$20.000." });
    }
    if (e?.message === "BAD_REQUEST") {
      return res.status(400).json({ message: "Corpo inválido." });
    }
    return res.status(500).json({ message: "Erro ao processar checkout" });
  }
};