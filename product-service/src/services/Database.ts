import "dotenv/config";
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
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
};

const dbConnection = new Pool(poolOptions);

dbConnection.on("error", (err) => {
  console.error("Error on connection", err);
  process.exit(-1);
});

export { dbConnection };
