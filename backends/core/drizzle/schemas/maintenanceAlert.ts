import { boolean, integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { machines } from "./machine.js";


export const maintenanceAlerts = pgTable("maintenance_alerts", {
  id: serial("id").primaryKey(),
  machineId: integer("machine_id").references(() => machines.id).notNull(),
  type: varchar("type", { length: 100 }).notNull(), // Anomaly, Critical Overheat, etc.
  severity: varchar("severity", { length: 50 }).notNull(), // Warning, Critical, etc.
  message: varchar("message", { length: 500 }),
  isResolved: boolean("is_resolved").default(false), // Technician "Check-off"
  createdAt: timestamp("created_at").defaultNow()
})