import {
  mysqlTable,
  varchar,
  boolean,
  timestamp,
  char,
  int,
} from "drizzle-orm/mysql-core";

export const stockTable = mysqlTable("storestock", {
  id: char("id", { length: 36 }).primaryKey(),
  imageUrl: varchar("img_url", { length: 2048 }),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  productid: char("productid", { length: 36 }).notNull(),
  amount: int("amount").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});
