import {
  pgTable,
  serial,
  timestamp,
  varchar,
  integer,
  decimal,
  text,
  date,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  username: varchar("username", { length: 100 }).notNull(),
  avatarUrl: varchar("avatar_url", { length: 255 }),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  emoji: varchar("emoji", { length: 10 }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  transactionDate: date("transaction_date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const income = pgTable("income", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  emoji: varchar("emoji", { length: 10 }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  transactionDate: date("transaction_date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
