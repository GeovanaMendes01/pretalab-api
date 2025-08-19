import { getAllPurchasesService } from "../../service/purchase"

describe("Service - getAllPurchasesService", () => {
  it("deve retornar um array (pode estar vazio)", () => {
    const result = getAllPurchasesService();
    expect(Array.isArray(result)).toBe(true);
  });

  it("se houver itens, valida o formato do primeiro", () => {
    const result = getAllPurchasesService();
    if (result.length) {
      expect(result[0]).toMatchObject({
        id: expect.any(String),
        date: expect.any(String),
        total: expect.any(Number),
        items: expect.any(Array),
      });
    }
  });
});