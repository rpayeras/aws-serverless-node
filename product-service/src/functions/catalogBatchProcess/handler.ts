import { createProductAndStock } from "../../services/Product";
import {
  SQSClient,
  DeleteMessageCommand,
  GetQueueUrlCommand,
} from "@aws-sdk/client-sqs";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

export const catalogBatchProcess = async (event) => {
  const region = process.env.AWS_REGION;
  console.log(event);

  const message = event.Records[0];
  const records = JSON.parse(message.body);
  const insertQueries = [];

  console.log(`Inserting next records ${records}`);

  records.forEach((record, idx) => {
    const { title, description, price, count } = record;
    const errors: string[] = [];

    if (!title || !description) {
      errors.push(
        `Record: "${idx}" Title/Description is mandatory ${JSON.stringify(
          record
        )}`
      );
    }

    if (isNaN(price)) {
      errors.push(
        `Record: "${idx}" Price must be numeric: ${JSON.stringify(record)}`
      );
    }

    if (errors.length > 0) {
      console.log(errors.join(","));
    } else {
      insertQueries.push(
        createProductAndStock({
          title,
          description,
          price,
          count,
        })
      );
    }
  });

  await Promise.allSettled(insertQueries).then(async (results) => {
    console.log(`Inserts done, results: ${JSON.stringify(results)}`);

    const clientSqs = new SQSClient({ region });
    const clientSns = new SNSClient({ region });

    const totalPrice = results
      .map((result) => result.status === "fulfilled" && result.value.price)
      .reduce((a, b) => a + b, 0);

    try {
      const queueObj = await clientSqs.send(
        new GetQueueUrlCommand({
          QueueName: process.env.AWS_CLIENT_SQS_CATALOG_ITEMS,
        })
      );

      await clientSqs.send(
        new DeleteMessageCommand({
          QueueUrl: queueObj.QueueUrl,
          ReceiptHandle: message.receiptHandle,
        })
      );

      console.log(`Message ${message.messageId} deleted`);

      await clientSns.send(
        new PublishCommand({
          TopicArn: `arn:aws:sns:${process.env.AWS_CLIENT_REGION}:${process.env.AWS_ACCOUNT_ID}:${process.env.AWS_CLIENT_SNS_CREATED_PRODUCTS}`,
          Subject: "New products were added to the database",
          Message: `Hi Roberto! New products have been added to the store! \n ${JSON.stringify(
            results
          )}`,
          MessageAttributes: {
            totalPrice: {
              DataType: "Number",
              StringValue: totalPrice.toString(),
            },
          },
        })
      );
    } catch (err) {
      console.log(err);
    }
  });
};

export const main = catalogBatchProcess;
