// import schema from './schema';
import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    // {
    //   http: {
    //     summary:
    //       "Parse a file uploaded to upload folder and shows into Cloudwatch",
    //     description: "Returns a product by id",
    //     swaggerTags: ["Import Products"],
    //     method: "get",
    //     path: "parser",
    //     cors: true,
    //     produces: ["application/json"],
    //     responseData: {
    //       200: {
    //         description: "File parsed",
    //       },
    //       400: {
    //         description: "Failed on parse",
    //         bodyType: "Error message",
    //       },
    //     },
    //   },
    // },
    {
      s3: {
        bucket: process.env.AWS_CLIENT_BUCKET,
        event: "s3:ObjectCreated:*",
        rules: [
          {
            prefix: "uploaded/",
          },
        ],
        existing: true,
      },
    },
  ],
};
