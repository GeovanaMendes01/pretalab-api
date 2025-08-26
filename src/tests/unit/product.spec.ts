import { getAllProductsService } from "../../service/product";

describe("Service - getAllProductsService", () => {
  it("deve retornar um array (pode estar vazio)", () => {
    const result = getAllProductsService();
    expect(Array.isArray(result)).toBe(true);
  });

  it("se houver itens, valida o formato do primeiro", () => {
    const result = getAllProductsService();
    if (result.length) {
      expect(result[0]).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        price: expect.any(Number),
      });
    }
  });
});