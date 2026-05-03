import { integer, pgTable, real, serial, varchar } from "drizzle-orm/pg-core";
import { machines } from "./machine.js";


export const sensorMappings = pgTable("sensor_mappings", {
  id: serial("id").primaryKey(),
  machineId: integer("machine_id").references(() => machines.id),
  label: varchar("label", { length: 100 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // Temperature, Vibration, etc.
  // Coordinates for the 3D Digital Twin alert placement
  positionX: real("position_x").default(0),
  positionY: real("position_y").default(0),
  positionZ: real("position_z").default(0),
})