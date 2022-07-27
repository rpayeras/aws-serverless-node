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
            bodyType: "Error message",
          },
        },
      },
    },
  ],
};