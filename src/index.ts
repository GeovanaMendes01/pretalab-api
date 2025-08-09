import express from "express";
import { transactions } from "./data";
import { getTransactionById } from "./app/controller/transaction";
import { createTransaction } from "./app/controller/transaction";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Transactions API" });
});

app.get("/transactions", (_req, res) => {
  res.json({ transactions });
});

app.get("/transactions/:id", (req, res) => getTransactionById(req, res));

app.post("/transactions", (req, res) => createTransaction(req, res));

export default app;
