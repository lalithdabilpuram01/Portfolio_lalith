/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "neon-green": "#00ff88",
        "neon-cyan": "#22d3ee",
        "neon-purple": "#a855f7",
        "neon-pink": "#f472b6",
        "bg-primary": "#020817",
        "bg-secondary": "#0f172a",
        "bg-card": "#0d1526",
        "border-dim": "rgba(30,41,59,0.8)",
      },
      fontFamily: {
        orbitron: ["Orbitron", "monospace"],
        space: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        glow: {
          from: { boxShadow: "0 0 5px rgba(0,255,136,0.2), 0 0 10px rgba(0,255,136,0.1)" },
          to: { boxShadow: "0 0 20px rgba(0,255,136,0.4), 0 0 40px rgba(0,255,136,0.2), 0 0 60px rgba(0,255,136,0.1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
