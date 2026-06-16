import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from "react-icons/fi";
import ParticleBackground from "./ParticleBackground";
import AvatarDisplay from "./AvatarDisplay";

export default function Hero({ data }) {
  const { personal, summary } = data;
  const { github, linkedin } = personal.social;

  const typingSeq = personal.taglines.flatMap((t) => [t, 2200]);

  const scrollToAbout = () =>
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleBackground />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-100 pointer-events-none" />

      {/* Radial glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,255,136,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
          className="flex justify-center mb-8"
        >
          <AvatarDisplay personal={personal} />
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-mono text-neon-green text-sm tracking-[0.4em] uppercase mb-2"
        >
          Hello, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="font-orbitron font-black text-5xl sm:text-6xl md:text-7xl gradient-text mb-5 leading-tight"
        >
          {personal.name}
        </motion.h1>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="text-xl md:text-2xl font-mono text-slate-300 mb-6 h-10 flex items-center justify-center gap-2"
        >
          <span className="text-neon-cyan opacity-70">{"<"}</span>
          <TypeAnimation
            sequence={typingSeq}
            repeat={Infinity}
            className="text-white"
          />
          <span className="text-neon-cyan opacity-70">{"/>"}</span>
        </motion.div>

        {/* Summary */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          {summary}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {github.visible && (
            <a
              href={github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-7 py-3 rounded-full border border-neon-green text-neon-green text-sm font-mono
                         hover:bg-neon-green hover:text-bg-primary transition-all duration-300 glow-green"
            >
              <FiGithub className="group-hover:scale-110 transition-transform" />
              GitHub
            </a>
          )}
          {linkedin.visible && (
            <a
              href={linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-7 py-3 rounded-full border border-neon-cyan text-neon-cyan text-sm font-mono
                         hover:bg-neon-cyan hover:text-bg-primary transition-all duration-300 glow-cyan"
            >
              <FiLinkedin className="group-hover:scale-110 transition-transform" />
              LinkedIn
            </a>
          )}
          <a
            href={`mailto:${personal.email}`}
            className="group flex items-center gap-2 px-7 py-3 rounded-full border border-neon-purple text-neon-purple text-sm font-mono
                       hover:bg-neon-purple hover:text-bg-primary transition-all duration-300 glow-purple"
          >
            <FiMail className="group-hover:scale-110 transition-transform" />
            Contact Me
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          onClick={scrollToAbout}
          className="mt-16 flex flex-col items-center gap-2 text-slate-600 hover:text-neon-green transition-colors mx-auto"
        >
          <span className="font-mono text-xs tracking-[0.3em]">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <FiArrowDown size={16} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
