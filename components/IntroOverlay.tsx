"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface IntroOverlayProps {
    onInitialize: () => void;
}

export function IntroOverlay({ onInitialize }: IntroOverlayProps) {
    const fullText = "Interactive system interface exposing full-stack projects, AI pipelines, and production-grade architectures.";
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                onInitialize();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onInitialize]);

    useEffect(() => {
        let currentIndex = 0;
        const intervalId = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setDisplayedText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(intervalId);
            }
        }, 30); // Typing speed

        return () => clearInterval(intervalId);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
                opacity: 0,
                scale: 0.8,
                filter: "blur(20px)",
                y: 100, // Drop down slightly as it moves away
                transition: { duration: 0.8, ease: "anticipate" }
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-20 flex flex-col items-center justify-center p-4 pointer-events-none"
        >
            {/* The System Module Card */}
            <div className="relative z-30 flex flex-col max-w-2xl w-full mx-auto 
                bg-black/20 backdrop-filter backdrop-blur-3xl border border-white/10 rounded-xl overflow-hidden
                shadow-[0_0_80px_rgba(0,0,0,0.8)] pointer-events-auto ring-1 ring-white/5
                transition-all duration-500 hover:bg-black/30"
            >
                {/* Internal Gradient Glow for 'Active' feel */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-50" />

                {/* --- 1. System Header (Status Bar) --- */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-black/20">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                            <span className="text-[10px] font-mono text-emerald-500/80 tracking-widest">ONLINE</span>
                        </div>
                        <div className="hidden md:block w-px h-3 bg-white/10" />
                        <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">
                            SESSION: 2026
                        </span>
                    </div>
                    <div>
                        <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase opacity-60">
                            MODE: IMMERSIVE
                        </span>
                    </div>
                </div>

                {/* --- 2. Main Content Area --- */}
                <div className="p-8 md:p-12 flex flex-col gap-10 relative">

                    {/* Faux Reflections / Vertical Glare */}
                    <div className="absolute right-10 top-0 bottom-0 w-32 bg-gradient-to-l from-white/5 to-transparent skew-x-12 opacity-20 pointer-events-none" />

                    {/* Identity Block */}
                    <div className="space-y-4 relative z-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
                        >
                            PORTFOLIO <br /> RAMANANJATOVO
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-3"
                        >
                            <span className="text-sm font-mono text-emerald-400 tracking-widest uppercase">DevOps</span>
                            <span className="w-1 h-1 rounded-full bg-slate-600" />
                            <span className="text-sm font-mono text-slate-400 tracking-widest uppercase">Full Stack & AI</span>
                        </motion.div>
                    </div>

                    {/* Functional Description (Typewriter) */}
                    <div className="min-h-[60px] max-w-xl border-l-2 border-white/10 pl-4 py-1">
                        <p className="text-sm md:text-base text-slate-400 leading-relaxed font-mono">
                            {displayedText}
                            <span className="animate-pulse inline-block w-2 h-4 bg-emerald-500 ml-1 align-middle" />
                        </p>
                    </div>

                    {/* --- 3. Primary Action --- */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="pt-2"
                    >
                        <button
                            onClick={onInitialize}
                            className="group relative w-full overflow-hidden rounded-sm bg-white/5 border border-white/10 px-6 py-5 transition-all hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                        >
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />

                            {/* Progress Bar Animation (Bottom Line) */}
                            <div className="absolute bottom-0 left-0 h-0.5 bg-emerald-500 w-0 group-hover:w-full transition-all duration-700 ease-in-out" />

                            <div className="flex items-center justify-between relative z-10">
                                <span className="text-sm font-mono font-bold tracking-[0.2em] text-white group-hover:text-emerald-400 transition-colors">
                                    INITIALIZE SESSION
                                </span>
                                <span className="text-xs font-mono text-slate-500 group-hover:text-white transition-colors">
                                    [ENTER]
                                </span>
                            </div>
                        </button>
                    </motion.div>

                </div>

                {/* Bottom Decorative Bar */}
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            </div>

            {/* Footer / Copyright */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 1.0 }}
                className="absolute bottom-6 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] text-slate-600 font-mono tracking-widest uppercase">
                    SECURED CONNECTION
                </span>
            </motion.div>
        </motion.div>
    );
}