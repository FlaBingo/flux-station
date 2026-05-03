import express from "express"
// import { WebSocketServer } from "ws";
// import http from "http"
import cors from "cors"
import "dotenv/config"
import { db } from "./drizzle/db.js";
import { sensorLogs } from "./drizzle/schema.js";

const app = express();
app.use(cors())
app.use(express.json())

// const server = http.createServer(app)
// const wss = new WebSocketServer({ server })

app.post("/api/ingest", async (req, res) => {
  const { mappingId, value } = req.body

  try {
    await db.insert(sensorLogs).values({
      mappingId: mappingId,
      value: value,
    })

    res.status(200).send("Data logged.")
  } catch (error) {
    res.status(500).send("Database Error. " + error)
  }
})

const PORT = 8080
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`)
})