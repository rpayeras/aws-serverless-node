// import schema from './schema';
import { handlerPath } from '../../libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        request: {
          // schemas: {
          //   'application/json': schema,
          // },
        },
        documentation: {
          summary: 'Get a list of products',
          tags: ['Tag1'],
          description: "Get a list of products with all their properties",
          methodResponses: [
            // {
            //   statusCode: '200',
            //   responseModels: [
            //     {
            //       "application/json": "MessageResponse"
            //     },
            //   ],
              // responseHeaders: [
              //   {
              //     name: 'link',
              //     description: 'response with response stuff',
              //     type: 'string'
              //   }
              // ]
            // }
          ]
        }
      },
    },
  ],
};
