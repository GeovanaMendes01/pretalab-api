export type GeminiContent = {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> };
  }>;
};

export const geminiInteral = (data: GeminiContent) => {
  const response =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  return { response };
};