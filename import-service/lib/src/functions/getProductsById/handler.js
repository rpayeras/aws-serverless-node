"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const validator_1 = __importDefault(require("validator"));
const api_gateway_1 = require("@libs/api-gateway");
const lambda_1 = require("@libs/lambda");
const products_json_1 = __importDefault(require("../products.json"));
const getProductsById = async (event, context, callback) => {
    const { productId } = event.pathParameters;
    if (!validator_1.default.isAlphanumeric(productId)) {
        return (0, api_gateway_1.createErrorResponse)(400, 'Product not found');
    }
    const product = products_json_1.default.find(product => product.id === Number(productId));
    return (0, api_gateway_1.formatJSONResponse)({
        product,
        event,
    });
};
exports.main = (0, lambda_1.middyfy)(getProductsById);
//# sourceMappingURL=handler.js.map