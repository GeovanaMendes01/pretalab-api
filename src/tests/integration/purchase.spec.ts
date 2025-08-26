import request from "supertest";
import app from "../../index";
import mongoose from "mongoose";

describe("GET /purchases (integração)", () => {
  beforeAll(async () => {
    const uri = process.env.MONGODB_URI!;
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await new Promise(r => setImmediate(r));
  });

  it("deve retornar 200 e um array", async () => {
    const res = await request(app).get("/purchases");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});