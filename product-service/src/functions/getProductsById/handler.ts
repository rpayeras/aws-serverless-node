import validator from 'validator'

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse, createErrorResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

import products from '../products.json'

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context, callback) => {
  const {productId} = event.pathParameters;

  if (!validator.isAlphanumeric(productId)) {
    return createErrorResponse(400, 'Product not found');
  }

  const product = products.find(product => product.id === Number(productId))

  return formatJSONResponse({
    product,
    event,
  });
};

export const main = middyfy(getProductsById);
