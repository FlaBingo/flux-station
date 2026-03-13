## FluxStation ⚙️⚡
The Industrial IoT Digital Twin & Predictive Maintenance SaaS

### 🎯 Overview
FluxStation is a full-stack IIoT (Industrial Internet of Things) platform designed to bridge the gap between physical mechanical systems and digital intelligence. By utilizing a Digital Twin approach, FluxStation allows factory operators and fleet managers to monitor machinery in real-time, visualize mechanical stress through 3D models, and predict potential failures using Python-driven data analytics.

Built with a focus on scalability, security, and real-time performance, FluxStation transforms raw sensor data into actionable engineering insights.

### 🚀 Key Features
- Real-time Telemetry: Streaming data from ESP32 sensors (simulated via Wokwi) using high-speed WebSockets (ws).

- 3D Digital Twin: An interactive 3D representation of the machine (built with React Three Fiber) that reflects live physical states like temperature (heat-maps) and vibration (dynamic movement).

- Predictive Analytics Engine: A dedicated Python layer utilizing Pandas and Scikit-Learn to detect anomalies and calculate Remaining Useful Life (RUL).

- Multi-tenant SaaS Architecture: Complete authentication and role-based access control (RBAC) allowing multiple organizations to manage their own independent "Machine Fleets."

- Industrial Health Dashboard: High-performance UI built with Next.js and Shadcn/UI, featuring live charting and automated PDF maintenance reports.

### 🛠️ Tech Stack
- Frontend: Next.js (App Router), Tailwind CSS, React Three Fiber (Three.js)

- Backend: Node.js, Express, WebSockets (ws library)

- Database: PostgreSQL with Drizzle ORM

- Intelligence: Python (FastAPI, Pandas, Scikit-Learn, NumPy)

- Hardware/IoT: ESP32, C++, Wokwi Simulator

- Auth: Auth.js (NextAuth)

### 💡 The "Why" behind FluxStation
As a Mechanical Engineering student with a passion for software development, I built FluxStation to solve a core problem in Industry 4.0: the lack of accessible, real-time diagnostic tools for mid-sized mechanical systems. While enterprise solutions exist for massive factories, FluxStation is designed as a lightweight, "Logistics-First" platform that leverages mechanical principles—like vibration RMS analysis and thermal stress thresholds—to prevent catastrophic equipment failure.