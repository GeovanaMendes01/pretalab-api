import { Request, Response } from "express";
import { getAllProductsUseCase } from "../../core/usecases/GetAllProducts";
import { getAllProductsFromApi, getAllProductsService } from "../../service/product";

export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    if (process.env.PRODUCTS_API_URL) {
      const remote = await getAllProductsFromApi();
      return res.status(200).json(remote);
    }
    const db = await getAllProductsUseCase();
    return res.status(200).json(db);
  } catch {
    const fallback = getAllProductsService();
    return res.status(200).json(fallback);
  }
};