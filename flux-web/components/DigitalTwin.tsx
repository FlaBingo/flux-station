"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { useStore } from "@/store/useStore";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  const vibration = useStore((state) => state.vibration);

  useFrame((state) => {
    if (!groupRef.current) return;

    // applying a shaking effect based on vibration intensity
    const intensity = vibration * 0.05; // scale the jitter
    groupRef.current.position.x = (Math.random() - 0.05) * intensity;
    groupRef.current.position.y = (Math.random() - 0.05) * intensity;
  });

  return <primitive ref={groupRef} object={scene} />;
}

export default function DigitalTwin() {
  return (
    <div className="h-full w-full bg-card relative transition-colors">
      <Canvas dpr={[1, 2]} camera={{ fov: 50 }}>
        {/* <ambientLight intensity={0.5} /> */}
        {/* <pointLight position={[10, 10, 10]} /> */}
        <Suspense fallback={null}>
          <PresentationControls global zoom={0.7} speed={1.5} polar={[-0.1, Math.PI / 4]}>
            <Stage environment="warehouse" intensity={0.6} adjustCamera={1.2}>
              <Model url="/models/electric_motor.glb" />
            </Stage>
          </PresentationControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
