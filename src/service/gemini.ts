import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { Transaction } from "../core/entities/Transaction";
import { Purchase } from "../core/entities/Purchase";

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const generateText = async (prompt: string) =>
    ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
});

export const chat = async (prompt: any[]) => {
    const model = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    return model;
};

export const financialAssistent = async (prompt: any[], transactions: Transaction[]) => {
    const systemInstruction = "Você é uma assistente financeira e vai analisar os dados informados conforme a solicitação do usuário. Os dados informados estão dentro de um array e possuem valor, categoria, data, descrição e tipo (entrada e saída). Os dados informados são: ";

    const model = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            systemInstruction: `${systemInstruction} ${JSON.stringify(transactions)}`,
        },
    });
    return model;
};

export const shoppingAssistant = async (prompt: any[], purchases: Purchase[]) => {
    const systemInstruction = "Você é uma assistente de compras e vai analisar as compras informadas conforme solicitação do usuário. Os dados informados estão dentro de um array e possuem id, date, total e items (productId, quantity, name, price). Os dados informados são: ";
    
    const model = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            systemInstruction: `${systemInstruction} ${JSON.stringify(purchases)}`,
        },
    });
    return model;
};


