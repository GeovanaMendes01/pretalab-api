import { Purchase } from "./core/entities/Purchase";

export const purchasesMem: Purchase[] = [
  {
    id: "1",
    date: "2024-07-28T14:45:12Z",
    total: 7850,
    items: [
      { productId: 1, quantity: 1, name: "Notebook Gamer Pro", price: 7500 },
      { productId: 2, quantity: 1, name: "Mouse Sem Fio",      price: 350  },
    ],
  },
];
