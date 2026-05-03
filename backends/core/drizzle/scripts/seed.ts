import { db } from "../db.js";
import { machineModels, machines, organizations, sensorMappings, users } from "../schema.js";


async function main() {
  console.log("🚀 Seeding database...");

  // 1. Create an Organization
  const [org] = await db.insert(organizations).values({
    name: "Flux Industries - Pune Plant",
    plan: "Pro",
  }).returning();

  // 2. Create an Admin User
  await db.insert(users).values({
    orgId: org.id,
    name: "flabi",
    email: "admin@fluxstation.io",
    passwordHash: "secure_hash_here", // In production, use bcrypt
    role: "Admin",
  });

  // 3. Create a Machine Model (Digital Twin Library)
  const [motorModel] = await db.insert(machineModels).values({
    name: "Siemens 1LE1 DC Motor",
    modelUrl: "/models/siemens_motor.glb", // Stored in your Next.js public folder
    type: "DC Motor",
  }).returning();

  // 4. Create a specific Machine instance
  const [conveyorMotor] = await db.insert(machines).values({
    orgId: org.id,
    modelId: motorModel.id,
    name: "Main Conveyor Drive A1",
    status: "Active",
  }).returning();

  // 5. Create Multiple Sensor Mappings (The "Industrial Reality" Flex)
  // We'll add 3 Temperature and 3 Vibration sensors in different spots
  const sensorDefinitions = [
    { label: "Front Bearing Temp", type: "Temperature", x: 0.5, y: 1.2, z: 0.1 },
    { label: "Rear Bearing Temp", type: "Temperature", x: -0.5, y: 1.2, z: 0.1 },
    { label: "Winding Temp", type: "Temperature", x: 0, y: 1.5, z: 0 },
    { label: "Housing Vibration (X)", type: "Vibration", x: 0.2, y: 0.8, z: 0.5 },
    { label: "Housing Vibration (Y)", type: "Vibration", x: 0.2, y: 0.9, z: 0.5 },
    { label: "Housing Vibration (Z)", type: "Vibration", x: 0.2, y: 1.0, z: 0.5 },
  ];

  for (const s of sensorDefinitions) {
    await db.insert(sensorMappings).values({
      machineId: conveyorMotor.id,
      label: s.label,
      type: s.type,
      positionX: s.x,
      positionY: s.y,
      positionZ: s.z,
    });
  }

  console.log("✅ Seeding complete! You now have a motor with 6 sensors.");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});