import express from "express"
import { WebSocketServer } from "ws";
import http from "http"
import cors from "cors"
import "dotenv/config"

const app = express();
app.use(cors())
app.use(express.json())

const server = http.createServer(app)
const wss = new WebSocketServer({ server })