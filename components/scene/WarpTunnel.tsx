"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface WarpTunnelProps {
    fading?: boolean;
}

export function WarpTunnel({ fading }: WarpTunnelProps) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const materialRef = useRef<THREE.MeshBasicMaterial>(null);
    const count = 1000;

    // Generate random positions for streaks
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Fading Logic
        if (materialRef.current) {
            if (fading) {
                // Fast fade out
                materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, 0, delta * 3);
            } else {
                // Fade in / Stabilize
                materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, 0.6, delta * 2);
            }
        }

        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;

            // Update time/position
            t = particle.t += speed / 2;

            // Simulate warp speed movement (Z-axis rush)
            particle.zFactor += 2.5;
            if (particle.zFactor > 50) particle.zFactor = -100;

            dummy.position.set(
                (particle.xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10),
                (particle.yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10),
                particle.zFactor
            );

            // Strech them based on speed/Z to look like streaks
            dummy.scale.set(0.1, 0.1, 5 + Math.random() * 5);

            dummy.rotation.set(0, 0, 0);
            dummy.updateMatrix();

            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <boxGeometry args={[0.2, 0.2, 1]} />
            <meshBasicMaterial
                ref={materialRef}
                color="#60a5fa"
                transparent
                opacity={0} // Start invisible, let lerp handle fade in
                blending={THREE.AdditiveBlending}
            />
        </instancedMesh>
    );
}
