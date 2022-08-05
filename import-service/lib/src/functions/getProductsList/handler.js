"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.getProductsList = void 0;
const api_gateway_1 = require("@libs/api-gateway");
const lambda_1 = require("@libs/lambda");
const products_json_1 = __importDefault(require("../products.json"));
const getProductsList = async (event, context, callback) => {
    console.log(event);
    return (0, api_gateway_1.formatJSONResponse)({
        data: products_json_1.default,
        event,
        context,
        callback
    });
};
exports.getProductsList = getProductsList;
exports.main = (0, lambda_1.middyfy)(exports.getProductsList);
//# sourceMappingURL=handler.js.map