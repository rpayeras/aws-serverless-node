import schema from './schema';
import { handlerPath } from "../../libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "products",
        cors: true,
        request: {
          schemas: {
            'application/json': schema,
          },
        },
        documentation: {
          summary: "Create a new product",
          tags: ["Tag1"],
          description: "Creates a new product with all his properties",
          methodResponses: [
            {
              statusCode: "200",
              responseBody: {
                data: "Product",
              },
            },
            {
              statusCode: "500",
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
