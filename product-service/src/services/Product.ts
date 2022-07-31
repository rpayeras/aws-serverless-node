import { dbConnection } from "./Database";
import { Product, Stock } from "../interfaces/Product";

export async function queryProductsList() {
  const client = await dbConnection.connect();

  try {
    const result = await dbConnection.query<Product[]>(
      `SELECT P.id, P.title, P.description, P.price, S.count 
      FROM products P, stocks S 
      WHERE P.id = S.product_id`
    );

    client.release();

    return result.rows;
  } catch (err) {
    console.log(err);
    client.release();
    throw new Error("Error getting products list");
  }
}

export async function queryProductsById(id: string) {
  const client = await dbConnection.connect();

  try {
    const result = await client.query<Product>(
      `SELECT P.id, P.title, P.description, P.price, S.count 
      FROM products P, stocks S 
      WHERE P.id = S.product_id AND P.id = $1`,
      [id]
    );

    client.release();

    return result.rows;
  } catch (err) {
    console.log(err);
    throw new Error("Error getting products list");
  }
}

export async function createProductAndStock(productParam) {
  const client = await dbConnection.connect();
  const { count = 0, ...restProduct } = productParam;

  try {
    await client.query("BEGIN");

    const product = await createProduct(restProduct);

    const { id } = product;

    if (!id) throw new Error("Error creating product with stock");

    await createStock({ productId: id, count });

    await client.query("COMMIT");
    client.release();

    return product;
  } catch (e) {
    await client.query("ROLLBACK");
    client.release();
    throw e;
  } finally {
    // dbConnection.release();
  }
}

export async function createProduct(
  product: Partial<Product>
): Promise<Product> {
  const { title, description, price } = product;
  const client = await dbConnection.connect();

  try {
    const res = await client.query(
      "INSERT INTO products(title, description, price) VALUES ($1, $2, $3) RETURNING id, title, description, price",
      [title, description, price]
    );

    client.release();

    return res.rows[0];
  } catch (err) {
    console.log(err);
    client.release();
    throw new Error("Error creating product");
  }
}

export async function createStock({
  productId,
  count = 0,
}: Stock): Promise<Stock> {
  const client = await dbConnection.connect();

  try {
    const result = await client.query(
      "INSERT INTO stocks(product_id, count) VALUES ($1, $2) RETURNING product_id, count",
      [productId, count]
    );

    client.release();

    return result.rows[0];
  } catch (err) {
    console.log(err);
    client.release();

    throw new Error("Error creating stock");
  }
}
