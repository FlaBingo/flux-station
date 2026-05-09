import express from "express"
import { WebSocket, WebSocketServer } from "ws";
import http from "http"
import cors from "cors"
import "dotenv/config"
import { db } from "./drizzle/db.js";
import { sensorLogs, sensorMappings } from "./drizzle/schema.js";
import { eq } from "drizzle-orm";

const app = express();
app.use(cors())
app.use(express.json())

const server = http.createServer(app);

// extending the std websocket type
interface ExtWebSocket extends WebSocket {
  isAlive: boolean;
}

const wss = new WebSocketServer({ server })


wss.on("connection", (socket: ExtWebSocket, request) => {
  const ip = request.socket.remoteAddress;
  console.log(`New WS connection from ${ip}`);

  // heart-beat
  socket.isAlive = true;
  socket.on("pong", () => { socket.isAlive = true; });
  socket.on("close", () => console.log("Client Disconnected"));
});

// heart-beat interval runs every 30 sec
const interval = setInterval(() => {
  wss.clients.forEach((socket) => {
    const extSocket = socket as ExtWebSocket;
    if (extSocket.isAlive === false) return extSocket.terminate();
    extSocket.isAlive = false;
    extSocket.ping();
  })
}, 30000);



app.post("/api/ingest", async (req, res) => {
  const { mappingId, value } = req.body

  try {
    await db.insert(sensorLogs).values({
      mappingId: mappingId,
      value: value,
    }).returning();

    const sensor_type = await db.select({ type: sensorMappings.type}).from(sensorMappings).where(eq(sensorMappings.id, mappingId));
    const type = sensor_type[0]?.type
    // broadcasting
    // iterating through all connected clients manually
    const payload = JSON.stringify({
      type: "TELEMETRY",
      data: { mappingId, value, type, timestamp: new Date()}
    })
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });

    res.status(200).send("Data logged and broadcasted.")
  } catch (error) {
    console.error(error);
    res.status(500).send("Database Error. " + error)
  }
})

wss.on("close", () => clearInterval(interval));

const PORT = 8080
server.listen(PORT, () => {
  console.log(`Fundamental Hub listening on port ${PORT}`)
})