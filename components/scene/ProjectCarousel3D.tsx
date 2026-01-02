"use client";

import { useThree, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useSpring, animated, config } from "@react-spring/three";
import { useState, useRef, useEffect } from "react";
import { Github, ExternalLink, ChevronRight, ChevronLeft } from "lucide-react";
import * as THREE from "three";

// Re-defining Project Interface here or importing it
interface Project {
    name: string;
    type: string;
    status: "ONLINE" | "PROCESSING" | "IDLE" | "ACTIVE";
    description: string;
    href: string;
    repoUrl?: string; // Optional if not always present
    logs: string[];
    imageUrl: string;
}

interface ProjectCarousel3DProps {
    projects: Project[];
    onBack: () => void;
}

function Card3D({ project, index, activeIndex }: { project: Project; index: number; activeIndex: number }) {
    const isActive = index === activeIndex;
    const isNext = index === activeIndex + 1;
    const isPrev = index === activeIndex - 1;

    // Asymmetric Layout Logic (Microsoft Year Review Style)
    // Active: Shifted LEFT (-3), Very Close (Z=1.5)
    // Next: Shifted RIGHT (4), Pushed Back (Z=-2), Angled
    // Prev: Hidden Far Left

    const xPos = isActive ? -3 : isNext ? 4 : -7;
    const zPos = isActive ? 1.5 : -2;
    const rotY = isActive ? 0 : isNext ? -0.2 : 0;
    const opacityVal = isActive ? 1 : isNext ? 0.5 : 0;
    const scaleVal = isActive ? 1 : 0.9;

    // Heavy Swoosh Animation
    const { position, scale, opacity, rotationY, blur } = useSpring({
        position: [xPos, 0, zPos],
        scale: scaleVal,
        opacity: opacityVal,
        rotationY: rotY,
        blur: isActive ? 0 : 4, // 4px blur for next card
        config: { mass: 2, tension: 120, friction: 30 } // Heavy, cinematic slide
    });

    // Hide cards that are far away to prevent rendering overhead
    if (Math.abs(index - activeIndex) > 1) return null;

    return (
        <animated.group position={position as any} scale={scale as any} rotation-y={rotationY as any}>
            {/* HTML Scale Factor increased to 3 for massive readability */}
            <Html transform occlude distanceFactor={3} position={[0, 0, 0]} style={{ opacity: opacity as any, filter: blur.to(b => `blur(${b}px)`) as any }}>
                <div className={`
                    w-[900px] h-[550px] 
                    bg-slate-950/80 backdrop-blur-3xl 
                    border border-white/10
                    rounded-3xl shadow-[0_20px_100px_rgba(0,0,0,0.8)] overflow-hidden
                    flex flex-row
                    font-sans text-white
                    transition-all duration-500
                    ${isActive ? 'ring-1 ring-white/20' : ''}
                `}>
                    {/* Left: Project Image (Larger 60%) */}
                    <div className="w-[60%] h-full relative border-r border-white/5">
                        <img
                            src={project.imageUrl}
                            alt={project.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-950/90" />
                    </div>

                    {/* Right: Content (40%) */}
                    <div className="w-[40%] p-10 flex flex-col justify-center relative bg-gradient-to-b from-slate-900/90 to-slate-950/90">
                        <div className="mb-6">
                            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4 shadow-[0_0_10px_rgba(52,211,153,0.2)]">
                                {project.type}
                            </span>
                            <h2 className="text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                                {project.name}
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed mb-6 line-clamp-4">
                                {project.description}
                            </p>
                        </div>

                        <div className="mt-auto">
                            <a href={project.href} target="_blank" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-emerald-400 transition-colors shadow-lg hover:shadow-emerald-400/20">
                                <span>Open Project</span>
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </Html>
        </animated.group>
    );
}

export function ProjectCarousel3D({ projects, onBack }: ProjectCarousel3DProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNext = () => {
        if (activeIndex < projects.length - 1) setActiveIndex(prev => prev + 1);
    };

    const handlePrev = () => {
        if (activeIndex > 0) setActiveIndex(prev => prev - 1);
        else onBack(); // Back to home if at start
    };

    // Keep scroll for convenience, but rely on buttons for the requested UX
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            // ... existing wheel logic ...
            if (Math.abs(e.deltaY) > 50) {
                if (e.deltaY > 0 && activeIndex < projects.length - 1) setActiveIndex(p => p + 1);
                if (e.deltaY < 0) {
                    if (activeIndex > 0) setActiveIndex(p => p - 1);
                    else onBack();
                }
            }
        };
        window.addEventListener("wheel", handleWheel);
        return () => window.removeEventListener("wheel", handleWheel);
    }, [activeIndex, projects.length, onBack]);

    return (
        <group position={[0, 0, 0]}>
            {/* 3D Navigation Controls (Floating HTML) */}
            <Html position={[0, -2.2, 0]} transform center>
                <div className="flex gap-6 items-center pointer-events-auto bg-black/40 backdrop-blur-md px-8 py-4 rounded-full border border-white/5 shadow-2xl">
                    <button
                        onClick={handlePrev}
                        className="p-4 rounded-full bg-white/5 hover:bg-white/20 text-white transition-all hover:scale-110 active:scale-95 border border-white/5"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>

                    <div className="flex flex-col items-center mx-4">
                        <span className="text-xs text-slate-400 uppercase tracking-widest mb-1">Project</span>
                        <span className="font-mono text-xl font-bold text-white tracking-widest">
                            {activeIndex + 1} <span className="text-slate-600">/</span> {projects.length}
                        </span>
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={activeIndex === projects.length - 1}
                        className={`p-4 rounded-full border border-white/5 transition-all hover:scale-110 active:scale-95 ${activeIndex === projects.length - 1
                            ? 'bg-transparent text-white/10 cursor-not-allowed'
                            : 'bg-white text-black hover:bg-emerald-400'
                            }`}
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>
                </div>
            </Html>

            {projects.map((project, i) => (
                <Card3D
                    key={i}
                    project={project}
                    index={i}
                    activeIndex={activeIndex}
                />
            ))}
        </group>
    );
}
