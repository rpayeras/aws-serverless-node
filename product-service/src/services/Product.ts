import { dbConnection } from "./Database";
import { Product, Stock } from "../interfaces/Product";

export async function queryProductsList() {
  const client = await dbConnection.connect();

  try {
    const result = await dbConnection.query<Product[]>(
      "SELECT P.id, P.title, P.description, P.price, S.quantity FROM products P, stocks S WHERE P.id = S.product_id AND S.quantity > 0"
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
      "SELECT id, title, description, price FROM products WHERE id = $1",
      [id]
    );

    client.release();

    return result.rows;
  } catch (err) {
    console.log(err);
    throw new Error("Error getting products list");
  }
}

export async function createProductAndStock(productParam: Partial<Product>) {
  const client = await dbConnection.connect();

  try {
    await client.query("BEGIN");

    const product = await createProduct(productParam);

    const { id } = product;

    if (!id) throw new Error("Error creating product with stock");

    await createStock({ productId: id, quantity: 0 });

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
  quantity = 0,
}: Stock): Promise<Stock> {
  const client = await dbConnection.connect();

  try {
    const result = await client.query(
      "INSERT INTO stocks(product_id, quantity) VALUES ($1, $2) RETURNING product_id, quantity",
      [productId, quantity]
    );

    client.release();

    return result.rows[0];
  } catch (err) {
    console.log(err);
    client.release();

    throw new Error("Error creating stock");
  }
}
