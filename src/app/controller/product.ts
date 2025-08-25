import { Request, Response } from "express";
import { getAllProductsFromApi } from "../../service/product";

export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await getAllProductsFromApi(); 
    return res.status(200).json(products);
  } catch (err: any) {
    
    const status =
      typeof err?.status === "number" ? err.status : 502; 
    const payload =
      err?.payload ?? { message: "Erro ao consultar API externa de produtos" };

    return res.status(status).json(payload);
  }
};