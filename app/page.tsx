"use client";

import { ProjectCarousel } from "@/components/ProjectCarousel";
import { BentoGrid } from "@/components/BentoGrid";
import { ServiceCard } from "@/components/ServiceCard";
import { ImmersiveScene } from "@/components/ImmersiveScene";
import { IntroOverlay } from "@/components/IntroOverlay";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function Home() {
  /* 
     State for the User Journey:
     'idle' -> Welcome Screen
     'warping' -> Transition Animation (Warp Tunnel)
     'handover' -> Overlap Phase (Warp fades out, Tunnel fades in)
     'entered' -> Project Gallery (Tunnel active)
  */
  const [visualState, setVisualState] = useState<'idle' | 'warping' | 'handover' | 'entered'>('idle');
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse Parallax Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const projects = [
    {
      name: "Baba Is You - Engineering",
      type: "GAME ENGINE",
      description: "A professional reimplementation of the 'Baba Is You' puzzle game engine, focusing on Software Architecture, Production Debugging, and Cloud-Native Deployment.",
      status: "ONLINE" as const,
      uptime: "99.9%",
      href: "https://babaisyou-production.up.railway.app",
      imageUrl: "/portfolio_1.jpg",
      logs: [
        "> Booting Spring Boot 3 kernel...",
        "> Initializing WebSocket handler...",
        "> Loading hexagonal architecture...",
        "> Transmutation engine online...",
        "> 8 levels loaded. Game Start.",
      ],
      githubUrl: "https://github.com/Whitemes/BabaIsYou",
      techStack: ["Java 21", "Spring Boot 3", "WebSockets", "Docker", "Railway"],
    },
    {
      name: "Gesture Controlled 3D",
      type: "VISUAL INTERFACE",
      description: "An experimental interface allowing users to manipulate 3D particles in real-time using hand gestures via webcam computer vision.",
      status: "ACTIVE" as const,
      uptime: "99.9%",
      href: "https://gesture-controlled-particles-production.up.railway.app",
      imageUrl: "/portfolio_2.jpg",
      logs: [
        "> Initializing generic webcam...",
        "> Hand tracking model loaded...",
        "> Detecting landmarks...",
        "> Particle physics active...",
        "> Awaiting gesture...",
      ],
      githubUrl: "#",
      techStack: ["React", "Three.js", "TensorFlow.js"],
    },
    {
      name: "Telegram Research Bot",
      type: "RESEARCH BOT",
      description: "A deeply integrated Telegram bot that acts as an on-demand research assistant. It scours the web for news and synthesizes complex topics on command.",
      status: "ACTIVE" as const,
      uptime: "02d 01h",
      href: "https://t.me/ResearchAssistGenBot",
      imageUrl: "/portfolio_3.jpg",
      logs: [
        "> Payload received...",
        "> Query: 'Market trends'...",
        "> Scraping sources...",
        "> Summarizing key points...",
        "> Delievering payload.",
      ],
      githubUrl: "#",
      techStack: ["Node.js", "Telegram API", "GPT-4"],
    },
    {
      name: "Immersive 3D Portfolio",
      type: "WEB EXPERIENCE",
      description: "This portfolio itself. A clean, immersive experience featuring 'fly-through' navigation, White Gallery aesthetics, and seamless WebGL transitions.",
      status: "ONLINE" as const,
      uptime: "100%",
      href: "https://whitemes.github.io",
      imageUrl: "/portfolio_4.jpg",
      logs: [
        "> Initializing R3F Engine...",
        "> Loading assets (draco)...",
        "> Baking lighting maps...",
        "> Cinematic sequence ready...",
        "> Welcome.",
      ],
      githubUrl: "https://github.com/Whitemes/portfolio-ramananjatovo",
      techStack: ["Next.js 16", "R3F", "TypeScript", "Tailwind v4"],
    },
    {
      name: "Anti-Procrastination Cockpit",
      type: "PRODUCTIVITY APP",
      description: "A minimalist productivity app that helps you focus on what matters most. Define your 3 key tasks, track habits, and work with a Pomodoro timer.",
      status: "ACTIVE" as const,
      uptime: "99.8%",
      href: "https://anti-procrastination-cockpit-production.up.railway.app",
      imageUrl: "/portfolio_5.jpg",
      logs: [
        "> Initializing focus engine...",
        "> Loading The Big 3 tasks...",
        "> Pomodoro timer ready...",
        "> Habit tracker synced...",
        "> Productivity mode active.",
      ],
      githubUrl: "https://github.com/Whitemes/Anti-Procrastination-Cockpit",
      techStack: ["React", "Vite", "Tailwind CSS", "Supabase"],
    },
    {
      name: "Start Email Assistant",
      type: "AUTOMATION AGENT",
      description: "A background agent that monitors incoming emails, categorizes them by urgency, and automatically drafts context-aware replies for review.",
      status: "ACTIVE" as const,
      uptime: "12d 04h",
      href: "https://startemailassistant-production.up.railway.app",
      imageUrl: "/portfolio_6.jpg",
      logs: [
        "> Watching IMAP stream...",
        "> New message detected: 'Inquiry'...",
        "> Sentiment analysis: Positive...",
        "> Drafting reply...",
        "> Saved to drafts.",
      ],
      githubUrl: "#",
      techStack: ["Python", "IMAP", "OpenAI", "Flask"],
    },
    {
      name: "Meeting Analyst AI",
      type: "NLP SERVICE",
      description: "An automated intelligence pipeline that ingests meeting audio, transcribes it, and generates concise, actionable executive summaries using LLMs.",
      status: "ACTIVE" as const,
      uptime: "24d 12h",
      href: "https://meetinganalystai-production.up.railway.app",
      imageUrl: "/portfolio_7.jpg",
      logs: [
        "> Transcribing audio stream...",
        "> Diarizing speakers...",
        "> Generating action items...",
        "> Syncing to notion...",
        "> Complete.",
      ],
      githubUrl: "#",
      techStack: ["Whisper", "PyTorch", "Notion API", "LLM"],
    },
    {
      name: "Content Remix AI",
      type: "CONTENT PIPELINE",
      description: "A content repurposing engine that takes long-form blog posts and automatically converts them into engaging Twitter threads and short-form video scripts.",
      status: "ACTIVE" as const,
      uptime: "45d 12h",
      href: "https://socialmediarepurposer-production.up.railway.app",
      imageUrl: "/portfolio_8.jpg",
      logs: [
        "> Parsing source URL...",
        "> Extracting key hooks...",
        "> Generating tweet thread...",
        "> Selecting media assets...",
        "> Pipeline finished.",
      ],
      githubUrl: "#",
      techStack: ["Next.js", "FFmpeg", "Twitter API", "AI Agent"],
    },
  ];

  const handleNext = () => {
    if (activeIndex < projects.length - 1) {
      setActiveIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    } else {
      // Go back to welcome screen on first item
      setVisualState('idle');
    }
  };

  const handleInitialize = () => {
    // 1. Trigger Warp
    setVisualState('warping');

    // 2. Start Handoff (Overlap) after 1.2s
    setTimeout(() => {
      setVisualState('handover');

      // 3. Fully Enter after transition (e.g., 0.8s overlap)
      setTimeout(() => {
        setVisualState('entered');
      }, 800);

    }, 1200);
  };


  return (
    <>
      <ImmersiveScene
        mouseX={mousePos.x}
        mouseY={mousePos.y}
        visualState={visualState} // Pass the visual state
        imageUrls={projects.map(p => p.imageUrl)} // Pass project images
        projects={projects}
        onBack={() => setVisualState('idle')}
        activeIndex={activeIndex}
      />

      <AnimatePresence>
        {visualState === 'idle' && (
          <IntroOverlay onInitialize={handleInitialize} />
        )}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0 }}
        animate={visualState === 'entered' ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.0, delay: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full min-h-screen pointer-events-none"
      >
        {/* Mobile Fallback: Bento Grid */}
        <div className="block md:hidden pointer-events-auto p-4 pt-20">
          <BentoGrid>
            {projects.map((project, i) => (
              <ServiceCard
                key={i}
                name={project.name}
                type={project.type}
                status={project.status}
                logs={project.logs}
                uptime={project.uptime}
                href={project.href}
              />
            ))}
          </BentoGrid>
        </div>

        {/* Desktop: Navigation Controls */}
        {visualState === 'entered' && (
          <div className="hidden md:flex fixed bottom-10 left-1/2 -translate-x-1/2 z-50 items-center gap-6 pointer-events-auto">
            <button
              onClick={handlePrev}
              className={`p-4 rounded-full bg-white/80 backdrop-blur-xl border border-white/60 text-gray-900 transition-all hover:scale-110 active:scale-95 hover:bg-white hover:border-purple-300 shadow-lg hover:shadow-purple-500/20`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center bg-white/80 backdrop-blur-xl border border-white/60 rounded-full px-6 py-3 shadow-lg">
              <span className="text-xl font-semibold bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent">
                {activeIndex + 1} <span className="text-gray-400">/</span> {projects.length}
              </span>
            </div>

            <button
              onClick={handleNext}
              disabled={activeIndex === projects.length - 1}
              className={`p-4 rounded-full bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white transition-all hover:scale-110 active:scale-95 shadow-lg hover:shadow-purple-500/30 disabled:opacity-30 disabled:from-gray-300 disabled:via-gray-300 disabled:to-gray-300 disabled:text-gray-500 disabled:hover:scale-100 disabled:shadow-none ${activeIndex === projects.length - 1 ? 'cursor-not-allowed' : ''}`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

      </motion.main>
    </>
  );
}
