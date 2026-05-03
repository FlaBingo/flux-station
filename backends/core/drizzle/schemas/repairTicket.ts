import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { machines } from "./machine.js";
import { maintenanceAlerts } from "./maintenanceAlert.js";
import { users } from "./user.js";


export const repairTickets = pgTable("repair_tickets", {
  id: serial("id").primaryKey(),
  machineId: integer("machine_id").references(() => machines.id).notNull(),
  alertId: integer("alert_id").references(() => maintenanceAlerts.id),
  assignedUserId: integer("assigned_user_id").references(() => users.id),
  status: varchar("status", { length: 50 }).default("Open"), // Open, In-progress, Resolved
  description: varchar("description", { length: 1000 }),
})