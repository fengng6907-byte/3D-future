"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import * as THREE from "three";
import Scene from "./Scene";

/* ─── First-Person Walking Controller ───
   Listens to WASD/arrow keys and moves the camera
   relative to its current facing direction. */
function WalkController({ speed = 5 }) {
  const { camera } = useThree();
  const movement = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());

  useEffect(() => {
    const onKeyDown = (e) => {
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          movement.current.forward = true;
          break;
        case "KeyS":
        case "ArrowDown":
          movement.current.backward = true;
          break;
        case "KeyA":
        case "ArrowLeft":
          movement.current.left = true;
          break;
        case "KeyD":
        case "ArrowRight":
          movement.current.right = true;
          break;
      }
    };

    const onKeyUp = (e) => {
      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          movement.current.forward = false;
          break;
        case "KeyS":
        case "ArrowDown":
          movement.current.backward = false;
          break;
        case "KeyA":
        case "ArrowLeft":
          movement.current.left = false;
          break;
        case "KeyD":
        case "ArrowRight":
          movement.current.right = false;
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    const move = movement.current;
    const vel = velocity.current;
    const dir = direction.current;

    vel.x -= vel.x * 10.0 * delta;
    vel.z -= vel.z * 10.0 * delta;

    dir.z = Number(move.forward) - Number(move.backward);
    dir.x = Number(move.right) - Number(move.left);
    dir.normalize();

    if (move.forward || move.backward) vel.z -= dir.z * speed * delta;
    if (move.left || move.right) vel.x -= dir.x * speed * delta;

    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(forward, camera.up).normalize();

    camera.position.addScaledVector(forward, -vel.z * delta * 10);
    camera.position.addScaledVector(right, vel.x * delta * 10);

    camera.position.y = 1.6;
  });

  return null;
}

/* ─── Atmospheric Fog Setup ─── */
function AtmosphericFog() {
  const { scene } = useThree();

  useEffect(() => {
    scene.background = new THREE.Color("#0b0c10");
    scene.fog = new THREE.FogExp2("#0b0c10", 0.025);
    return () => {
      scene.fog = null;
    };
  }, [scene]);

  return null;
}

/* ─── HUD Overlay (Controls Guide) ─── */
function ControlsHUD({ isLocked }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "24px",
        left: "24px",
        zIndex: 20,
        pointerEvents: "none",
        animation: "fadeIn 0.5s ease-out",
      }}
    >
      <div
        style={{
          background: "rgba(10, 11, 18, 0.88)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(79, 110, 247, 0.2)",
          borderRadius: "14px",
          padding: "18px 22px",
          minWidth: "260px",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.03)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "14px",
            paddingBottom: "12px",
            borderBottom: "1px solid rgba(79, 110, 247, 0.15)",
          }}
        >
          <span style={{ fontSize: "16px" }}>🎮</span>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: isLocked ? "#4f6ef7" : "#8b8fa3",
              letterSpacing: "0.02em",
            }}
          >
            {isLocked ? "Walkthrough Mode Active" : "Walkthrough Mode"}
          </span>
          {isLocked && (
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#4ade80",
                boxShadow: "0 0 8px rgba(74, 222, 128, 0.5)",
                marginLeft: "auto",
              }}
            />
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {[
            { key: "Click", action: "Lock cursor & look around" },
            { key: "W A S D", action: "Walk through space" },
            { key: "ESC", action: "Release mouse cursor" },
          ].map(({ key, action }) => (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#4f6ef7",
                  background: "rgba(79, 110, 247, 0.1)",
                  border: "1px solid rgba(79, 110, 247, 0.2)",
                  borderRadius: "5px",
                  padding: "2px 8px",
                  fontFamily: "monospace",
                  minWidth: "60px",
                  textAlign: "center",
                  letterSpacing: "0.05em",
                }}
              >
                {key}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "#8b8fa3",
                }}
              >
                {action}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Canvas Export ─── */
export default function ExhibitionCanvas({ theme }) {
  const [isLocked, setIsLocked] = useState(false);
  const controlsRef = useRef();

  const handleLock = useCallback(() => setIsLocked(true), []);
  const handleUnlock = useCallback(() => setIsLocked(false), []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas
        shadows
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        camera={{
          fov: 65,
          near: 0.1,
          far: 100,
          position: [0, 1.6, 12],
        }}
        style={{
          width: "100%",
          height: "100%",
          background: "#0b0c10",
        }}
      >
        <AtmosphericFog />
        <WalkController speed={5} />
        <PointerLockControls
          ref={controlsRef}
          onLock={handleLock}
          onUnlock={handleUnlock}
        />
        <Scene theme={theme} />
      </Canvas>
      <ControlsHUD isLocked={isLocked} />
    </div>
  );
}
