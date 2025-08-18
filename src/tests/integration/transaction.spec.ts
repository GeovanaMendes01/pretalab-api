import request from "supertest";
import app from "./../../index";

describe("GET /transactions/:id", () => {
  it("deve retornar 200 e a transação correta", async () => {
    const res = await request(app).get("/transactions/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("transaction.id", "1");
  });

});