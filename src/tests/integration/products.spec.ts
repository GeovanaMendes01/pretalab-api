import request from "supertest";
import app from "../../index";
import mongoose from "mongoose";
import { mongooseProduct } from "../../infra/database/mongooseProduct";

describe("GET /products", () => {
  beforeAll(async () => {
    const uri = process.env.MONGODB_URI_TEST!;
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await new Promise((r) => setImmediate(r));
  });

  beforeEach(async () => {
    await mongooseProduct.deleteMany({});
  });

  it("deve retornar 200 e a lista de produtos", async () => {
    await mongooseProduct.create([
      { id: 1, name: "Notebook Gamer Pro", price: 7500 },
      { id: 2, name: "Mouse Sem Fio",      price: 350  },
    ]);

    const res = await request(app).get("/products");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
    expect(res.body[0]).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      price: expect.any(Number),
    });
  });
});