import { chatAiInteration } from "../../service/prompt";
import * as gemini from "../../service/gemini";
import * as history from "../../service/chatHistory";
import * as tx from "../../service/transactions";
import { jest } from "@jest/globals";

jest.mock("../../service/gemini");
jest.mock("../../service/chatHistory");
jest.mock("../../service/transactions");

const asMock = <T extends (...args: any[]) => any>(fn: T) =>
  fn as unknown as jest.MockedFunction<T>;

describe("Service - chatAiInteration ", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("monta contexto (histórico + user), chama IA, retorna response e persiste 2 mensagens", async () => {
    asMock(history.loadConversation).mockResolvedValueOnce([
      {
        conversationId: "default-transactions",
        role: "user",
        text: "Oi",
        scope: "transactions",
        createdAt: new Date(),
      },
    ] as any);

    asMock(tx.listTransactionsFromDB).mockResolvedValueOnce([
      {
        id: "t1",
        date: "2024-08-01T00:00:00Z",
        description: "Mercado",
        amount: 200,
        type: "expense",
        category: "Alimentação",
      },
    ] as any);

    asMock(gemini.financialAssistent).mockResolvedValueOnce({
      candidates: [
        { content: { parts: [{ text: "Resumo: você gastou 200 em Alimentação." }] } },
      ],
    } as any);

    asMock(history.saveMessage).mockResolvedValue(undefined as any);

    const res = await chatAiInteration("Quanto gastei?");

    expect(res).toMatchObject({
      response: "Resumo: você gastou 200 em Alimentação.",
      context: expect.any(Array),
    });

    expect(res.context).toHaveLength(2);
    expect(res.context[0]).toMatchObject({ role: "user", parts: [{ text: "Oi" }] });
    expect(res.context[1]).toMatchObject({ role: "user", parts: [{ text: "Quanto gastei?" }] });

    expect(history.saveMessage).toHaveBeenCalledTimes(2);
    expect(asMock(history.saveMessage).mock.calls[0]).toMatchObject([
      "default-transactions",
      "user",
      "Quanto gastei?",
      "transactions",
    ]);
    expect(asMock(history.saveMessage).mock.calls[1]).toMatchObject([
      "default-transactions",
      "model",
      "Resumo: você gastou 200 em Alimentação.",
      "transactions",
    ]);
  });
});