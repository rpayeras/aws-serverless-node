import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getFormatResponse } from "../../libs/api-gateway";
import csv from "csv-parser";
import {
  SQSClient,
  SendMessageCommand,
  GetQueueUrlCommand,
} from "@aws-sdk/client-sqs";

const importFileParser = async (event) => {
  console.log(event);

  const region = process.env.AWS_REGION;
  const file = event.Records[0];
  const client = new S3Client({ region });
  const contentParsed = [];

  // Getting file from S3
  const getCommand = new GetObjectCommand({
    Bucket: file.s3.bucket.name,
    Key: file.s3.object.key,
  });

  const fileStream = await client.send(getCommand);

  // Logging and send it to sqs
  fileStream.Body.pipe(csv())
    .on("data", (data) => {
      console.log(data);

      contentParsed.push(data);
    })
    .on("end", async () => {
      const clientSqs = new SQSClient({ region });

      // Getting url of the current queue
      const getQueueCommand = new GetQueueUrlCommand({
        QueueName: process.env.AWS_CLIENT_CATALOG_ITEMS_QUEUE,
      });

      const queueUrl = await clientSqs.send(getQueueCommand);

      // Sending the message to the queue
      const command = new SendMessageCommand({
        QueueUrl: queueUrl.QueueUrl,
        MessageBody: JSON.stringify(contentParsed),
      });

      try {
        const data = await clientSqs.send(command);

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    });

  // Moving to parsed
  const moveCommand = new CopyObjectCommand({
    Bucket: file.s3.bucket.name,
    CopySource: `${file.s3.bucket.name}/${file.s3.object.key}`,
    Key: file.s3.object.key.replace("uploaded/", "parsed/"),
  });

  await client.send(moveCommand);

  // Delete old object
  const deleteCommand = new DeleteObjectCommand({
    Bucket: file.s3.bucket.name,
    Key: file.s3.object.key,
  });

  await client.send(deleteCommand);

  return getFormatResponse({
    data: event.Records,
    // event,
  });
};
export const main = importFileParser;
