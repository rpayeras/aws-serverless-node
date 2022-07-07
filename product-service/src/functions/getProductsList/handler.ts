import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

import products from '../products.json'

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  
  return formatJSONResponse({
    products,
    event,
  });
};

export const main = middyfy(getProductsList);
