import { dbConnection } from "../../src/services/Database";
import { readJson } from "../../src/helpers/files";

export const createMockDatabase = async () => {
  await dbConnection.query('create extension if not exists "uuid-ossp"');

  await dbConnection.query("drop table if exists stocks cascade");
  await dbConnection.query("drop table if exists products cascade");

  await dbConnection.query(`create table products (
      id uuid not null default uuid_generate_v4() primary key,
      title text not null,
      description text not null,
      price integer not null
    )`);

  await dbConnection.query(`create table stocks(
    product_id uuid primary key,
    quantity integer not null default 0
  )`);

  await dbConnection.query(
    "alter table stocks add constraint fk_stocks_products foreign key (product_id) references products(id)"
  );

  const products = await readJson("./tests/mocks/products.json");

  let inserts = [];

  products.forEach(({ id, name, description, price }) => {
    inserts.push(
      dbConnection.query(
        "INSERT INTO products(id, title, description, price) VALUES ($1, $2, $3, $4)",
        [id, name, description, price]
      )
    );
  });

  await Promise.all(inserts);
  inserts = [];

  const stocks = await readJson("./tests/mocks/stocks.json");

  stocks.forEach(({ productId, quantity }) => {
    inserts.push(
      dbConnection.query(
        "INSERT INTO stocks(product_id, quantity) VALUES ($1, $2)",
        [productId, quantity]
      )
    );
  });

  await Promise.all(inserts);
  inserts = [];
};
