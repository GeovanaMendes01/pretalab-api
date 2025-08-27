import { chatAiPurchases } from "../../service/prompt";
import * as gemini from "../../service/gemini";
import * as history from "../../service/chatHistory";
import * as purchaseSvc from "../../service/purchase";

jest.mock("../../service/gemini");
jest.mock("../../service/chatHistory");
jest.mock("../../service/purchase");

describe("Service - chatAiPurchases (IA de compras)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("monta contexto, chama a IA (shoppingAssistant) e retorna response + context", async () => {
    const loadConversationMock = history.loadConversation as jest.MockedFunction<typeof history.loadConversation>;
    const saveMessageMock = history.saveMessage as jest.MockedFunction<typeof history.saveMessage>;
    const listPurchasesMock = purchaseSvc.listPurchasesFromDB as jest.MockedFunction<typeof purchaseSvc.listPurchasesFromDB>;
    const shoppingMock = gemini.shoppingAssistant as jest.MockedFunction<typeof gemini.shoppingAssistant>;

    loadConversationMock.mockResolvedValueOnce([
      { role: "user", text: "Oi" },
    ]);

    listPurchasesMock.mockResolvedValueOnce([
      {
        id: "p1",
        date: "2024-07-28T14:45:12Z",
        total: 7850,
        items: [{ productId: 1, quantity: 1, name: "Notebook Gamer Pro", price: 7500 }],
      },
    ]);

    shoppingMock.mockResolvedValueOnce({
      candidates: [{ content: { parts: [{ text: "Ok! Análise das compras feita." }] } }],
    } as any);

    saveMessageMock.mockResolvedValue(undefined as any);

    const res = await chatAiPurchases("Qual minha compra mais cara?");

    expect(res).toMatchObject({
      response: expect.stringContaining("Análise"),
      context: expect.any(Array),
    });

    expect(res.context).toHaveLength(2);
    expect(res.context[0]).toMatchObject({ role: "user", parts: [{ text: "Oi" }] });
    expect(res.context[1]).toMatchObject({ role: "user", parts: [{ text: "Qual minha compra mais cara?" }] });

    expect(saveMessageMock).toHaveBeenCalledTimes(2);
    expect(saveMessageMock.mock.calls[0]).toMatchObject([
      "default-purchases",
      "user",
      "Qual minha compra mais cara?",
      "purchases",
    ]);
    expect(saveMessageMock.mock.calls[1]).toMatchObject([
      "default-purchases",
      "model",
      expect.any(String),
      "purchases",
    ]);
  });
});