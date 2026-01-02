"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

interface ProjectFocusCardProps {
    name: string;
    type: string;
    status: "ONLINE" | "PROCESSING" | "IDLE" | "ACTIVE";
    description: string;
    year?: string;
    href: string;
    repoUrl?: string;
    imageUrl: string;
    isActive?: boolean;
}

export function ProjectFocusCard({
    name,
    type,
    status,
    description,
    year = "2025",
    href,
    repoUrl = "#",
    imageUrl,
    isActive = false,
}: ProjectFocusCardProps) {

    return (
        <div className="w-full max-w-5xl mx-auto h-[70vh] flex items-center justify-center p-6 relative">
            <motion.div
                className="relative w-full h-full flex flex-col md:flex-row bg-white/40 backdrop-blur-2xl border border-white/40 rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-white/50"
            >
                {/* Project Image (Hero) - Takes up Top (mobile) or Left (desktop) */}
                <div className="relative w-full md:w-3/5 h-1/2 md:h-full bg-cover bg-center overflow-hidden">
                    <motion.div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out hover:scale-105"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                    />
                    {/* Overlay Gradient for text readability if needed, but we keep it clean */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:bg-gradient-to-r" />

                    {/* Status Pill on Image */}
                    <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full flex items-center gap-2 shadow-lg">
                        <span className={`w-2 h-2 rounded-full ${status === 'ONLINE' || status === 'ACTIVE' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
                        <span className="text-xs font-bold tracking-wider text-slate-800 uppercase">{status}</span>
                    </div>
                </div>

                {/* Content Section - Right Side */}
                <div className="w-full md:w-2/5 h-1/2 md:h-full p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white/40 to-white/10">
                    <div className="mb-auto flex justify-between items-center text-slate-500 font-medium text-xs tracking-widest uppercase">
                        <span>{type}</span>
                        <span>{year}</span>
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                            {name}
                        </h1>
                        <p className="text-base md:text-lg text-slate-700 leading-relaxed font-medium opacity-90">
                            {description}
                        </p>
                    </div>

                    <div className="mt-auto pt-8 flex gap-4">
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 group bg-slate-900 text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-between hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            <span>View Project</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href={repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-4 bg-white/50 border border-white/60 text-slate-900 rounded-xl hover:bg-white/80 transition-colors flex items-center justify-center font-semibold"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
