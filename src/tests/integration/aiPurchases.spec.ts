import request from "supertest";
import mongoose from "mongoose";
import app from "../../index";
import { mongoosePurchase } from "../../infra/database/mongoosePurchase";
import { mongooseChatMessage } from "../../infra/database/mongooseChat";
import { jest } from "@jest/globals";

const mockGeminiResponse = {
  candidates: [
    { content: { parts: [{ text: "OK! Analise feita sobre suas compras." }] } },
  ],
};

jest.mock("../../service/gemini", () => ({
  shoppingAssistant: jest.fn(async () => mockGeminiResponse),
  financialAssistent: jest.fn(), 
}));

describe("POST /ai/purchases (IA)", () => {
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
    await mongoosePurchase.deleteMany({});
    await mongooseChatMessage.deleteMany({});
  });

  it("retorna 200, usa compras do DB e grava histórico", async () => {
    await mongoosePurchase.create([
      {
        date: "2024-07-28T14:45:12Z",
        total: 7850,
        items: [
          { productId: 1, quantity: 1, name: "Notebook Gamer Pro",        price: 7500 },
          { productId: 2, quantity: 1, name: "Mouse Sem Fio Ultra-leve",  price:  350 },
        ],
      },
      {
        date: "2024-07-25T10:20:30Z",
        total: 3100,
        items: [
          { productId: 4, quantity: 1, name: 'Monitor 4K 27"',            price: 2500 },
          { productId: 5, quantity: 1, name: "Headset 7.1 Surround",      price:  600 },
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

    expect(msgs.length).toBe(2);
    expect(msgs).toMatchObject([
      { role: "user",  text: expect.any(String) },
      { role: "model", text: expect.any(String) },
    ]);
  });
});