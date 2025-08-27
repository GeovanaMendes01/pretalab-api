import { geminiInteral } from "../adapters/gemini";
import { financialAssistent, shoppingAssistant } from "./gemini";
import { listTransactionsFromDB } from "./transactions";
import { loadConversation, saveMessage } from "./chatHistory";
import { listPurchasesFromDB } from "./purchase";

type GeminiMsg = { role: "user" | "model"; parts: Array<{ text: string }> };
const toGemini = (role: "user" | "model", text: string): GeminiMsg => ({
  role,
  parts: [{ text }],
});

const conversationId = "default-transactions";

export const chatAiInteration = async (prompt: string) => {
  const history = await loadConversation(conversationId);

  const transactionsData = await listTransactionsFromDB();

  const context: GeminiMsg[] = history.map((h: { role: "user" | "model"; text: string }) =>
    toGemini(h.role, h.text)
  );

  context.push(toGemini("user", prompt));

  const raw = await financialAssistent(context, transactionsData);
  const { response } = geminiInteral(raw);

  await saveMessage(conversationId, "user", prompt, "transactions");
  await saveMessage(conversationId, "model", response, "transactions");

  return { response, context };
};

const purchasesConversationId = "default-purchases";

export const chatAiPurchases = async (prompt: string) => {
  const history = await loadConversation(purchasesConversationId);

  const purchasesData = await listPurchasesFromDB();

  const context: GeminiMsg[] = history.map((h: any) =>
    toGemini(h.role, h.text)
  );

  context.push(toGemini("user", prompt));

  const raw = await shoppingAssistant(context, purchasesData);
  const { response } = geminiInteral(raw);

  await saveMessage(purchasesConversationId, "user", prompt, "purchases");
  await saveMessage(purchasesConversationId, "model", response, "purchases");

  return { response, context };
};