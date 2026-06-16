import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { TbStar } from "react-icons/tb";
import SectionTitle from "./SectionTitle";

const CATEGORY_COLORS = {
  "NLP / LLM": "text-neon-green border-neon-green/30 bg-neon-green/8",
  "MLOps": "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/8",
  "Computer Vision": "text-neon-purple border-neon-purple/30 bg-neon-purple/8",
  "Time Series": "text-neon-pink border-neon-pink/30 bg-neon-pink/8",
};
const DEFAULT_CAT_COLOR = "text-slate-400 border-slate-600 bg-slate-800/50";

export default function Projects({ projects }) {
  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const displayed = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section id="projects" className="py-24 px-6 relative bg-bg-secondary/20">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-neon-green/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-neon-purple/3 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label="04. Portfolio"
          title="Projects"
          subtitle="A selection of ML, AI, and data engineering projects I've built"
        />

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setFilter(cat); setShowAll(false); }}
              className={`px-4 py-2 rounded-full text-sm font-mono border transition-all duration-200 ${
                filter === cat
                  ? "bg-neon-green text-bg-primary border-neon-green glow-green"
                  : "border-white/10 text-slate-400 hover:border-neon-green/30 hover:text-neon-green"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayed.map((project, i) => {
              const catColor = CATEGORY_COLORS[project.category] || DEFAULT_CAT_COLOR;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="glass rounded-2xl overflow-hidden border border-white/6 project-card flex flex-col"
                >
                  {/* Gradient top bar */}
                  <div
                    className="h-1 w-full"
                    style={{
                      background: project.featured
                        ? "linear-gradient(90deg,#00ff88,#22d3ee,#a855f7)"
                        : "linear-gradient(90deg,rgba(30,41,59,0.5),rgba(30,41,59,0.8))",
                    }}
                  />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Title row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-orbitron font-bold text-white text-sm leading-snug">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <TbStar className="text-neon-green flex-shrink-0 mt-0.5" />
                      )}
                    </div>

                    {/* Category badge */}
                    <span className={`self-start px-2.5 py-1 rounded-md text-xs font-mono border mb-3 ${catColor}`}>
                      {project.category}
                    </span>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-xs font-mono bg-bg-secondary text-slate-400 border border-white/6"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-3 mt-auto">
                      {project.github_visible && project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-neon-green transition-colors font-mono"
                        >
                          <FiGithub size={14} />
                          Code
                        </a>
                      )}
                      {project.demo_visible && project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-neon-cyan transition-colors font-mono"
                        >
                          <FiExternalLink size={14} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Show more / less */}
        {filtered.length > 6 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-full border border-neon-green/30 text-neon-green font-mono text-sm
                         hover:bg-neon-green/10 transition-all duration-200"
            >
              {showAll ? "Show Less" : `Show All (${filtered.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
