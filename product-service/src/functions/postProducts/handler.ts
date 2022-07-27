// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import {
  getFormatResponse,
  getFormatErrorResponse,
} from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";
import { createProductAndStock } from "../../services";

export const postProducts = async (event) => {
  console.log(event);

  const { title, description, price } = event.params;
  const errors: string[] = [];

  if (!title || !description) {
    errors.push("Title/Description is mandatory");
  }

  if (isNaN(price)) {
    errors.push("Price must be numeric");
  }

  if (errors.length > 0) {
    return getFormatErrorResponse(400, errors.join(", "));
  } else {
    const product = await createProductAndStock({ title, description, price });

    return getFormatResponse({
      data: product,
      // event,
    });
  }
};

export const main = middyfy(postProducts);
