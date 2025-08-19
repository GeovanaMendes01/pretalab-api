import { purchaseById } from "../../service/purchase";

describe("Service - purchaseById", () => {
  it("deve retornar a compra com o ID correspondente", () => {
    const result = purchaseById("1");
    expect(result).toMatchObject({ id: "1" });
  });

  it("deve retornar undefined se o ID não for encontrado", () => {
    const result = purchaseById("999");
    expect(result).toBeUndefined();
  });
});