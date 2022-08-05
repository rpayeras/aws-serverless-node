import {
  getFormatResponse,
  getFormatErrorResponse,
} from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// import schema from './schema';

export const importProductFile = async (event) => {
  console.log(event);

  const bucketName = process.env.AWS_CLIENT_BUCKET;
  const region = process.env.AWS_REGION;
  const { name: fileName } = event.queryStringParameters;
  const path = `uploaded/${fileName}`;

  if (!bucketName)
    return getFormatErrorResponse(400, "Please provide AWS_CLIENT_BUCKET name");
  if (!fileName)
    return getFormatErrorResponse(400, "Please provide queryString 'name'");

  try {
    const s3Client = new S3Client({ region });

    const signedUrl = await getSignedUrl(
      s3Client,
      new PutObjectCommand({
        Bucket: bucketName,
        Key: path,
      }),
      {
        expiresIn: 3600,
      }
    );

    return getFormatResponse({
      data: signedUrl,
    });
  } catch (err) {
    console.log(err);
    return getFormatErrorResponse(500, "Error on upload file to s3");
  }
};

export const main = middyfy(importProductFile);
