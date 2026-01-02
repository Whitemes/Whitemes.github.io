"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function GlassPanel({ position, rotation, scale }: { position: [number, number, number]; rotation: [number, number, number]; scale: [number, number, number] }) {
    return (
        <mesh position={position} rotation={rotation} scale={scale}>
            <planeGeometry args={[1, 1]} />
            <meshPhysicalMaterial
                transparent
                transmission={0.9}
                roughness={0.1}
                metalness={0.1}
                thickness={0.5}
                color="#22c55e"
                emissive="#0a0a0a"
                emissiveIntensity={0.2}
            />
        </mesh>
    );
}

export function FloatingPanels() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Subtle floating animation
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
        }
    });

    const panels = Array.from({ length: 25 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 25;
        const y = (Math.random() - 0.5) * 15;
        const z = (Math.random() - 0.5) * 10 - 5; // Spread in depth

        // Avoid center to keep text legible
        if (Math.abs(x) < 3 && Math.abs(y) < 2 && Math.abs(z) < 2) return null;

        return (
            <GlassPanel
                key={i}
                position={[x, y, z]}
                rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
                scale={[1 + Math.random() * 2, 1 + Math.random() * 2, 1]}
            />
        );
    }).filter(Boolean);

    return (
        <group ref={groupRef}>
            {panels}
        </group>
    );
}
