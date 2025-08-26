import request from "supertest";
import app from "../../index";
import mongoose from "mongoose";
import { mongoosePurchase } from "../../infra/database/mongoosePurchase";

describe("POST /checkout", () => {
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

  it("deve criar a compra e retornar 201", async () => {
    const body = {
      items: [
        { productId: 1, quantity: 1, name: "Notebook Gamer Pro", price: 7500 },
        { productId: 2, quantity: 2, name: "Mouse Sem Fio",      price: 350  },
      ],
    };

    const res = await request(app).post("/checkout").send(body);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: expect.any(String),
      date: expect.any(String),
      total: 8200,
      items: expect.any(Array),
    });
    expect(res.body.items).toHaveLength(2);
  });

  it("deve retornar 400 quando total > 20000", async () => {
    const body = {
      items: [
        { productId: 99, quantity: 1, name: "PC TOP", price: 15000 },
        { productId: 98, quantity: 1, name: "Monitor 4K", price: 7000 },
      ],
    }; 

    const res = await request(app).post("/checkout").send(body);

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      message: "O valor total da compra excede o limite de R$20.000.",
    });
  });
});