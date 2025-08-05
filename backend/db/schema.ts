// import {
//   pgTable,
//   timestamp,
//   uuid,
//   varchar,
//   boolean,
// } from "drizzle-orm/pg-core";

// export const todoTable = pgTable("mytodo_natrada", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   todoText: varchar("todo_text", { length: 255 }).notNull(),
//   isDone: boolean("is_done").default(false),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
//   updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(
//     () => new Date()
//   ),
// });

// src/db/schema.ts
import {
  mysqlTable,
  varchar,
  boolean,
  timestamp,
  char,
  int,
} from "drizzle-orm/mysql-core";

export const todoTable = mysqlTable("mytodo_natrada", {
  id: char("id", { length: 36 }).primaryKey(),
  todoText: varchar("todo_text", { length: 255 }).notNull(),
  isDone: boolean("is_done").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});

export const stockTable = mysqlTable("storestock", {
  id: char("id", { length: 36 }).primaryKey(),
  imageUrl: varchar("img_url", { length: 2048 }),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  amount: int("amount").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});
