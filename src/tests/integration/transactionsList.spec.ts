import request from "supertest";
import app from "../../index";
import mongoose from "mongoose";
import { mongooseTransaction } from "../../infra/database/mongooseTransaction";

describe("GET /transactions ", () => {
  beforeAll(async () => {
    const uri = process.env.MONGODB_URI!;
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await new Promise((r) => setImmediate(r));
  });

  beforeEach(async () => {
    await mongooseTransaction.deleteMany({});
  });

  it("deve retornar 200 e listar transações do banco", async () => {
    await mongooseTransaction.create([
      { description: "Teste A", amount: 100, date: "2024-08-01", type: "income",  category: "Outros" },
      { description: "Teste B", amount: 200, date: "2024-08-02", type: "expense", category: "Contas" },
    ]);

    const res = await request(app).get("/transactions");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toMatchObject({
      id: expect.any(String),
      description: expect.any(String),
      amount: expect.any(Number),
      date: expect.any(String),
      type: expect.any(String),
      category: expect.any(String),
    });
  });
});