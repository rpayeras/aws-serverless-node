"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorResponse = exports.formatJSONResponse = void 0;
const formatJSONResponse = (response) => ({
    statusCode: 200,
    body: JSON.stringify(response)
});
exports.formatJSONResponse = formatJSONResponse;
const createErrorResponse = (statusCode, message) => ({
    statusCode: statusCode || 501,
    headers: { 'Content-Type': 'text/plain' },
    body: message || 'Incorrect id',
});
exports.createErrorResponse = createErrorResponse;
//# sourceMappingURL=api-gateway.js.map