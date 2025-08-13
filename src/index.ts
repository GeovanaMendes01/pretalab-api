import express from "express";
import { transactions } from "./data";
import { getTransactionById } from "./app/controller/transaction";
import { createTransaction } from "./app/controller/transaction";
import { aiResponse } from "./app/controller/ai";

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

app.post("/ai", async (req, res) => aiResponse(req, res));


export default app;
