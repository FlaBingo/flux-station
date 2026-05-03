import { pgTable, serial, varchar } from "drizzle-orm/pg-core";


export const machineModels = pgTable("machine_models", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  modelUrl: varchar("model_url", { length: 500 }).notNull(),
  type: varchar("type", { length: 100 }),
})