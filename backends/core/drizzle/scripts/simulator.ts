import axios from "axios";

const sensorMappings = [1, 2, 3, 4, 5, 6]
const API_URL = "http://localhost:8080/api/ingest"

function getRandomValue(min: number, max: number){
  return Math.random() * (max - min) + min;
}

async function sendTelemetry() {
  console.log("Sending batch Telemetry...")

  for (const id of sensorMappings){

    const value = id <= 3 ? getRandomValue(40, 75) : getRandomValue(0.1, 2.5)
    
    try {
      await axios.post(API_URL, {
        mappingId: id,
        value: parseFloat(value.toFixed(2)) 
      })  
    } catch (error) {
      console.error(`Failed to send data for sensor ${id}`)
    }
  }
}

setInterval(sendTelemetry, 2000)