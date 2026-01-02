"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Image } from "@react-three/drei";

// Reliable placeholder 16:9 images
const textures = [
    "https://picsum.photos/seed/1/800/450", // Technic
    "https://picsum.photos/seed/2/800/450", // Abstract
    "https://picsum.photos/seed/3/800/450", // Landscape
    "https://picsum.photos/seed/4/800/450", // Architecture
    "https://picsum.photos/seed/5/800/450", // Nature
    "https://picsum.photos/seed/6/800/450", // Office
];

// Extend Image to allow custom props if needed, but standard Drei Image should work with opacity
// We need to access the material to animate opacity

function Card({ position, rotation, delay, url, fading }: { position: [number, number, number]; rotation: [number, number, number]; delay: number; url: string; fading: boolean }) {
    // We use a ref to the GROUP to animate position
    const groupRef = useRef<THREE.Group>(null);

    // We need a ref to the IMAGE (which is a Mesh) to animate opacity
    // @react-three/drei Image forwards ref to the mesh
    const imageRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime + delay;

        // Animation: Bobbing and Floating
        if (groupRef.current) {
            groupRef.current.position.y = position[1] + Math.sin(t * 0.2) * 0.4; // Slightly more range
            groupRef.current.position.x = position[0] + Math.cos(t * 0.15) * 0.2;
        }

        // Animation: Fade Out if fading is true
        if (imageRef.current) {
            const targetOpacity = fading ? 0 : 0.8;
            // Accessing the material. opacity requires transparent=true
            // Drei Image material is a custom shader but usually respects opacity prop or uniform
            // If it's a standard material:
            const mat = imageRef.current.material as THREE.Material;
            if (mat) {
                mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, delta * 2.0);
                mat.transparent = true; // Ensure transparency
            }
        }
    });

    return (
        <group ref={groupRef} position={position} rotation={rotation}>
            <Image
                ref={imageRef}
                url={url}
                transparent
                opacity={0.8} // Initial opacity
                side={THREE.DoubleSide}
                scale={[4.8, 2.7]} // Larger cards (1.5x previous size)
                toneMapped={false}
            />
        </group>
    );
}

export function FloatingCards({ fading, imageUrls = [] }: { fading?: boolean; imageUrls?: string[] }) {
    // Basic Fallback Textures if imageUrls is empty
    const fallbackTextures = [
        "https://picsum.photos/seed/1/800/450",
        "https://picsum.photos/seed/2/800/450",
        "https://picsum.photos/seed/3/800/450",
        "https://picsum.photos/seed/4/800/450",
        "https://picsum.photos/seed/5/800/450",
        "https://picsum.photos/seed/6/800/450",
    ];

    const displayTextures = imageUrls.length > 0 ? imageUrls : fallbackTextures;

    // Scatter them WIDELY to the periphery
    // Center (X=0, Z=0) should be relatively empty for the text
    const cards = [
        // Left Flank - Pushed further out
        { pos: [-16, 6.5, -5], rot: [0, 0.4, 0], delay: 0 },   // was 8
        { pos: [-24, -1.5, -8], rot: [0, 0.5, 0], delay: 1.5 },   // was 0
        { pos: [-12, -5.5, -2], rot: [0, 0.3, 0], delay: 2.2 },  // was -4

        // Right Flank - Pushed further out
        { pos: [18, 8.5, -6], rot: [0, -0.4, 0], delay: 0.8 },  // was 10
        { pos: [26, -2.5, -10], rot: [0, -0.5, 0], delay: 3.1 }, // was -1
        { pos: [14, -6.5, -3], rot: [0, -0.3, 0], delay: 1.2 },  // was -5

        // Top / Bottom Periphery - Pushed vertical
        { pos: [-6, 12.5, -10], rot: [0.2, 0, 0], delay: 4.0 },  // was 14
        { pos: [8, -9.5, -8], rot: [-0.2, 0, 0], delay: 2.5 },   // was -8

        // Deep Background (Far away)
        { pos: [-20, 5.5, -20], rot: [0, 0.2, 0], delay: 1.0 },  // was 7
        { pos: [20, 0.5, -22], rot: [0, -0.2, 0], delay: 3.5 },  // was 2
    ];

    return (
        <group>
            {cards.map((card, i) => (
                <Card
                    key={i}
                    position={card.pos as [number, number, number]}
                    rotation={card.rot as [number, number, number]}
                    delay={card.delay}
                    // Cycle through available images
                    url={displayTextures[i % displayTextures.length]}
                    fading={!!fading}
                />
            ))}
        </group>
    );
}
