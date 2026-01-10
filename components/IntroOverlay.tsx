"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface IntroOverlayProps {
    onInitialize: () => void;
}

export function IntroOverlay({ onInitialize }: IntroOverlayProps) {
    const fullText = "Full-stack developer & DevOps engineer crafting elegant solutions for complex technical challenges.";
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
            {/* The Clean Card */}
            <div className="relative z-30 flex flex-col max-w-2xl w-full mx-auto
                bg-white/90 backdrop-filter backdrop-blur-xl border border-gray-200/50 rounded-2xl overflow-hidden
                shadow-[0_8px_40px_rgba(0,0,0,0.08)] pointer-events-auto
                transition-all duration-500 hover:shadow-[0_12px_50px_rgba(0,0,0,0.12)]"
            >

                {/* Main Content Area */}
                <div className="p-8 md:p-12 flex flex-col gap-8 relative">

                    {/* Identity Block */}
                    <div className="space-y-4 relative z-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight"
                        >
                            Ramananjatovo
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-3"
                        >
                            <span className="text-sm font-medium text-gray-600 tracking-wide">DevOps</span>
                            <span className="w-1 h-1 rounded-full bg-gray-400" />
                            <span className="text-sm font-medium text-gray-600 tracking-wide">Full Stack & AI</span>
                        </motion.div>
                    </div>

                    {/* Functional Description */}
                    <div className="min-h-[60px] max-w-xl">
                        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                            {displayedText}
                            <span className="animate-pulse inline-block w-0.5 h-5 bg-gray-900 ml-1 align-middle" />
                        </p>
                    </div>

                    {/* Primary Action */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="pt-2"
                    >
                        <button
                            onClick={onInitialize}
                            className="group relative w-full overflow-hidden rounded-xl bg-gray-900 border border-gray-900 px-6 py-5 transition-all hover:bg-gray-800 hover:border-gray-800 hover:shadow-lg"
                        >
                            <div className="flex items-center justify-center gap-3 relative z-10">
                                <span className="text-base font-semibold tracking-wide text-white transition-colors">
                                    View Projects
                                </span>
                                <span className="text-sm text-gray-400 transition-colors">
                                    ↓
                                </span>
                            </div>
                        </button>
                    </motion.div>

                </div>

            </div>
        </motion.div>
    );
}