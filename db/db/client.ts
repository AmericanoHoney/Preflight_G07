
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "@db/schema.js";
import mysql from "mysql2/promise";
import { connectionConfig } from "@db/utils.js";

export const dbConn = await mysql.createConnection(connectionConfig);

export const dbClient = drizzle(dbConn, { schema, mode: "default" });
