import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getFormatResponse } from "../../libs/api-gateway";
import csv from "csv-parser";

const importFileParser = async (event) => {
  console.log(event);

  const region = process.env.AWS_CLIENT_REGION;
  const file = event.Records[0];
  const client = new S3Client({ region });

  // Getting object
  const getCommand = new GetObjectCommand({
    Bucket: file.s3.bucket.name,
    Key: file.s3.object.key,
  });

  const fileStream = await client.send(getCommand);

  fileStream.Body.pipe(csv()).on("data", (data) => console.log(data));

  // Move object
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