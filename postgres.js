import pg from "pg";
import {} from "dotenv/config";

export function Connect() {
  const { Client } = pg;
  let pgConnect = process.env.localPostgresCN;
  let client = new Client(pgConnect);

  client
    .connect()
    .then(() => {
      console.log("Connected to PostgreSQL database");
    })
    .catch((err) => {
      console.error("Error connecting to PostgreSQL database", err);
    });
  return client;
}

export async function disConnect(client) {
 return await client
    .end()
    .then(() => {
      console.log("Connection to PostgreSQL closed");
    })
    .catch((err) => {
      console.error("Error closing connection", err);
    });
}

export async function Select(client, select, selectCallback) {
  return await client.query(select).then(async (x) => {
      selectCallback(x.rows);
  });
}

let iCallback = async (result, sql) => {
  console.log(result, sql);
};
export async function Insert(client, insert, insertCallback=iCallback) {
  return await client.query(insert).then(async (x) => {
    insertCallback(x.rowCount, insert);
  });
}

