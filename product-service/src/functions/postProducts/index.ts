import schema from "./schema";
import { handlerPath } from "../../libs/handler-resolver";

export default {
  memorySize: 512,
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        summary: "Create a new product",
        description: "Creates a new product passing post parameters",
        swaggerTags: ["Products"],
        method: "post",
        path: "products",
        cors: true,
        request: {
          schemas: {
            "application/json": schema,
          },
        },
        consumes: [],
        produces: ["application/json"],
        responseData: {
          200: "Ok response with product inserted",
        },
      },
    },
  ],
};
