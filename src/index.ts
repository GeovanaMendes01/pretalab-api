import express from "express";
import { transactions } from "./data";
import { getAllTransactions, getTransactionById, createTransaction } from "./app/controller/transaction";
import { aiResponse } from "./app/controller/ai";
import { getAllPurchases, getPurchaseById, checkout } from "./app/controller/purchase";
import { getAllProducts } from "./app/controller/product";
import { aiPurchasesResponse } from "./app/controller/ai";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Transactions API" });
});

app.get("/transactions", getAllTransactions);

app.get("/transactions/:id", (req, res) => getTransactionById(req, res));

app.post("/transactions", (req, res) => createTransaction(req, res));

app.post("/ai", async (req, res) => aiResponse(req, res));

app.post("/chat", (req, res) => aiResponse(req, res));

app.get("/purchases", getAllPurchases);

app.get("/purchases/:id", (req, res) => getPurchaseById(req, res));

app.post("/purchases", (req, res) => aiPurchasesResponse(req, res));

app.post("/checkout", (req, res) => checkout(req, res));

app.get("/products", getAllProducts);

export default app;
