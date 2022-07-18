// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";

export const postProducts = async (event) => {
  // const products = await queryProductsList();
    
  return formatJSONResponse({
    //data: [],
    event,
  });
};

export const main = middyfy(postProducts);