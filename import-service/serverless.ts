import "dotenv/config";

import type { AWS } from "@serverless/typescript";

import importProductFile from "@functions/importProductFile";
import importFileParser from "@functions/importFileParser";

const serverlessConfiguration: AWS = {
  service: "import-service",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-auto-swagger",
    "serverless-dotenv-plugin",
    "serverless-offline",
  ],
  useDotenv: true,
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    architecture: "arm64",
    region: "eu-west-1",
    memorySize: 512,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: ["s3:*"],
            Resource: [
              `arn:aws:s3:::${process.env.AWS_CLIENT_BUCKET}`,
              `arn:aws:s3:::${process.env.AWS_CLIENT_BUCKET}/*`,
            ],
          },
          {
            Effect: "Allow",
            Action: ["sqs:GetQueueUrl", "sqs:SendMessage"],
            Resource: [
              `arn:aws:sqs:${process.env.AWS_CLIENT_REGION}:${process.env.AWS_ACCOUNT_ID}:${process.env.AWS_CLIENT_SQS_CATALOG_ITEMS}`,
            ],
          },
        ],
      },
    },
  },
  functions: {
    importProductFile,
    importFileParser,
  },
  package: { individually: true, patterns: ["tests/mocks/products.csv"] },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node16",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    autoswagger: {
      title: "Import Products service",
      basePath: "/dev",
      host: "dg6etd0ogl.execute-api.eu-west-1.amazonaws.com",
      schemes: ["https"],
    },
    serverlessOffline: {
      httpPort: 3011,
    },
  },
};

module.exports = serverlessConfiguration;
