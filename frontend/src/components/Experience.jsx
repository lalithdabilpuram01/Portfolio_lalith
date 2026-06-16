import { motion } from "framer-motion";
import { BsBriefcaseFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import SectionTitle from "./SectionTitle";

export default function Experience({ experience }) {
  return (
    <section id="experience" className="py-24 px-6 relative bg-bg-secondary/30">
      {/* Ambient */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-neon-purple/3 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <SectionTitle label="02. Career" title="Experience" />

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px timeline-line md:-translate-x-px" />

          <div className="space-y-12">
            {experience.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex gap-6 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex items-start pt-6">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      job.current
                        ? "bg-neon-green border-neon-green animate-pulse-slow glow-green"
                        : "bg-bg-secondary border-neon-green/40"
                    }`}
                  />
                </div>

                {/* Date badge — left side on even, right on odd */}
                <div
                  className={`hidden md:flex md:w-1/2 items-start pt-5 ${
                    i % 2 === 0 ? "justify-end pr-10" : "justify-start pl-10"
                  }`}
                >
                  <div className="glass rounded-lg px-4 py-2 border border-neon-green/15 text-right">
                    <p className="font-mono text-neon-green text-xs tracking-widest">
                      {job.start} — {job.end}
                    </p>
                    <div className="flex items-center gap-1 text-slate-500 text-xs mt-1 justify-end">
                      <HiLocationMarker className="text-neon-cyan" />
                      {job.location}
                    </div>
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`pl-14 md:pl-0 md:w-1/2 ${
                    i % 2 === 0 ? "md:pl-10" : "md:pr-10"
                  }`}
                >
                  <div className="glass rounded-2xl p-6 neon-border hover:border-neon-green/30 transition-all">
                    {/* Mobile date */}
                    <p className="md:hidden font-mono text-neon-green text-xs mb-3 tracking-wider">
                      {job.start} — {job.end}
                    </p>

                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-orbitron font-bold text-white text-base">
                          {job.role}
                        </h3>
                        <p className="text-neon-cyan text-sm font-medium mt-0.5">
                          {job.company}
                        </p>
                      </div>
                      {job.current && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-neon-green/10 text-neon-green border border-neon-green/25 whitespace-nowrap">
                          Current
                        </span>
                      )}
                    </div>

                    <ul className="space-y-2 mb-4">
                      {job.description.map((bullet, j) => (
                        <li key={j} className="flex items-start gap-2 text-slate-400 text-sm leading-relaxed">
                          <span className="text-neon-green mt-1.5 flex-shrink-0">▸</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {job.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-bg-secondary text-neon-purple border border-neon-purple/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
