"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const api_gateway_1 = require("@libs/api-gateway");
const lambda_1 = require("@libs/lambda");
const hello = async (event) => {
    return (0, api_gateway_1.formatJSONResponse)({
        message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
        event,
    });
};
exports.main = (0, lambda_1.middyfy)(hello);
//# sourceMappingURL=handler.js.map