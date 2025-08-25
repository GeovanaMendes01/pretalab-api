import { Product } from "../core/entities/Product";
import { productsMem } from "../data.products";

export const getAllProductsService = (): Product[] => {
  return productsMem;
};

export const getAllProductsFromApi = async (): Promise<Product[]> => {
  const url = process.env.PRODUCTS_API_URL;
  if (!url) {
    const e: any = new Error("UPSTREAM_NOT_CONFIGURED");
    e.status = 500;
    e.payload = { message: "PRODUCTS_API_URL não configurada" };
    throw e;
  }

  const res = await fetch(url);

  const text = await res.text();
  let body: any = undefined;
  try {
    body = text ? JSON.parse(text) : undefined;
  } catch {
    body = text;
  }

  if (!res.ok) {
    const e: any = new Error("UPSTREAM_ERROR");
    e.status = res.status;
    e.payload =
      typeof body === "object" && body !== null
        ? body
        : { message: body || res.statusText };
    throw e;
  }

  return body as Product[];
};