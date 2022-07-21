import { getProductsById } from "../../src/functions/getProductsById/handler";
import { awsParamsMock } from "../mocks/mockParams";
import { readJson } from "../../src/helpers/files";

describe("getProductsById tests", () => {
  test("should return a product by id", async () => {
    const { event } = awsParamsMock;

    const products = await readJson("./tests/mocks/products.json");

    const eventMod = {
      ...event,
      pathParameters: {
        productId: products[0].id,
      },
    };

    const res = await getProductsById(eventMod);
    const body = JSON.parse(res.body);

    expect(res.statusCode).toBe(200);

    expect(body.data).toBeTruthy();
  });

  test("should return not found when id not exists", async () => {
    const { event } = awsParamsMock;

    const eventMod = {
      ...event,
      pathParameters: {
        productId: "testparam",
      },
    };

    const res = await getProductsById(eventMod);

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Format of productId is invalid");
  });
});
