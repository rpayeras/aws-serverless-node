import 'dotenv/config';

import type { AWS } from "@serverless/typescript";

import getProductsList from "@functions/getProductsList";
import getProductsById from "@functions/getProductsById";
import postProducts from "@functions/postProducts";

const serverlessConfiguration: AWS = {
  service: "product-service",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-aws-documentation"],
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
  },
  functions: {
    getProductsList,
    getProductsById,
    postProducts
  },
  package: { individually: true },
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
    documentation: {
      api: {
        info: {
          version: "3",
          title: "Shop AWS Node API",
          description:
            "This api contains all endpoints to provide data for react frontend app",
          contact: {
            name: "Roberto Payeras",
          },
        },
        models: [
          {
            name: "RequestResponse",
            contentType: "application/json",
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "string",
                },
              },
            },
          },
          {
            name: "NotFoundResponse",
            contentType: "application/json",
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
                statusCode: {
                  type: "number",
                },
              },
            },
          },
        ],
      },
    },
  },
};

module.exports = serverlessConfiguration;
