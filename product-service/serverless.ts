import "dotenv/config";

import type { AWS } from "@serverless/typescript";

import getProductsList from "@functions/getProductsList";
import getProductsById from "@functions/getProductsById";
import postProducts from "@functions/postProducts";

const serverlessConfiguration: AWS = {
  service: "product-service",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-auto-swagger",
    "serverless-offline",
  ],
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
    postProducts,
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
      title: "string",
      swaggerFiles: [
        "./doc/endpointFromPlugin.json",
        "./doc/iCannotPutThisInHttpEvent.json",
        "./doc/aDefinitionWithoutTypescript.json",
      ],
      swaggerPath: "string",
      useStage: true,
      basePath: "/products",
      host: "https://dg6etd0ogl.execute-api.eu-west-1.amazonaws.com/dev",
      schemes: ["https"],
    },
  },
};

module.exports = serverlessConfiguration;
