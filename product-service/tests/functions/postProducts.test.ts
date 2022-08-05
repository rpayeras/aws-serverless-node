import event from "../mocks/requests/postProducts.json";
import { postProducts } from "../../src/functions/postProducts/handler";

describe("getProductsById tests", () => {
  test("should insert a product", async () => {
    const result = await postProducts(event);

    const res = await postProducts(event);

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body)).toBeTruthy();
  });
});
