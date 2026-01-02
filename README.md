# Portfolio 2025 — Johnny Ramananjatovo

High-performance, immersive 3D portfolio dashboard.
Designed to showcase **full-stack engineering** and **creative development** skills through a "System Monitor" & "Mission Control" aesthetic.

![Status](https://img.shields.io/badge/System-ONLINE-22c55e?style=for-the-badge)
![Tech](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge)
![3D](https://img.shields.io/badge/WebGL-R3F-blue?style=for-the-badge)

## ⚡ Concept

- **Archetype:** The System Architect.
- **Visuals:** Deep Space / Dark Mode, Cinematic Lighting, Glassmorphism, Monospace Typography.
- **Aesthetic:** **"Mission Control"** — Projects are presented as high-tech widgets with real-time status indicators, logs, and technical metrics.
- **Experience:**
  - **Desktop:** Fully immersive 3D Scene (`ImmersiveScene`) with a cinematic **Z-Axis Depth Navigation**.
  - **Mobile:** Responsive "Bento Grid" dashboard for quick data access.

## 🛠 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** TailwindCSS v4
- **3D Engine:** [React Three Fiber](https://docs.pmndrs.io/react-three-fiber) (Three.js) + `@react-three/drei`
- **Animations:** 
  - `@react-spring/three` (Physics-based depth transitions)
  - `framer-motion` (UI transitions & State orchestration)
- **Icons:** `lucide-react`

## 🚀 Key Features

### 1. The "Warp Stream" Transition
A seamless, cinematic entry sequence:
- Starts with a "System Boot" overlay.
- Triggers a **Hyperspace Warp** effect upon initialization.
- smoothly blends into the 3D project tunnel using an **"Overlap Handoff"** technique where the warp tunnel fades out *behind* the arriving content.

### 2. "Mission Control" Project Widgets
Refined 3D cards designed as technical dashboards:
- **Terminal Aesthetics:** Dark glass backgrounds, emerald status indicators, and monospace typography.
- **Live Data:** Displays project status, uptime, and tech stack pills.
- **Integration:** Direct links to live demos and **GitHub repositories**.
- **Smart Entry:** Cards animate in with a "scale-up" effect upon arrival to simulate landing.

### 3. Immersive "Fly-Through" Navigation
- **Z-Axis Travel:** Users physically travel through the depth of the scene to reach projects.
- **Atmospheric Depth:** Distant projects fade into the "system fog" until brought into focus.
- **Physics-Based Controls:** Smooth camera damping and acceleration using `CameraControls`.

### 4. Responsive & Accessible
- **Mobile Fallback:** Automatically switches to a clean, high-performance **Bento Grid** layout on smaller screens.
- **Performance:** Complex 3D effects are conditionally rendered to ensure 60fps performance.

## 📂 Project Structure

```bash
/
├── app/                  # Next.js 16 App Router
│   ├── page.tsx          # Main Entry (State Orchestrator)
│   └── globals.css       # Tailwind v4 Configuration
├── components/           # UI & 3D Components
│   ├── ImmersiveScene.tsx      # R3F Canvas Entry Point & Lighting
│   ├── IntroOverlay.tsx        # Initial "System Boot" UI & Navigation
│   ├── BentoGrid.tsx           # Mobile/2D Dashboard Interface
│   └── scene/
│       ├── ProjectTunnel.tsx   # 3D "Mission Control" Cards & Logic
│       └── WarpTunnel.tsx      # Hyperspace Transition Effect
└── public/               # Static Assets
```