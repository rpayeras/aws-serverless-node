import { mockClient } from "aws-sdk-client-mock";
import {
  SQSClient,
  DeleteMessageCommand,
  GetQueueUrlCommand,
} from "@aws-sdk/client-sqs";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { catalogBatchProcess } from "../../src/functions/catalogBatchProcess/handler";
import event from "../mocks/requests/catalogBatchProcess.json";

console.log(typeof event);
const queueMockUrl = "https://test.url";

const publishParams = {
  TopicArn: `arn:aws:sns:${process.env.AWS_CLIENT_REGION}:${process.env.AWS_ACCOUNT_ID}:${process.env.AWS_CLIENT_SNS_CREATED_PRODUCTS}`,
  Subject: "New products were added to the database",
  Message: `Hi Roberto! New products have been added to the store! \n ${JSON.stringify(
    []
  )}`,
  MessageAttributes: {
    totalPrice: {
      DataType: "Number",
      StringValue: 100,
    },
  },
};

const getQueueUrlRes = {
  QueueUrl: queueMockUrl,
};

const getQueueParams = {
  QueueName: process.env.AWS_CLIENT_SQS_CATALOG_ITEMS,
};

const deleteMessageParams = {
  QueueUrl: queueMockUrl,
  ReceiptHandle: "testreceipt",
};

describe("Testing catalogBatchProcess", () => {
  const sqsClientMock = mockClient(SQSClient);
  const snsClientMock = mockClient(SNSClient);

  sqsClientMock.on(GetQueueUrlCommand, getQueueParams).resolves(getQueueUrlRes);
  sqsClientMock.on(DeleteMessageCommand, deleteMessageParams);
  snsClientMock.on(PublishCommand, publishParams);
  // test("should be called on receive a message in sqs", () => {});

  beforeEach(() => {
    // sqsClientMock.reset();
    // snsClientMock.reset();
  });

  test("should create products from the message", async () => {
    await catalogBatchProcess(event);

    expect(sqsClientMock).toHaveReceivedCommand(GetQueueUrlCommand);
    expect(sqsClientMock).toHaveReceivedCommand(DeleteMessageCommand);
    expect(snsClientMock).toHaveReceivedCommand(PublishCommand);
  });

  // test("should send a mail after insert the products", () => {});
});
