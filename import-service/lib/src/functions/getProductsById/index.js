"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_resolver_1 = require("@libs/handler-resolver");
exports.default = {
    handler: `${(0, handler_resolver_1.handlerPath)(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'get',
                path: 'products/{productId}',
            },
        },
    ],
};
//# sourceMappingURL=index.js.map