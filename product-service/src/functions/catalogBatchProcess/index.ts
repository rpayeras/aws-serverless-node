// import schema from './schema';
import { handlerPath } from "../../libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        summary: "Manage items of SQS catalogitemsQueue",
        description: "Manage items of SQS catalogitemsQueue",
        swaggerTags: ["Products"],
        method: "get",
        path: "catalog",
        cors: true,
        request: {
          // schemas: {
          //   'application/json': schema,
          // },
        },
        consumes: [],
        produces: ["application/json"],
        responseData: {
          200: {
            description: "List of products",
          },
          400: {
            description: "Failed response",
          },
          502: "server error",
        },
      },
    },
    {
      sqs: {
        arn: {
          "Fn::GetAtt": ["catalogItemsQueue", "Arn"],
        },
        batchSize: 5,
      },
    },
  ],
};
