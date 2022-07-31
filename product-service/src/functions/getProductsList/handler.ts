// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { getFormatResponse } from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";
import { queryProductsList } from "../../services";
// import schema from './schema';

export const getProductsList = async (event) => {
  console.log(event);

  const products = await queryProductsList();

  return getFormatResponse({
    data: products,
    // event,
  });
};

export const main = middyfy(getProductsList);
