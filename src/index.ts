import express from "express";
import { transactions } from "./data";
import { getTransactionById } from "./controller/transaction";

const app = express();

app.get("/", (_req, res) => {
  res.json({ message: "Transactions API" });
});

app.get("/transactions", (_req, res) => {
  res.json({ transactions });
});

app.get("/transactions/:id", (req, res) => getTransactionById(req, res));


export default app;
