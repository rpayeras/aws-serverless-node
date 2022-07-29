// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { getFormatResponse } from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";
// import schema from './schema';

export const catalogBatchProcess = async (event) => {
  console.log(event);

  return getFormatResponse({
    data: [],
  });
};

export const main = middyfy(catalogBatchProcess);
