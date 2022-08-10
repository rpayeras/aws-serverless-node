import { getProductsList } from "../../src/functions/getProductsList/handler";
import { awsParamsMock } from "../mocks/mockParams";

describe("getProductsList tests", () => {
  test("should return a product list", async () => {
    const { event } = awsParamsMock;
    const res = await getProductsList(event);

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body).data.length).toBeGreaterThan(0);
  });
});
