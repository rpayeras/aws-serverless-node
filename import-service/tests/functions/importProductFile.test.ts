import { importProductFile } from "../../src/functions/importProductFile/handler";
import * as importProductFileRequestMock from "../mocks/requests/importProductFile.json";

import { mockClient } from "aws-sdk-client-mock";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

jest.mock("@aws-sdk/s3-request-presigner", () => {
  return {
    getSignedUrl: jest.fn(),
  };
});

describe("getProductsById tests", () => {
  const event = importProductFileRequestMock;

  const s3ClientMock = mockClient(S3Client);
  const testUrl = "https://test.com";

  beforeEach(() => {
    s3ClientMock.reset();
  });

  test("Should import a product", async () => {
    getSignedUrl.mockReturnValueOnce(testUrl);

    s3ClientMock.on(PutObjectCommand).resolves({});

    const { body } = await importProductFile(event);
    console.log();
    expect(JSON.parse(body).data).toBe(testUrl);
  });

  // test("should return a product by id", async () => {
  //   const { event } = awsParamsMock;

  //   const products = await readJson("./tests/mocks/products.json");

  //   ddbMock.on(GetCommand).resolves({
  //     Item: { id: "user1", name: "John" },
  //   });
  //   const names = await getUserNames(["user1"]);
  //   expect(names).toStrictEqual(["John"]);
  // });
});
