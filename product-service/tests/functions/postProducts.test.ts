import { awsParamsMock } from "../mocks/mockParams";
import { postProducts } from "../../src/functions/postProducts/handler";

describe("getProductsById tests", () => {
  test("should insert a product", async () => {
    const { event } = awsParamsMock;

    const eventMod = {
      ...event,
      method: "POST",
      params: {
        title: "title test",
        description: "description test",
        price: 100,
      },
    };

    const res = await postProducts(eventMod);

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body)).toBeTruthy();
  });
});
