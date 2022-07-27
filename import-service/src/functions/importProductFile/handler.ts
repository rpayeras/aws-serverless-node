import {
  getFormatResponse,
  getFormatErrorResponse,
} from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";

import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { readStream } from "src/helpers/files";

// import schema from './schema';

export const importProductFile = async (event) => {
  console.log(event);

  const bucketName = process.env.AWS_CLIENT_BUCKET;
  const region = process.env.AWS_CLIENT_REGION;
  const { name: fileName } = event.queryStringParameters;
  const path = `uploaded/${fileName}`;

  if (!bucketName || !region)
    return getFormatErrorResponse(
      400,
      "Please set AWS_CLIENT_BUCKET and AWS_CLIENT_REGION"
    );
  if (!fileName)
    return getFormatErrorResponse(400, "Please provide queryString 'name'");

  // const fileStream = readStream(`./tests/mocks/products.csv`);

  const uploadParams = {
    Bucket: bucketName,
    Key: path,
    // CORSConfiguration: {
    //   CORSRules: [
    //     {
    //       AllowedHeaders: ["Authorization"],
    //       AllowedMethods: ["PUT"],
    //       AllowedOrigins: ["*"],
    //     },
    //   ],
    // },
    // Body: fileStream,
  };

  console.log(uploadParams);

  // const getParams = {
  //   Bucket: bucketName,
  //   Key: path,
  // };

  try {
    const s3Client = new S3Client({});
    const uploadCommand = new PutObjectCommand(uploadParams);

    // const uploadResponse = await s3Client.send(uploadCommand);

    // console.log(uploadResponse);

    // const getCommand = new GetObjectCommand(getParams);

    const signedUrl = await getSignedUrl(s3Client, uploadCommand, {
      expiresIn: 3600,
    });

    return getFormatResponse({
      data: signedUrl,
      // event,
    });
  } catch (err) {
    console.log(err);
    return getFormatErrorResponse(500, "Error on upload file to s3");
  }
};

export const main = middyfy(importProductFile);
