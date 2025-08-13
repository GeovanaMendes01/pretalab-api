import {Request, Response } from "express";
import { ai } from "../../service/prompt";

export const aiResponse = async (req: Request, res: Response) => {
    const {prompt} = req.body;

    const response = await ai(prompt);

    res.json(response);
};