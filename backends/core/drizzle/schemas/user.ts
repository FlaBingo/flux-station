import { integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { organizations } from "./org.js";


export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  orgId: integer("org_id").references(() => organizations.id).notNull(), // Multi-tenancy
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).default("Operator"), // Admin, Technician, Operator
  createdAt: timestamp("created_at").defaultNow()
})