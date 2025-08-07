
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
