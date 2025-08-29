import { Request, Response } from "express";
import { chatAiInteration } from "../../service/prompt";
import { chatAiPurchases } from "../../service/prompt";

export const aiResponse = async (req: Request, res: Response) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ message: "Campo 'prompt' é obrigatório" });
  }

  const result = await chatAiInteration(prompt); 
  return res.json(result);
};

export const aiPurchasesResponse = async (req: Request, res: Response) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ message: "Campo 'prompt' é obrigatório" });
  }
  const result = await chatAiPurchases(prompt);
  return res.json(result);
};