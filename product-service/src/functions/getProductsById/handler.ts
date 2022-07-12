import validator from "validator";

// import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/api-gateway';
import {
  formatJSONResponse,
  createErrorResponse,
} from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";

// import schema from './schema';

import products from "../products.json";

export const getProductsById = async (event) => {
  const { productId } = event.pathParameters;

  if (!validator.isAlphanumeric(productId)) {
    return createErrorResponse(400, "Product not found");
  }

  const product = products.find((product) => product.id === Number(productId));

  if (!product) {
    return createErrorResponse(400, "Product not found");
  }

  return formatJSONResponse({
    data: product,
    event,
  });
};

export const main = middyfy(getProductsById);
