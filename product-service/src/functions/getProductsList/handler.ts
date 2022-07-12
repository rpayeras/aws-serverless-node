// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";

// import schema from './schema';

import products from "../products.json";

export const getProductsList = async (event) => {
  return formatJSONResponse({
    data: products,
    event,
  });
};

export const main = middyfy(getProductsList);
