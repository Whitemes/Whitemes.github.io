"use client";

import { Html, Float, CameraControls, Text } from "@react-three/drei";
import { useEffect, useRef, useMemo, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import * as THREE from "three";

// --- Types ---
interface Project {
    name: string;
    type: string;
    status: "ONLINE" | "PROCESSING" | "IDLE" | "ACTIVE";
    description: string;
    href: string;
    repoUrl?: string; // Kept for back-compat
    githubUrl?: string;
    techStack?: string[];
    logs: string[];
    imageUrl: string;
}

interface ProjectTunnelProps {
    projects: Project[];
    onBack?: () => void;
    activeIndex: number;
    isTransitioning?: boolean;
}

// --- Constants ---
const Z_SPACING = 15;
const X_OFFSET = 6;

function ProjectCard({ project, index, isActive, animateEntry = false }: { project: Project; index: number; isActive: boolean; animateEntry?: boolean }) {

    // Zigzag Layout Calculation
    const position = useMemo(() => {
        const x = (index % 2 === 0 ? -1 : 1) * X_OFFSET;
        const z = -index * Z_SPACING;
        return [x, 0, z] as [number, number, number];
    }, [index]);

    // Entry Animation Logic
    // Start hidden only if animateEntry is true.
    const [hasEntered, setHasEntered] = useState(!animateEntry);

    useEffect(() => {
        if (animateEntry) {
            // Delay slightly to ensure browser has painted the initial "hidden" state
            const t = setTimeout(() => {
                setHasEntered(true);
            }, 100);
            return () => clearTimeout(t);
        }
    }, [animateEntry]);

    // Determine visual state
    // If we are supposed to animate entry but haven't entered yet, force hidden state.
    const isHiddenInitial = animateEntry && !hasEntered;

    return (
        <group position={position}>
            {/* The Massive Card - Scaled UP by 4x to be a "Monolith" */}
            <Float speed={index % 2 === 0 ? 1 : 1.2} rotationIntensity={0.05} floatIntensity={0.2}>
                <group scale={4}>
                    <Html
                        transform
                        distanceFactor={1.2}
                        position={[0, 0, 0]}
                        style={{
                            opacity: 1,
                            transition: 'all 0.5s ease-out',
                            // If hidden initial, force scale 0.8
                            // Else if active, scale 1
                            // Else inactive, scale 0.8
                            transform: (isHiddenInitial || !isActive) ? 'scale(0.8)' : 'scale(1)',
                            pointerEvents: isActive ? 'auto' : 'none'
                        }}
                    >
                        {/*
                            WHITE GALLERY CARD DESIGN
                            - Container: White/Clean, Subtle Shadow
                            - Minimal Border
                            - Clean Typography
                        */}
                        <div className={`
                            w-[1000px] h-[600px]
                            bg-white/95 backdrop-blur-sm
                            border border-gray-200/50
                            rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden
                            flex flex-row
                            font-sans text-gray-900
                            transition-all duration-700 ease-out
                            ${isHiddenInitial ? 'opacity-0 translate-y-8' : (isActive ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-0 scale-95')}
                        `}>
                            {/* Left: Project Image */}
                            <div className="w-[55%] h-full relative group overflow-hidden bg-gray-100">
                                <img
                                    src={project.imageUrl}
                                    alt={project.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    draggable={false}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/80" />
                            </div>

                            {/* Right: Clean Info Panel */}
                            <div className="w-[45%] p-10 flex flex-col relative">

                                {/* Title & Type */}
                                <div className="mb-8">
                                    <div className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-3">
                                        {project.type}
                                    </div>
                                    <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                        {project.name}
                                    </h1>
                                    <p className="text-gray-600 text-lg leading-relaxed mb-6 line-clamp-3">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Tech Stack Pills */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.techStack?.map((tech, i) => (
                                        <span key={i} className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-lg">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-auto grid grid-cols-[1fr_auto] gap-4">
                                    <a
                                        href={project.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-3 px-6 py-4 bg-gray-900 text-white hover:bg-gray-800 transition-all rounded-xl font-semibold group shadow-sm"
                                    >
                                        <span>View Project</span>
                                        <ExternalLink className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </a>

                                    <a
                                        href={project.githubUrl || project.repoUrl || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center px-4 py-4 border border-gray-200 text-gray-700 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all rounded-xl"
                                        title="View Source"
                                    >
                                        <Github className="w-6 h-6" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Html>
                </group>
            </Float>
        </group>
    );
}

export function ProjectTunnel({ projects, activeIndex, onBack, isTransitioning }: ProjectTunnelProps) {
    const controlsRef = useRef<CameraControls>(null);
    const isInitialized = useRef(false);

    // Camera Fly-Through Logic
    useEffect(() => {
        if (!controlsRef.current) return;

        // Calculate Target Position based on active index
        const targetIndex = activeIndex;
        const targetX = (targetIndex % 2 === 0 ? -1 : 1) * X_OFFSET;
        const targetZ = -targetIndex * Z_SPACING;

        // --- VISUAL CORRECTION: ADJUSTED FRAMING ---
        // Distance 9 units.
        // We stand further back to see the whole active card + upcoming context.
        const camX = targetX;
        const camZ = targetZ + 9;
        const camY = 0;

        // LookAt Logic:
        // User requested "straight" view.
        // We look directly at the card's X position.
        const lookAtX = targetX;


        // --- ENTRY ANIMATION ---
        // If this is the FIRST render (mounting) and we are at index 0,
        // we force the camera to start at the Intro position and fly in.
        // This creates a "Plunging" effect when the user clicks Discover.
        if (!isInitialized.current && activeIndex === 0) {
            // 1. HARD SET to Intro Position (Matches ImmersiveScene)
            controlsRef.current.setLookAt(
                0, 0, 12,    // Intro Position
                0, 0, -20,   // Intro LookAt
                false        // No transition - instant teleport
            );
            isInitialized.current = true;

            // 2. TRIGGER FLY-IN
            // Small delay to ensure the teleport is registered
            const t = setTimeout(() => {
                controlsRef.current?.setLookAt(
                    camX, camY, camZ,
                    lookAtX, camY, targetZ,
                    true // TRANSITION ENABLED -> This creates the "Plunge"
                );
            }, 100);

            return () => clearTimeout(t);
        }

        // Move Camera for standard navigation
        controlsRef.current.setLookAt(
            camX, camY, camZ,   // Camera Position
            lookAtX, camY, targetZ, // Look straight at card center
            true // Enable transition
        );

    }, [activeIndex]);

    return (
        <>
            <CameraControls
                ref={controlsRef}
                smoothTime={1.2} // Slightly faster/snappier for the close-up feel
                mouseButtons={{
                    left: 0,
                    middle: 0,
                    right: 0,
                    wheel: 0
                }}
                touches={{
                    one: 0,
                    two: 0,
                    three: 0
                }}
            />

            <group>
                {projects.map((project, i) => (
                    <ProjectCard
                        key={i}
                        project={project}
                        index={i}
                        isActive={i === activeIndex}
                        animateEntry={i === 0 && !!isTransitioning}
                    />
                ))}
            </group>
        </>
    );
}
