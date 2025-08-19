import { calcTotal } from "../../service/purchase";

describe("Service - calcTotal", () => {
  it("soma price * quantity", () => {
    const total = calcTotal([
      { productId: 1, quantity: 1, name: "Notebook", price: 7500 },
      { productId: 2, quantity: 2, name: "Mouse",    price: 350  },
    ]);
    expect(total).toBe(7500 + 2 * 350); // 8200
  });

  it("retorna 0 para lista vazia", () => {
    expect(calcTotal([])).toBe(0);
  });
});