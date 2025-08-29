import { mongooseChatMessage } from "../infra/database/mongooseChat";

export type ChatRole = "user" | "model";
export type ChatScope = "transactions" | "purchases" | "general";

export interface ChatRecord {
  id: string;
  conversationId: string;
  role: ChatRole;
  text: string;
  scope: ChatScope;
  createdAt: string;
}

export const saveMessage = async (
  conversationId: string,
  role: ChatRole,
  text: string,
  scope: ChatScope = "transactions"
): Promise<void> => {
  await mongooseChatMessage.create({ conversationId, role, text, scope });
};

export const loadConversation = async (
  conversationId: string
): Promise<{ role: ChatRole; text: string }[]> => {
  const docs = await mongooseChatMessage
    .find({ conversationId })
    .sort({ createdAt: 1 });
  return docs.map((d) => ({ role: d.role as ChatRole, text: d.text as string }));
};