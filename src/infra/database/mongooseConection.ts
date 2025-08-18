import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: "pretalab-transactions",
    });
    console.log("Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar no MongoDB", error);
    process.exit(1);
  }
};