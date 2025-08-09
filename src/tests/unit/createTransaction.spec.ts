import { addTransaction } from "../../service/transactions";
import { NewTransaction } from "../../core/entities/Transaction";

describe("Service - addTransaction", () => {
  it("deve adicionar uma nova transação", () => {
    const novaTransacao: NewTransaction = {
      description: "Teste",
      amount: 1000,
      date: "07-08-2025",
      type: "income",
      category: "Outros",
    };

    const resultado = addTransaction(novaTransacao);

    expect(resultado).toMatchObject({
      ...novaTransacao, 
      id: expect.any(String),   
    });
  });
});