"use client"

import { useStore } from "@/store/useStore"
import { useEffect, useRef } from "react";

export const useTelemetry = (url: string = "ws://localhost:8080") => {
  const { updateTelemetry, setConnection } = useStore();

  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let isMounted = true;

    const connect = () => {
      console.log(`Attempting to connect to ${url}...`);
      const socket = new WebSocket(url);
      socketRef.current = socket;

      socket.onopen = () => {
        if (!isMounted) return;
        setConnection(true);
        console.log("FluxHub Connected");
      };

      socket.onmessage = (event) => {
        if (!isMounted) return;
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === "TELEMETRY" && payload.data) {
            const { type, value } = payload.data;

            if (type === "Vibration") {
              updateTelemetry({ vibration: value })
            } else if (type === "Temperature") {
              updateTelemetry({ temperature: value })
            } else {
              updateTelemetry({ power: value })
            }
          }
        } catch (error) {
          console.error("Malformed Telemetry Data: ", error);
        }
      };

      socket.onclose = () => {
        if (!isMounted) return;
        setConnection(false);
        console.log("FluxHub Disconnected. Retrying in 3s...")
        setTimeout(() => {
          if (isMounted) connect();
        }, 3000);
      }

      socket.onerror = (error) => {
        console.error("Websocket Error: ", error)
      }
    }

    connect()

    return () => {
      isMounted = false;
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [url, updateTelemetry, setConnection]);
}