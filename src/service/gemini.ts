import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

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
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: {
                type: "object",
                properties: {
                    response: { type: "string" },
                },
            },
            systemInstruction: "Você é uma profissional de tecnologia, que atende crianças e precisa explicar as perguntas de forma didática. Toda pergunta que não for sobre tecnologia, diga que você não pode responder.",
        },
    });
    console.log(model);
    return model;
};