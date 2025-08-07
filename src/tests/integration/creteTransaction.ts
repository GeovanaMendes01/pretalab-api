import request from "supertest";
import app from "../../index";

describe("POST /transactions", () => {
    it("deve retornar 201 e a transação criada", async () => {
        const novaTransacao = {
            id: "2",
            description: "Compra de livros",
            amount: 150,
            date: "07-08-2025",
            type: "expense",
            category: "Educação"
        };

        const res = await request(app).post("/transactions").send(novaTransacao);

        expect(res.status).toBe(201);
        expect(res.body.transaction).toMatchObject(novaTransacao);
    });

});