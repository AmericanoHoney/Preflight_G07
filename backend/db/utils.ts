// import "dotenv/config";

// const dbUser = process.env.POSTGRES_APP_USER;
// const dbPassword = process.env.POSTGRES_APP_PASSWORD;
// const dbHost = process.env.POSTGRES_HOST;
// const dbPort = process.env.POSTGRES_PORT;
// const dbName = process.env.POSTGRES_DB;

// // console.log({
// //   dbUser,
// //   dbPassword,
// //   dbHost,
// //   dbPort,
// //   dbName,
// // });

// if (!dbUser || !dbPassword || !dbHost || !dbName || !dbName) {
//   throw new Error("Invalid DB env.");
// }

// export const connectionString = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

import "dotenv/config";

const dbUser = process.env.MYSQL_APP_USER;
const dbPassword = process.env.MYSQL_APP_PASSWORD;
const dbHost = process.env.MYSQL_HOST;
const dbPort = process.env.MYSQL_PORT || 3306;
const dbName = process.env.MYSQL_DB;

if (!dbUser || !dbPassword || !dbHost || !dbName) {
  throw new Error("Invalid DB env.");
}

export const connectionConfig = {
  host: dbHost,
  port: Number(dbPort),
  user: dbUser,
  password: dbPassword,
  database: dbName,
};
