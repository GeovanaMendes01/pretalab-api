import app from "./index";
import { connectToDatabase } from "./infra/database/mongooseConection";
// import dotenv from "dotenv";

// dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Servidor rodando na porta ${PORT}`);
});