import { dbConnection } from "./Database";
import { Product, Stock } from "../interfaces/Product";

export async function queryProductsList() {
  try {
    const result = await dbConnection.query<Product[]>(
      "SELECT id, title, description, price FROM products"
    );

    return result.rows;
  } catch (err) {
    console.log(err);
    throw new Error("Error getting products list");
  }
}

export async function queryProductsById(id: string) {
  try {
    const result = await dbConnection.query<Product>(
      "SELECT id, title, description, price FROM products WHERE id = $1",
      [id]
    );

    return result.rows;
  } catch (err) {
    console.log(err);
    throw new Error("Error getting products list");
  }
}

export async function createProductAndStock(productParam: Partial<Product>) {
  try {
    await dbConnection.query("BEGIN");

    const product = await createProduct(productParam);
    console.log(product);
    const { id } = product;

    if (!id) throw new Error("Error creating product with stock");

    await createStock({ productId: id, count: 0 });

    await dbConnection.query("COMMIT");

    return product;
  } catch (e) {
    await dbConnection.query("ROLLBACK");
    throw e;
  } finally {
    // dbConnection.release();
  }
}

export async function createProduct(
  product: Partial<Product>
): Promise<Product> {
  const { title, description, price } = product;

  try {
    const res = await dbConnection.query(
      "INSERT INTO products(title, description, price) VALUES ($1, $2, $3) RETURNING id, title, description, price",
      [title, description, price]
    );

    return res.rows[0];
  } catch (err) {
    console.log(err);
    throw new Error("Error creating product");
  }
}

export async function createStock({
  productId,
  count = 0,
}: Stock): Promise<Stock> {
  try {
    const result = await dbConnection.query(
      "INSERT INTO stocks(product_id, count) VALUES ($1, $2) RETURNING product_id, count",
      [productId, count]
    );

    return result.rows[0];
  } catch (err) {
    console.log(err);
    throw new Error("Error creating stock");
  }
}
