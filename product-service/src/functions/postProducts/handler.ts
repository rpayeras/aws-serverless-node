// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse, createErrorResponse } from '../../libs/api-gateway';
import { middyfy } from "../../libs/lambda";
import { createProduct, createProductAndStock } from "../../services";
import validator from 'validator';

export const postProducts = async (event) => {
  console.log(event)

  const { title, description, price } = event.params;
  const errors: string[] = []
  
  if(!title || !description){
    errors.push('Title/Description is mandatory')
  }

  if(isNaN(price)){
    errors.push('Price must be numeric')
  }

  if(errors.length > 0){
    return createErrorResponse(500, errors.join(', '))
  } else {
    const product = await createProductAndStock({ title, description, price });
    
    return formatJSONResponse({
      data: product,
      // event,
    });
  }
};

export const main = middyfy(postProducts);