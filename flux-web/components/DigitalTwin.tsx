"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function DigitalTwin() {
  return (
    <div className="h-125 w-full bg-slate-900 rounded-xl overflow-hidden">
      <Canvas dpr={[1, 2]} camera={{ fov: 45 }}>
        <color attach={"background"} args={["#101725"]} />
        <PresentationControls
          speed={1.5}
          global
          zoom={0.5}
          polar={[-0.1, Math.PI / 4]}
        >
          <Stage environment={"city"} intensity={0.6}>
            <Model url={"/models/electric_motor.glb"} />
          </Stage>
        </PresentationControls>
      </Canvas>
    </div>
  );
}
