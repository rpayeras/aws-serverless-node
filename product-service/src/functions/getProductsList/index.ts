// import schema from './schema';
import { handlerPath } from "../../libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "products",
        cors: true,
        request: {
          // schemas: {
          //   'application/json': schema,
          // },
        },
        documentation: {
          summary: "Get a list of products",
          tags: ["Tag1"],
          description: "Get a list of products with all their properties",
          methodResponses: [
            {
              statusCode: "200",
              responseBody: {
                data: "List of products",
              },
            },
            {
              statusCode: "400",
              responseBody: {
                message: "Error message",
              },
            },
          ],
        },
      },
    },
  ],
};
