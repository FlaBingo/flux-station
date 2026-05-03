// Retention Policy

import { lt } from "drizzle-orm"
import { db } from "../db.js"
import { sensorLogs } from "../schema.js"

async function cleanupOldLogs() {
  console.log("🧹 Running storage cleanup...")
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  try {
    const deleted = db.delete(sensorLogs).where(lt(sensorLogs.timestamp, twentyFourHoursAgo));

    console.log(`✅ Cleanup complete. Freed up space.`);
  } catch (error) {
    console.error("❌ Cleanup Failed, ", error)
  }
}

setInterval(cleanupOldLogs, 60 * 60 * 1000)