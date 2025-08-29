import request from "supertest";
import mongoose from "mongoose";
import app from "../../index";
import { mongooseTransaction } from "../../infra/database/mongooseTransaction";
import { mongooseChatMessage } from "../../infra/database/mongooseChat";
import { jest } from "@jest/globals";

const mockGeminiResponse = {
  candidates: [
    { content: { parts: [{ text: "OK! Analise feita sobre suas transações." }] } },
  ],
};

jest.mock("../../service/gemini", () => ({
  financialAssistent: jest.fn(async () => mockGeminiResponse),
  shoppingAssistant: jest.fn(), 
}));

describe("POST /ai", () => {
  beforeAll(async () => {
    const uri =
      process.env.MONGODB_URI_TEST ||
      process.env.MONGODB_URI ||
      "";
    if (!uri) throw new Error("Defina MONGODB_URI ou MONGODB_URI_TEST no ambiente de CI");
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await new Promise((r) => setImmediate(r));
  });

  beforeEach(async () => {
    await mongooseTransaction.deleteMany({});
    await mongooseChatMessage.deleteMany({});
  });

  it("retorna 200, usa transações do DB e grava histórico ", async () => {
    await mongooseTransaction.create([
      { description: "Salário", amount: 1000, date: "2024-07-01", type: "income",  category: "Salário" },
      { description: "Mercado", amount:  200, date: "2024-07-02", type: "expense", category: "Alimentação" },
    ]);

    const res = await request(app)
      .post("/ai")
      .send({ prompt: "Analise minhas transações" });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      response: expect.any(String),
      context: expect.any(Array),
    });

    const msgs = await mongooseChatMessage
      .find({ conversationId: "default-transactions" })
      .lean();

    expect(msgs.length).toBe(2);
    expect(msgs).toMatchObject([
      { role: "user",  text: expect.any(String) },
      { role: "model", text: expect.any(String) },
    ]);
  });
});