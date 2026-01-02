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
                            MISSION CONTROL WIDGET DESIGN 
                            - Container: Black/80, Blur, Emerald Indicator
                            - Header: System Header
                            - Content: Tech Stack Pills
                        */}
                        <div className={`
                            w-[1000px] h-[600px] 
                            bg-black/80 backdrop-blur-xl
                            border border-white/10 border-l-4 border-l-emerald-500
                            rounded-lg shadow-2xl overflow-hidden
                            flex flex-row
                            font-sans text-white
                            transition-all duration-700 ease-out
                            ${isHiddenInitial ? 'opacity-0 translate-y-8' : (isActive ? 'opacity-100 translate-y-0' : 'opacity-40 grayscale translate-y-0 scale-95')}
                        `}>
                            {/* Left: Project Image (Keeping the visual anchor) */}
                            <div className="w-[55%] h-full relative group overflow-hidden bg-black">
                                <img
                                    src={project.imageUrl}
                                    alt={project.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                    draggable={false}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/90" />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_150%)]" />

                                {/* Overlay System Text on Image */}
                                <div className="absolute top-6 left-6 font-mono text-xs text-emerald-400/80 tracking-widest bg-black/60 px-2 py-1 rounded">
                                    IMG_SRC: {project.imageUrl.split('/').pop()}
                                </div>
                            </div>

                            {/* Right: Technical Data Panel */}
                            <div className="w-[45%] p-10 flex flex-col relative bg-gradient-to-b from-white/5 to-transparent">

                                {/* Header: System Status */}
                                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                                    <span className="font-mono text-xs text-emerald-500/70 tracking-[0.2em]">
                                        [ SYSTEM :: {project.status} ]
                                    </span>
                                    <span className="font-mono text-xs text-slate-500">
                                        ID: {index.toString().padStart(3, '0')}
                                    </span>
                                </div>

                                {/* Title & Type */}
                                <div className="mb-6">
                                    <div className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-2">
                                        {project.type}
                                    </div>
                                    <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                                        {project.name}
                                    </h1>
                                    <p className="text-slate-400 text-lg leading-relaxed mb-6 font-light line-clamp-3">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Tech Stack Pills */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.techStack?.map((tech, i) => (
                                        <span key={i} className="px-3 py-1 text-xs font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 rounded-md">
                                            {tech}
                                        </span>
                                    ))}
                                    {!project.techStack && (
                                        <span className="px-3 py-1 text-xs font-mono text-slate-500 bg-slate-800/50 rounded-md">
                                            NO_DATA
                                        </span>
                                    )}
                                </div>

                                {/* Action Matrix */}
                                <div className="mt-auto grid grid-cols-[1fr_auto] gap-4">
                                    <a
                                        href={project.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-3 px-6 py-4 bg-emerald-500/10 text-emerald-500 border border-emerald-500/50 hover:bg-emerald-500 hover:text-black transition-all rounded-md font-bold uppercase tracking-wide group"
                                    >
                                        <span>Initialize</span>
                                        <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    </a>

                                    <a
                                        href={project.githubUrl || project.repoUrl || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center px-4 py-4 border border-white/10 text-slate-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all rounded-md"
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
