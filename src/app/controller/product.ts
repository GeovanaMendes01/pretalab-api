import { Request, Response } from "express";
import { getAllProductsUseCase } from "../../core/usecases/GetAllProducts";

export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await getAllProductsUseCase();
    return res.status(200).json(products);
  } catch {
    return res.status(500).json({ message: "Erro ao buscar produtos" });
  }
};