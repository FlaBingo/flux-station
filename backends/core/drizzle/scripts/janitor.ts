// Retention Policy

import { lt } from "drizzle-orm"
import { db } from "../db.js"
import { sensorLogs } from "../schema.js"

async function cleanupOldLogs() {
  console.log("🧹 Running storage cleanup...")
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  try {
    const deleted = await db.delete(sensorLogs).where(lt(sensorLogs.timestamp, twentyFourHoursAgo)).returning();

    console.log(`✅ Deleted ${deleted.length || 0} old logs`);
  } catch (error) {
    console.error("❌ Cleanup Failed, ", error)
  }
}

setInterval(cleanupOldLogs, 60 * 60 * 1000) // every hour