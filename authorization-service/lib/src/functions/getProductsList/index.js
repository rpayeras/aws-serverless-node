"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_resolver_1 = require("@libs/handler-resolver");
exports.default = {
    handler: `${(0, handler_resolver_1.handlerPath)(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'get',
                path: 'products',
                request: {},
                documentation: {
                    summary: 'Get a list of products',
                    tags: ['Tag1'],
                    description: "Get a list of products with all their properties",
                    methodResponses: []
                }
            },
        },
    ],
};
//# sourceMappingURL=index.js.map