import { DataType, newDb } from "pg-mem";
import * as fs from "fs/promises";
import { v4 } from "uuid";

export const createMockDatabase = async () => {
  const db = newDb();

  db.registerExtension("uuid-ossp", (schema) => {
    schema.registerFunction({
      name: "uuid_generate_v4",
      returns: DataType.uuid,
      implementation: v4,
      impure: true,
    });
  });

  const { Pool } = db.adapters.createPg();
  const pool = new Pool();

  const queries = await fs.readFile("./tests/mocks/seed.sql", "utf8");

  await pool.query(queries);

  return pool;
};
