"use client";

import { useRef, useEffect, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { Grid, MeshReflectorMaterial, useGLTF } from "@react-three/drei";
import * as THREE from "three";

/* ─── Blueprint Placeholder ───
   Translucent wireframe box shown while the .glb downloads. */
function BlueprintPlaceholder() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.material.opacity =
        0.12 + Math.sin(state.clock.elapsedTime * 1.5) * 0.06;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 3, -6]}>
      <boxGeometry args={[10, 6, 10]} />
      <meshStandardMaterial
        color="#4f6ef7"
        wireframe
        transparent
        opacity={0.15}
        emissive="#4f6ef7"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

/* ─── Dynamic GLB Room Model ───
   Loads the Blender-generated .glb and handles full disposal on unmount. */
function DynamicRoomModel({ modelUrl }) {
  const { scene } = useGLTF(modelUrl);
  const groupRef = useRef();

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    return () => {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.geometry?.dispose();
          if (child.material) {
            const materials = Array.isArray(child.material)
              ? child.material
              : [child.material];
            materials.forEach((mat) => {
              Object.values(mat).forEach((value) => {
                if (value instanceof THREE.Texture) {
                  value.dispose();
                }
              });
              mat.dispose();
            });
          }
        }
      });
      useGLTF.clear(modelUrl);
    };
  }, [scene, modelUrl]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

/* ─── Lighting Rig ─── */
function LightingRig() {
  return (
    <>
      <ambientLight intensity={0.15} color="#8090c0" />

      <directionalLight
        position={[0, 9, -4]}
        intensity={1.2}
        color="#c0d0ff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={30}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />

      <directionalLight
        position={[8, 6, 8]}
        intensity={0.4}
        color="#a0b0e0"
      />

      <spotLight
        position={[0, 9, -6]}
        angle={0.35}
        penumbra={0.8}
        intensity={2.5}
        color="#4f6ef7"
        castShadow
        distance={20}
        decay={2}
      />
      <spotLight
        position={[-5, 8, -5]}
        angle={0.4}
        penumbra={0.9}
        intensity={1.2}
        color="#6070d0"
        distance={18}
        decay={2}
      />
      <spotLight
        position={[5, 8, -5]}
        angle={0.4}
        penumbra={0.9}
        intensity={1.2}
        color="#6070d0"
        distance={18}
        decay={2}
      />

      <pointLight
        position={[-8, 3, -4]}
        intensity={0.6}
        color="#3050c0"
        distance={10}
        decay={2}
      />
      <pointLight
        position={[8, 3, -4]}
        intensity={0.6}
        color="#3050c0"
        distance={10}
        decay={2}
      />
    </>
  );
}

/* ─── Main Scene Export ─── */
export default function Scene({ modelUrl }) {
  return (
    <group>
      <LightingRig />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={0.8}
          mixStrength={0.5}
          roughness={0.6}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#0a0b10"
          metalness={0.5}
          mirror={0.3}
        />
      </mesh>

      <Grid
        position={[0, 0.01, 0]}
        args={[60, 60]}
        cellSize={2}
        cellThickness={0.5}
        cellColor="#151830"
        sectionSize={8}
        sectionThickness={1}
        sectionColor="#1a2050"
        fadeDistance={40}
        fadeStrength={1.5}
        infiniteGrid
      />

      {modelUrl && (
        <Suspense fallback={<BlueprintPlaceholder />}>
          <DynamicRoomModel modelUrl={modelUrl} />
        </Suspense>
      )}
    </group>
  );
}
