import { transactionById } from "../../service/transactions";

describe("Service - transactionById", () => {
  it("deve retornar a transação com o ID correspondente", () => {
    const result = transactionById("1");
    expect(result).toHaveProperty("id", "1");
  });

  it("deve retornar undefined se o ID não for encontrado", () => {
    const result = transactionById("999");
    expect(result).toBeUndefined();
  });
});