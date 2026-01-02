import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* * 'export' dit à Next.js de générer un site statique (HTML/CSS/JS)
   * au lieu d'une application Node.js. Indispensable pour GitHub Pages.
   */
  output: 'export',

  /*
   * GitHub Pages ne peut pas optimiser les images à la volée (car pas de serveur).
   * On désactive l'optimisation pour éviter que les images ne cassent.
   */
  images: {
    unoptimized: true,
  },

  /* * IMPORTANT : Laisse la ligne ci-dessous COMMENTÉE si tu nommes ton repo
   * "ton-pseudo.github.io".
   * * Si tu nommes ton repo "portfolio", décommente la ligne et mets '/portfolio'.
   */
  // basePath: '/nom-de-ton-repo',
};

export default nextConfig;
