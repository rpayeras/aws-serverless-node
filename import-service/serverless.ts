import "dotenv/config";

import type { AWS } from "@serverless/typescript";

import importProductFile from "@functions/importProductFile";

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
            Action: ["s3:PutObject"],
            Resource: [`arn:aws:s3:::${process.env.AWS_BUCKET}/*`],
          },
        ],
      },
    },
  },
  functions: {
    importProductFile,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
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
  },
};

module.exports = serverlessConfiguration;
