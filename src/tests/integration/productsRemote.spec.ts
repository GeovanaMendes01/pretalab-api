import request from "supertest";
import nock from "nock";
import app from "../../index";

describe("GET /products - integração API externa", () => {
  const base = "https://fake-api.example.com";
  const path = "/products";
  const saved = process.env.PRODUCTS_API_URL;
  
  beforeAll(() => {
    process.env.PRODUCTS_API_URL = `${base}${path}`;
    nock.disableNetConnect();
    nock.enableNetConnect(/(127\.0\.0\.1|localhost)/);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  afterAll(() => {
    process.env.PRODUCTS_API_URL = saved;
    nock.enableNetConnect();
  });

  it("retorna 200 e a lista da API externa", async () => {
    const payload = [
        { id: "1", name: "Notebook Gamer Pro", price: 7500 },
        { id: "2", name: "Mouse Sem Fio Ultra-leve", price: 350 },
        { id: "3", name: "Teclado Mecânico RGB", price: 550 },
        { id: "4", name: 'Monitor 4K 27"', price: 2500 },
        { id: "5", name: "Headset 7.1 Surround", price: 600 },
        { id: "6", name: "Webcam Full HD", price: 400 },
        { id: "7", name: "SSD NVMe 1TB", price: 800 },
    ];

    nock(base).get(path).reply(200, payload);

    const res = await request(app).get("/products");

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(payload);
  });

  it("propaga o erro da API (status + body)", async () => {
    const upstream = { message: "upstream down" };
    nock(base).get(path).reply(503, upstream);

    const res = await request(app).get("/products");

    expect(res.status).toBe(503);
    expect(res.body).toMatchObject(upstream);
  });
  
});
