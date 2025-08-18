import app from "./index";
import { connectToDatabase } from "./infra/database/mongooseConection";


const PORT = 3000;


app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Servidor rodando na porta ${PORT}`);
});