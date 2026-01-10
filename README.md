# Portfolio 2025 — Johnny Ramananjatovo

High-performance, immersive 3D portfolio experience.
Designed to showcase **full-stack engineering** and **creative development** skills through a **"White Gallery"** aesthetic.

![Status](https://img.shields.io/badge/Status-Live-black?style=for-the-badge)
![Tech](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge)
![3D](https://img.shields.io/badge/WebGL-R3F-blue?style=for-the-badge)

## ⚡ Concept

- **Archetype:** The Modern Creative Developer.
- **Visuals:** Clean White Space, Soft Shadows, Premium Design, Sans-Serif Typography.
- **Aesthetic:** **"White Gallery"** — Projects are presented as elegant, minimal cards with sophisticated design and subtle interactions.
- **Experience:**
  - **Desktop:** Fully immersive 3D Scene (`ImmersiveScene`) with cinematic **Z-Axis Depth Navigation**.
  - **Mobile:** Responsive "Bento Grid" dashboard for quick access.

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

### 1. The Smooth Transition Effect
A seamless, elegant entry sequence:
- Starts with a clean welcome overlay.
- Triggers a **subtle warp** effect upon initialization.
- Smoothly blends into the 3D project tunnel using an **"Overlap Handoff"** technique.

### 2. Premium Project Cards
Refined 3D cards designed as minimal showcases:
- **Clean Design:** White backgrounds, subtle shadows, and professional typography.
- **Clear Information:** Displays project type, description, and tech stack.
- **Direct Links:** Quick access to live demos and **GitHub repositories**.
- **Smooth Animations:** Cards scale and fade elegantly upon focus.

### 3. Immersive "Fly-Through" Navigation
- **Z-Axis Travel:** Users physically travel through the depth of the scene to reach projects.
- **Atmospheric Depth:** Distant projects fade into the soft fog until brought into focus.
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
│   ├── IntroOverlay.tsx        # Initial Welcome UI & Navigation
│   ├── BentoGrid.tsx           # Mobile/2D Dashboard Interface
│   └── scene/
│       ├── ProjectTunnel.tsx   # 3D Project Cards & Logic
│       └── WarpTunnel.tsx      # Transition Effect
└── public/               # Static Assets
```

## 🎨 Design Philosophy

This portfolio embraces a **premium, minimal aesthetic** inspired by modern design systems:

- **White Space:** Generous padding and clean layouts
- **Subtle Interactions:** Smooth transitions and hover effects
- **Professional Typography:** Sans-serif fonts for clarity
- **Soft Shadows:** Depth without harshness
- **High-Key Lighting:** Bright, inviting 3D environment

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

Visit [http://localhost:3000](http://localhost:3000) to see the portfolio in action.

## 📦 Deployment

This portfolio is configured for **GitHub Pages** deployment with automatic static export via Next.js.

- **Live URL:** [whitemes.github.io](https://whitemes.github.io)
- **CI/CD:** GitHub Actions workflow for automatic deployment

## 📄 License

MIT © Johnny Ramananjatovo

---

**Built with passion using Next.js 16, React Three Fiber, and TypeScript.**
