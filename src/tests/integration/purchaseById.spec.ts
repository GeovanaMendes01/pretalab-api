import request from "supertest";
import app from "../../index";
import mongoose from "mongoose";
import { mongoosePurchase } from "../../infra/database/mongoosePurchase";

describe("GET /purchases/:id", () => {
  beforeAll(async () => {
    const uri = process.env.MONGODB_URI!;
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await new Promise((r) => setImmediate(r));
  });

  beforeEach(async () => {
    await mongoosePurchase.deleteMany({});
  });

  it("deve retornar 200 e a compra pelo id", async () => {
    const created = await mongoosePurchase.create({
      date: "2024-07-28T14:45:12Z",
      total: 7850,
      items: [{ productId: 1, quantity: 1, name: "Notebook Gamer Pro", price: 7500 }],
    });

    const { id } = created.toJSON() as { id: string };
    const res = await request(app).get(`/purchases/${id}`);
    
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id,
      date: expect.any(String),
      total: expect.any(Number),
      items: expect.any(Array),
    });
  });

  it("deve retornar 404 se não encontrar", async () => {
    const nonexistent = "66b4d6e5e7c7f9f9f9f9f9f9";
    const res = await request(app).get(`/purchases/${nonexistent}`);
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ message: "Compra não encontrada" });
  });
});