"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import { ProjectTunnel } from "./scene/ProjectTunnel";
import { FloatingCards } from "./FloatingCards";
import { WarpTunnel } from "./scene/WarpTunnel";
import { useRef } from "react";
import * as React from "react";
import * as THREE from "three";

interface ImmersiveSceneProps {
    mouseX: number;
    mouseY: number;
    visualState: 'idle' | 'warping' | 'handover' | 'entered';
    imageUrls?: string[];
    projects?: any[];
    onBack?: () => void;
    activeIndex?: number;
}

function CameraController({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
    const { camera } = useThree();

    // Smooth mouse values
    const smoothMouse = useRef({ x: 0, y: 0 });

    useFrame((state, delta) => {
        // Damping factor for mouse movement (inertia)
        // Lerp current smooth value towards target mouse value
        smoothMouse.current.x = THREE.MathUtils.lerp(smoothMouse.current.x, mouseX, 0.05);
        smoothMouse.current.y = THREE.MathUtils.lerp(smoothMouse.current.y, mouseY, 0.05);

        // Idle / Parallax Mode
        // Camera position influenced by smoothed mouse
        const targetX = -smoothMouse.current.x * 0.5; // Reduced range
        const targetY = -smoothMouse.current.y * 0.5;

        // Apply parallax to position
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.1);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.1);

        // Maintain starting Z
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 12, 0.05);

        // Always look forward
        camera.lookAt(0, 0, -20);
    });

    return null;
}

export function ImmersiveScene({ mouseX, mouseY, visualState, imageUrls = [], projects = [], onBack = () => { }, activeIndex = 0 }: ImmersiveSceneProps) {
    const isWarping = visualState === 'warping';
    const isHandover = visualState === 'handover';
    const isEntered = visualState === 'entered';

    // White background for any state except IDLE
    const isDark = isWarping || isHandover || isEntered;

    return (
        <div className={`fixed inset-0 z-0 transition-colors duration-1000 ${isDark ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-50 via-white to-gray-100' : 'bg-transparent'}`}>
            {/* Subtle Texture or Ambient Glow */}
            <div className={`absolute inset-0 bg-white/10 ${isDark ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`} />

            <Canvas>
                {/* 
                    When entering, we let ProjectTunnel's CameraControls take over. 
                    Default position needs to match the handover roughly if possible, or CameraControls will handle the fly-in.
                 */}
                <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={75} />

                {/* Camera Controller only active in IDLE mode */}
                {visualState === 'idle' && (
                    <CameraController mouseX={mouseX} mouseY={mouseY} />
                )}

                {/* High Key Lighting - White Gallery */}
                <ambientLight intensity={1.2} color="#ffffff" />
                <directionalLight
                    position={[5, 8, 5]}
                    intensity={0.8}
                    color="#ffffff"
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                />

                <Environment preset="studio" />

                {/* Soft White Fog for depth */}
                <fog attach="fog" args={['#f5f5f5', 10, 50]} />

                <React.Suspense fallback={null}>
                    {visualState === 'idle' && (
                        <FloatingCards fading={false} imageUrls={imageUrls} />
                    )}

                    {/* Warp Tunnel: Visible during 'warping', 'handover', AND 'entered' (for smooth fade-out overlap) */}
                    {(isWarping || isHandover || isEntered) && (
                        <WarpTunnel fading={isHandover || isEntered} />
                    )}

                    {/* Project Tunnel: Visible during 'handover' (entering) and 'entered' (full) */}
                    {(isHandover || isEntered) && (
                        <ProjectTunnel projects={projects} onBack={onBack} activeIndex={activeIndex} isTransitioning={isHandover} />
                    )}
                </React.Suspense>
            </Canvas>
        </div>
    );
}
