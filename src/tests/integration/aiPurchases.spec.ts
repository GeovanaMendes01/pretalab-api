import request from "supertest";
import mongoose from "mongoose";
import app from "../../index";
import { mongoosePurchase } from "../../infra/database/mongoosePurchase";
import { mongooseChatMessage } from "../../infra/database/mongooseChat";
import { jest } from "@jest/globals";

const mockGeminiResponse = {
  candidates: [
    { content: { parts: [{ text: "OK! Análise de compras concluída." }] } },
  ],
};

jest.mock("../../service/gemini", () => ({
  shoppingAssistant: jest.fn(async () => mockGeminiResponse),
}));

describe("POST /purchases (IA)", () => {
  beforeAll(async () => {
    const uri = process.env.MONGODB_URI_TEST!;
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await new Promise((r) => setImmediate(r));
  });

  beforeEach(async () => {
    await mongoosePurchase.deleteMany({});
    await mongooseChatMessage.deleteMany({ scope: "purchases" });
  });

  it("retorna 200, usa compras do DB e grava histórico", async () => {
    await mongoosePurchase.create([
      {
        date: "2024-07-28T14:45:12Z",
        total: 7850,
        items: [
          { productId: 1, quantity: 1, name: "Notebook Gamer Pro", price: 7500 },
          { productId: 2, quantity: 1, name: "Mouse Sem Fio Ultra-leve", price: 350 },
        ],
      },
    ]);

    const res = await request(app)
      .post("/ai/purchases")
      .send({ prompt: "Analise minhas compras" });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      response: expect.any(String),
      context: expect.any(Array),
    });

    const msgs = await mongooseChatMessage
      .find({ conversationId: "default-purchases" })
      .lean();

    expect(msgs).toHaveLength(2);
    expect(msgs).toMatchObject([
      { role: "user", scope: "purchases", text: expect.any(String) },
      { role: "model", scope: "purchases", text: expect.any(String) },
    ]);
  });
});