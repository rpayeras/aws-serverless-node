// import schema from './schema';
import { handlerPath } from "../../libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        summary: "Get a list of products",
        description: "Get a list of products with all their properties",
        swaggerTags: ["Products"],
        method: "get",
        path: "products",
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
            bodyType: "data",
          },
          400: {
            description: "failed Post",
            bodyType: "Error message",
          },
          502: "server error",
        },
      },
    },
  ],
};
