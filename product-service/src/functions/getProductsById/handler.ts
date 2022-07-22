import { queryProductsById } from "../../services";
import validator from "validator";

// import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/api-gateway';
import {
  getFormatResponse,
  getFormatErrorResponse,
} from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";

// import schema from './schema';

export const getProductsById = async (event) => {
  console.log(event);

  const { productId } = event.pathParameters;

  if (!validator.isUUID(productId)) {
    return getFormatErrorResponse(400, "Format of productId is invalid");
  }

  const product = await queryProductsById(productId);

  if (product.length === 0) {
    return getFormatErrorResponse(400, "Product not found");
  }

  return getFormatResponse({
    data: product,
    // event,
  });
};

export const main = middyfy(getProductsById);
