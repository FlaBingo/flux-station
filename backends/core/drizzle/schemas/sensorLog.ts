import { bigserial, index, integer, pgTable, real, timestamp } from "drizzle-orm/pg-core";
import { sensorMappings } from "./sensorMapping.js";


export const sensorLogs = pgTable("sensor_logs", {
  id: bigserial("id", { mode: "number"}).primaryKey(), // BigInt for high volume
  mappingId: integer("mapping_id").references(() => sensorMappings.id).notNull(), // Points to specific sensor location
  value: real("value").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
}, (table) => [
  // Index for fast graphing
  index("mapping_idx").on(table.mappingId),
  index("time_idx").on(table.timestamp),
])