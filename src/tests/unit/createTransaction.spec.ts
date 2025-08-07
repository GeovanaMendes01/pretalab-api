import { addTransaction } from "../../service/transactions";
import { Transaction } from "../../data";

describe("Service - addTransaction", () => {
  it("deve adicionar uma nova transação", () => {
    const novaTransacao: Transaction = {
      id: "1",
      description: "Teste",
      amount: 1000,
      date: "07-08-2025",
      type: "income",
      category: "Outros",
    };

    const resultado = addTransaction(novaTransacao);

    expect(resultado).toMatchObject(novaTransacao);
  });
});