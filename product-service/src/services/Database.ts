// import { Signer } from "@aws-sdk/rds-signer";
import { Pool, types } from "pg";

// const signerOptions = {
//   hostname: "db.us-east-1.rds.amazonaws.com",
//   port: 8000,
//   username: "user1",
//   credentials: {
//     accessKeyId: 'YOUR-ACCESS-KEY',
//     secretAccessKey: 'YOUR-SECRET-ACCESS-KEY',
//   },
//   region: "us-east-1",
//   // sha256: HashCtor,
// }

// const signer = new Signer(signerOptions);
// const password = await signer.getAuthToken();
export const columnTypes = types;

const poolOptions = {
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
};

export const dbConnection = new Pool(poolOptions);
