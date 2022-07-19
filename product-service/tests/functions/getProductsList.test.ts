import { getProductsList } from "../../src/functions/getProductsList/handler";
import { awsParamsMock } from "../mocks/mockParams";
import { createMockDatabase } from "../mocks/mockDatabase";
import { dbConnection } from "../../src/services/Database";

jest.mock("../../src/services/Database", () => {
  return {
    dbConnection: jest.fn(),
  };
});

beforeAll(async () => {
  const pool = await createMockDatabase();
  (dbConnection as jest.Mock).mockReturnValue(pool);
});

describe("getProductsList tests", () => {
  test("should return a product list", async () => {
    const { event } = awsParamsMock;

    const res = await getProductsList(event);

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body).data.length).toBeGreaterThan(0);
  });
});
