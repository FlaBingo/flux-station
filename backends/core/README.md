important files to run

seed.ts
simulator.ts - to fill the sensor_logs table based on 6 sensors (in sensorMappings table)
janitor.ts - to cleanup the data older than 24 hrs in sensor_logs table every 1 hr interval

commands:
npm run db:studio - to see the data live