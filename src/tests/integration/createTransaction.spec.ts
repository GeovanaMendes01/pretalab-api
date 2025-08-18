import request from "supertest";
import app from "../../index";
import mongoose from "mongoose";
import { mongooseTransaction } from "../../infra/database/mongooseTransaction";

describe("POST /transactions", () => {
    beforeAll(async () => {
    const uri = process.env.MONGODB_URI_TEST!;
    await mongoose.connect(uri); 
    });

    afterAll(async () => {
    await mongoose.disconnect();
    await new Promise((r) => setImmediate(r));
    });

    it("deve retornar 201 e a transação criada com id gerado", async () => {
        const novaTransacao = {
            description: "Compra de livros",
            amount: 153,
            date: "07-08-2025",
            type: "expense",
            category: "Educação"
        };

        const res = await request(app).post("/transactions").send(novaTransacao);

        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({transaction:novaTransacao});
        expect(res.body.transaction).toHaveProperty("id", expect.any(String));
    });

});