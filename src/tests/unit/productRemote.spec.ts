import nock from "nock";
import { getAllProductsFromApi } from "../../service/product";

describe("Service - getAllProductsFromApi", () => {
    const base = "https://fake-api.example.com";
    const path = "/products";

    beforeAll(() => {
        process.env.PRODUCTS_API_URL = `${base}${path}`;
    });

    afterEach(() => {
        nock.cleanAll();
    });

    it("deve buscar produtos da API externa", async () => {
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

        const data = await getAllProductsFromApi();
        expect(data).toEqual(payload);
    });
});