import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { organizations } from "./org.js";


export const partnerships = pgTable("partnerships", {
  id: serial("id").primaryKey(),
  requestingOrgId: integer("requesting_org_id").references(() => organizations.id).notNull(),
  receivingOrgId: integer("receiving_org_id").references(() => organizations.id).notNull(),
  status: varchar("status", { length: 50 }).default("Pending"), // Pending, Approved, Denied
})