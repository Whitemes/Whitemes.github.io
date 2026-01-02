"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
    name: string;
    type: string;
    status: "ONLINE" | "PROCESSING" | "IDLE" | "ACTIVE";
    logs: string[];
    uptime?: string;
    href: string;
}

export function ServiceCard({ name, type, status, logs, uptime, href }: ServiceCardProps) {
    const [logIndex, setLogIndex] = useState(0);
    const [displayedLog, setDisplayedLog] = useState("");
    const [charIndex, setCharIndex] = useState(0);

    // Status Color Logic
    const statusColor = {
        ONLINE: "bg-monitor-green",
        ACTIVE: "bg-monitor-green",
        PROCESSING: "bg-orange-500",
        IDLE: "bg-gray-500",
    }[status] || "bg-monitor-green";

    // Typewriter Effect
    useEffect(() => {
        const currentLog = logs[logIndex];
        if (charIndex < currentLog.length) {
            const timeout = setTimeout(() => {
                setDisplayedLog((prev) => prev + currentLog[charIndex]);
                setCharIndex((prev) => prev + 1);
            }, 50); // Typing speed
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setLogIndex((prev) => (prev + 1) % logs.length);
                setDisplayedLog("");
                setCharIndex(0);
            }, 3000); // Pause before next log
            return () => clearTimeout(timeout);
        }
    }, [charIndex, logIndex, logs]);

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-monitor-green rounded-lg"
        >
            <motion.div
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(34, 197, 94, 0.2)" }}
                className="relative flex flex-col justify-between p-6 bg-card-bg border border-monitor-border rounded-lg overflow-hidden group transition-all hover:border-monitor-green/50 h-full min-h-[220px]"
            >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className={cn("inline-block w-2 h-2 rounded-full animate-pulse-slow", statusColor)} />
                            <h3 className="font-bold text-lg tracking-tight text-foreground group-hover:text-monitor-green transition-colors">{name}</h3>
                        </div>
                        <p className="text-xs font-mono text-monitor-dim uppercase tracking-wider">{type}</p>
                    </div>
                    {uptime && (
                        <div className="text-[10px] bg-monitor-border/30 px-2 py-1 rounded text-gray-400 font-mono">
                            UP: {uptime}
                        </div>
                    )}
                </div>

                {/* Terminal Window */}
                <div className="relative mt-auto pt-4 border-t border-monitor-border/30">
                    <div className="font-mono text-xs text-monitor-green/80 h-10 overflow-hidden leading-relaxed">
                        <span className="opacity-50 mr-2">{">"}</span>
                        {displayedLog}
                        <span className="animate-pulse inline-block w-1.5 h-3 bg-monitor-green ml-1 align-middle" />
                    </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-10">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-monitor-green fill-current">
                        <path d="M100 0 L100 20 L80 0 Z" />
                    </svg>
                </div>
            </motion.div>
        </a>
    );
}
