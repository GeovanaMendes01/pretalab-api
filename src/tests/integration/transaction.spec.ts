import request from "supertest";
import app from "../../index";
import mongoose from "mongoose";
import { mongooseTransaction } from "../../infra/database/mongooseTransaction";

describe("GET /transactions/:id ", () => {
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

  it("deve retornar 200 e a transação pelo id", async () => {
    const created = await mongooseTransaction.create({
      description: "Compra de livros",
      amount: 150,
      date: "2025-08-07",
      type: "expense",
      category: "Educação",
    });

    const id = created._id.toString();
    const res = await request(app).get(`/transactions/${id}`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      transaction: {
        id,
        description: "Compra de livros",
        amount: 150,
        date: expect.any(String),
        type: "expense",
        category: "Educação",
      },
    });
  });

  it("deve retornar 404 quando não encontrar", async () => {
    const nonexistent = "66b4d6e5e7c7f9f9f9f9f9f9";
    const res = await request(app).get(`/transactions/${nonexistent}`);
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ message: "Transação não encontrada" });
  });
});