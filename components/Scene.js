"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Grid, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ─── Architectural Pillar ─── */
function Pillar({ position, height = 6, radius = 0.35, color = "#1a1d2e" }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.emissiveIntensity =
        0.08 + Math.sin(state.clock.elapsedTime * 0.8) * 0.04;
    }
  });

  return (
    <group position={position}>
      {/* Main pillar body */}
      <mesh ref={meshRef} position={[0, height / 2, 0]} castShadow>
        <cylinderGeometry args={[radius, radius * 1.15, height, 24]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.85}
          emissive="#4f6ef7"
          emissiveIntensity={0.08}
        />
      </mesh>
      {/* Pillar base cap */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[radius * 1.6, radius * 1.8, 0.2, 24]} />
        <meshStandardMaterial
          color="#12141e"
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>
      {/* Pillar top cap */}
      <mesh position={[0, height, 0]}>
        <cylinderGeometry args={[radius * 1.6, radius * 1.4, 0.2, 24]} />
        <meshStandardMaterial
          color="#12141e"
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>
      {/* Accent light ring at top */}
      <mesh position={[0, height - 0.3, 0]}>
        <torusGeometry args={[radius + 0.05, 0.02, 8, 32]} />
        <meshStandardMaterial
          emissive="#4f6ef7"
          emissiveIntensity={1.5}
          color="#000000"
        />
      </mesh>
    </group>
  );
}

/* ─── Event Stage Platform ─── */
function Stage({ position = [0, 0, -8] }) {
  const platformRef = useRef();
  const accentRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (accentRef.current) {
      accentRef.current.material.emissiveIntensity =
        0.6 + Math.sin(t * 1.2) * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* Main stage platform */}
      <mesh ref={platformRef} position={[0, 0.25, 0]} receiveShadow castShadow>
        <boxGeometry args={[12, 0.5, 6]} />
        <meshStandardMaterial
          color="#0e1018"
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>
      {/* Stage front accent edge */}
      <mesh ref={accentRef} position={[0, 0.51, 2.9]}>
        <boxGeometry args={[12, 0.06, 0.15]} />
        <meshStandardMaterial
          color="#000"
          emissive="#4f6ef7"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={1}
        />
      </mesh>
      {/* Stage side accent edges */}
      <mesh position={[-5.95, 0.51, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[6, 0.06, 0.15]} />
        <meshStandardMaterial
          color="#000"
          emissive="#4f6ef7"
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh position={[5.95, 0.51, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[6, 0.06, 0.15]} />
        <meshStandardMaterial
          color="#000"
          emissive="#4f6ef7"
          emissiveIntensity={0.4}
        />
      </mesh>
      {/* Stage riser step */}
      <mesh position={[0, 0.1, 3.5]} receiveShadow>
        <boxGeometry args={[10, 0.2, 1.2]} />
        <meshStandardMaterial
          color="#0c0d14"
          roughness={0.2}
          metalness={0.85}
        />
      </mesh>
    </group>
  );
}

/* ─── Background Projection Screen ─── */
function ProjectionScreen({ position = [0, 4, -11.8] }) {
  const screenRef = useRef();
  const borderRef = useRef();

  useFrame((state) => {
    if (screenRef.current) {
      const t = state.clock.elapsedTime;
      screenRef.current.material.emissiveIntensity =
        0.15 + Math.sin(t * 0.5) * 0.08;
    }
  });

  return (
    <group position={position}>
      {/* Screen bezel frame */}
      <mesh ref={borderRef} position={[0, 0, -0.06]}>
        <boxGeometry args={[14.6, 6.6, 0.12]} />
        <meshStandardMaterial
          color="#08090d"
          roughness={0.1}
          metalness={0.95}
        />
      </mesh>
      {/* Screen surface */}
      <mesh ref={screenRef}>
        <planeGeometry args={[14, 6]} />
        <meshStandardMaterial
          color="#0d1020"
          emissive="#1a2454"
          emissiveIntensity={0.2}
          roughness={0.05}
          metalness={0.1}
          side={THREE.FrontSide}
        />
      </mesh>
      {/* Screen content glow overlay */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[13, 5.2]} />
        <meshBasicMaterial color="#0f1530" transparent opacity={0.5} />
      </mesh>
      {/* Decorative title bar on screen */}
      <mesh position={[0, 2.2, 0.02]}>
        <planeGeometry args={[8, 0.4]} />
        <meshStandardMaterial
          color="#000"
          emissive="#4f6ef7"
          emissiveIntensity={0.6}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

/* ─── Room Enclosure ─── */
function RoomShell() {
  const wallMaterial = useMemo(
    () => (
      <meshStandardMaterial
        color="#0a0b12"
        roughness={0.85}
        metalness={0.1}
        side={THREE.BackSide}
      />
    ),
    []
  );

  return (
    <group>
      {/* Back wall */}
      <mesh position={[0, 5, -12]} receiveShadow>
        <planeGeometry args={[40, 12]} />
        <meshStandardMaterial color="#08090e" roughness={0.9} metalness={0.05} />
      </mesh>
      {/* Left wall */}
      <mesh
        position={[-18, 5, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[30, 12]} />
        <meshStandardMaterial
          color="#090a10"
          roughness={0.85}
          metalness={0.08}
        />
      </mesh>
      {/* Right wall */}
      <mesh
        position={[18, 5, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[30, 12]} />
        <meshStandardMaterial
          color="#090a10"
          roughness={0.85}
          metalness={0.08}
        />
      </mesh>
      {/* Ceiling */}
      <mesh position={[0, 10, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 30]} />
        <meshStandardMaterial color="#060710" roughness={0.95} metalness={0} />
      </mesh>
    </group>
  );
}

/* ─── Floor Accent Strips ─── */
function FloorAccents() {
  const stripRef = useRef();

  useFrame((state) => {
    if (stripRef.current) {
      stripRef.current.material.emissiveIntensity =
        0.4 + Math.sin(state.clock.elapsedTime * 0.6) * 0.2;
    }
  });

  return (
    <group>
      {/* Center aisle accent */}
      <mesh ref={stripRef} position={[0, 0.005, 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.08, 18]} />
        <meshStandardMaterial
          color="#000"
          emissive="#4f6ef7"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Parallel aisle accents */}
      {[-3, 3].map((x) => (
        <mesh
          key={x}
          position={[x, 0.005, 2]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.04, 18]} />
          <meshStandardMaterial
            color="#000"
            emissive="#2a3a80"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Lighting Rig ─── */
function LightingRig() {
  return (
    <>
      {/* Global ambient fill */}
      <ambientLight intensity={0.15} color="#8090c0" />

      {/* Primary key light — overhead stage wash */}
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

      {/* Fill light from front-right */}
      <directionalLight
        position={[8, 6, 8]}
        intensity={0.4}
        color="#a0b0e0"
      />

      {/* Stage spot accents */}
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

      {/* Point light accents on pillars */}
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
export default function Scene({ theme }) {
  const pillarPositions = [
    [-8, 0, -4],
    [8, 0, -4],
    [-8, 0, 4],
    [8, 0, 4],
    [-14, 0, -4],
    [14, 0, -4],
    [-14, 0, 4],
    [14, 0, 4],
  ];

  return (
    <group>
      <LightingRig />

      {/* Reflective floor plane */}
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

      {/* Structural reference grid */}
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

      <FloorAccents />
      <RoomShell />
      <Stage />
      <ProjectionScreen />

      {/* Pillar array */}
      {pillarPositions.map((pos, i) => (
        <Pillar key={i} position={pos} />
      ))}
    </group>
  );
}
