"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectFocusCard } from "./ProjectFocusCard";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface Project {
    name: string;
    type: string;
    status: "ONLINE" | "PROCESSING" | "IDLE" | "ACTIVE";
    description: string;
    year?: string;
    href: string;
    repoUrl?: string;
    logs: string[];
    imageUrl: string; // Added image URL
}

interface ProjectCarouselProps {
    projects: Project[];
    onBack: () => void;
}

export function ProjectCarousel({ projects, onBack }: ProjectCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right
    const [isAnimating, setIsAnimating] = useState(false);

    // Transitions
    const variants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (dir: number) => ({
            zIndex: 0,
            x: dir < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    const nextSlide = useCallback(() => {
        if (isAnimating) return;
        if (currentIndex < projects.length - 1) {
            setDirection(1);
            setCurrentIndex((prev) => prev + 1);
            setIsAnimating(true);
        }
    }, [currentIndex, projects.length, isAnimating]);

    const prevSlide = useCallback(() => {
        if (isAnimating) return;
        if (currentIndex > 0) {
            setDirection(-1);
            setCurrentIndex((prev) => prev - 1);
            setIsAnimating(true);
        }
    }, [currentIndex, isAnimating]);

    // Wheel Control
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) > 50) { // Threshold
                if (e.deltaY > 0) nextSlide();
                else prevSlide();
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: true });
        return () => window.removeEventListener("wheel", handleWheel);
    }, [nextSlide, prevSlide]);

    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">

            {/* Main Deck Area */}
            <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction} onExitComplete={() => setIsAnimating(false)}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="absolute w-full flex items-center justify-center p-4"
                    >
                        <ProjectFocusCard
                            {...projects[currentIndex]}
                            isActive={true}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Controls (Bottom Center) */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-8 z-20">
                <button
                    onClick={() => {
                        if (currentIndex === 0) {
                            onBack();
                        } else {
                            prevSlide();
                        }
                    }}
                    className="group p-4 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-slate-800 transition-all"
                    title={currentIndex === 0 ? "Retour à l'accueil" : "Projet précédent"}
                >
                    <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                </button>

                <div className="flex gap-2">
                    {projects.map((_, i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-slate-900' : 'bg-slate-400/50'}`}
                        />
                    ))}
                </div>

                <button
                    onClick={nextSlide}
                    disabled={currentIndex === projects.length - 1}
                    className="group p-4 px-8 rounded-full bg-slate-900 text-white font-semibold flex items-center gap-2 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                    <span>Suivant</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>
        </div>
    );
}
