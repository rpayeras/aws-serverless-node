// import schema from './schema';
import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        summary: "Imports a csv file with products",
        description: "Returns a product by id",
        swaggerTags: ["Import Products"],
        method: "get",
        path: "import",
        authorizer: {
          arn: `arn:aws:lambda:${process.env.AWS_CLIENT_REGION}:${process.env.AWS_ACCOUNT_ID}:function:${process.env.AWS_CLIENT_BASIC_AUTHORIZER}`,
          // managedExternally: false,
          resultTtlInSeconds: 0,
          identitySource: "method.request.header.Authorization",
          type: "request",
        },
        cors: true,
        request: {
          parameters: {
            querystrings: {
              name: true,
            },
          },
        },
        consumes: [],
        produces: ["application/json"],
        responseData: {
          200: {
            description: "File uploaded successfully",
          },
          400: {
            description: "Failed on upload",
          },
        },
      },
    },
  ],
};
