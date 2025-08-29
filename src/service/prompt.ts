import { geminiInteral } from "../adapters/gemini";
import { financialAssistent, shoppingAssistant } from "./gemini";
import { listTransactionsFromDB } from "./transactions";
import { listPurchasesFromDB } from "./purchase";
import { loadConversation, saveMessage } from "./chatHistory";

type GeminiMsg = { role: "user" | "model"; parts: Array<{ text: string }> };
const toGemini = (role: "user" | "model", text: string): GeminiMsg => ({
  role,
  parts: [{ text }],
});

const txConversationId = "default-transactions";

export const chatAiInteration = async (prompt: string) => {
  const history = await loadConversation(txConversationId);
  const transactionsData = await listTransactionsFromDB();

  const context: GeminiMsg[] = history.map((h) => toGemini(h.role as "user" | "model", h.text));
  context.push(toGemini("user", prompt));

  const raw = await financialAssistent(context, transactionsData);
  const { response } = geminiInteral(raw);

  await saveMessage(txConversationId, "user", prompt, "transactions");
  await saveMessage(txConversationId, "model", response, "transactions");

  return { response, context };
};

const purchasesConversationId = "default-purchases";

export const chatAiPurchases = async (prompt: string) => {
  const history = await loadConversation(purchasesConversationId);
  const purchasesData = await listPurchasesFromDB();

  const context: GeminiMsg[] = history.map((h) => toGemini(h.role as "user" | "model", h.text));
  context.push(toGemini("user", prompt));

  const raw = await shoppingAssistant(context, purchasesData);
  const { response } = geminiInteral(raw);

  await saveMessage(purchasesConversationId, "user", prompt, "purchases");
  await saveMessage(purchasesConversationId, "model", response, "purchases");

  return { response, context };
};