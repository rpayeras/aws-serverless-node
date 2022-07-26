import {
  getFormatResponse,
  getFormatErrorResponse,
} from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// import schema from './schema';

export const importProductFile = async (event) => {
  const bucketName = process.env.AWS_BUCKET;
  const region = process.env.AWS_REGION;
  const { name: fileName } = event.queryStringParameters;

  if (!bucketName || !region)
    return getFormatErrorResponse(400, "Please set AWS_BUCKET and AWS_REGION");
  if (!fileName)
    return getFormatErrorResponse(400, "Please provide queryString 'name'");

  const fileStream = fs.createReadStream(`../../tests/mocks/products.csv`);

  const params = {
    Bucket: bucketName,
    Prefix: "uploads/",
    Key: fileName,
    Body: fileStream,
  };

  console.log(params);

  try {
    const s3Client = new S3Client({});

    const command = new PutObjectCommand(params);

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 36000,
    });

    const response = await s3Client.send(command);

    console.log(response);
    console.log(signedUrl);

    return getFormatResponse({
      data: [],
      // event,
    });
  } catch (err) {
    console.log(err);
    return getFormatErrorResponse(500, "Error on upload file to s3");
  }
};

export const main = middyfy(importProductFile);
