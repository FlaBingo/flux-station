import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { organizations } from "./org.js";
import { machineModels } from "./machineModel.js";


export const machines = pgTable("machines", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  orgId: integer("org_id").references(() => organizations.id).notNull(),
  modelId: integer("model_id").references(() => machineModels.id),
  status: varchar("status", { length: 50 }).default("Active"), // Active, Maintenance, Offline
})