import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  plan: varchar("plan", { length: 50 }).default("Free"), // Free, Pro, Enterprise
  createdAt: timestamp("created_at").defaultNow()
})